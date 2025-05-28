import { useState, useRef, useCallback, useEffect } from 'react';

const useRecording = (options = {}) => {
    const {
        onRecordingComplete = null,
        onRecordingStart = null,
        onRecordingStop = null,
        maxDuration = 3600, // Maximum recording duration in seconds (default: 1 hour)
        interval = 1000 // Update interval in milliseconds
    } = options;

    // State
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingData, setRecordingData] = useState(null);
    const [error, setError] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState(null);

    // Refs
    const recordingInterval = useRef(null);
    const mediaStream = useRef(null);
    const audioChunks = useRef([]);
    const startTime = useRef(null);
    const pausedTime = useRef(0);

    // Format time helper
    const formatTime = useCallback((seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Start recording
    const startRecording = useCallback(async () => {
        try {
            setError(null);

            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });

            mediaStream.current = stream;

            // Create MediaRecorder instance
            const recorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            audioChunks.current = [];

            // Handle data available
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            // Handle recording stop
            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);

                const duration = recordingTime;
                const recordingResult = {
                    blob: audioBlob,
                    url,
                    duration,
                    formattedDuration: formatTime(duration),
                    timestamp: new Date().toISOString(),
                    size: audioBlob.size,
                    type: audioBlob.type
                };

                setRecordingData(recordingResult);

                if (onRecordingComplete) {
                    onRecordingComplete(recordingResult);
                }
            };

            // Start recording
            recorder.start(1000); // Collect data every second
            setMediaRecorder(recorder);
            setIsRecording(true);
            setIsPaused(false);
            startTime.current = Date.now();

            // Start timer
            recordingInterval.current = setInterval(() => {
                if (!isPaused) {
                    const elapsed = Math.floor((Date.now() - startTime.current - pausedTime.current) / 1000);
                    setRecordingTime(elapsed);

                    // Check max duration
                    if (elapsed >= maxDuration) {
                        stopRecording();
                    }
                }
            }, interval);

            if (onRecordingStart) {
                onRecordingStart();
            }

        } catch (err) {
            console.error('Error starting recording:', err);
            setError(err.message || 'Failed to start recording');

            // Cleanup on error
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach(track => track.stop());
            }
        }
    }, [isPaused, maxDuration, interval, formatTime, onRecordingStart, onRecordingComplete]);

    // Stop recording
    const stopRecording = useCallback(() => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();

            // Stop all tracks
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach(track => track.stop());
            }

            // Clear interval
            if (recordingInterval.current) {
                clearInterval(recordingInterval.current);
                recordingInterval.current = null;
            }

            setIsRecording(false);
            setIsPaused(false);
            pausedTime.current = 0;

            if (onRecordingStop) {
                onRecordingStop(recordingTime);
            }
        }
    }, [mediaRecorder, isRecording, recordingTime, onRecordingStop]);

    // Pause recording
    const pauseRecording = useCallback(() => {
        if (mediaRecorder && isRecording && !isPaused) {
            mediaRecorder.pause();
            setIsPaused(true);
            pausedTime.current += Date.now() - startTime.current;
        }
    }, [mediaRecorder, isRecording, isPaused]);

    // Resume recording
    const resumeRecording = useCallback(() => {
        if (mediaRecorder && isRecording && isPaused) {
            mediaRecorder.resume();
            setIsPaused(false);
            startTime.current = Date.now();
        }
    }, [mediaRecorder, isRecording, isPaused]);

    // Reset recording
    const resetRecording = useCallback(() => {
        stopRecording();
        setRecordingTime(0);
        setRecordingData(null);
        setError(null);
        if (audioURL) {
            URL.revokeObjectURL(audioURL);
            setAudioURL(null);
        }
        audioChunks.current = [];
    }, [stopRecording, audioURL]);

    // Download recording
    const downloadRecording = useCallback((filename = 'recording.webm') => {
        if (recordingData && recordingData.url) {
            const a = document.createElement('a');
            a.href = recordingData.url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }, [recordingData]);

    // Get audio levels (for visualization)
    const getAudioLevel = useCallback(() => {
        if (!mediaStream.current || !isRecording) return 0;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(mediaStream.current);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            microphone.connect(analyser);
            analyser.getByteFrequencyData(dataArray);

            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            return average / 255; // Normalize to 0-1
        } catch (err) {
            console.error('Error getting audio level:', err);
            return 0;
        }
    }, [isRecording]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isRecording) {
                stopRecording();
            }
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
            }
        };
    }, [isRecording, stopRecording, audioURL]);

    return {
        // State
        isRecording,
        isPaused,
        recordingTime,
        formattedTime: formatTime(recordingTime),
        recordingData,
        error,
        audioURL,

        // Actions
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        resetRecording,
        downloadRecording,

        // Utilities
        formatTime,
        getAudioLevel,

        // Checks
        canRecord: !isRecording && !error,
        hasRecording: !!recordingData,
        isMaxDurationReached: recordingTime >= maxDuration
    };
};

export default useRecording;