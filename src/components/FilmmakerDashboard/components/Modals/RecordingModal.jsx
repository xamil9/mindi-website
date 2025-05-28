// src/components/FilmmakerDashboard/components/Modals/RecordingModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Mic, PauseCircle } from 'lucide-react';
import { formatTime, showNotification } from '../../utils/helpers';

const RecordingModal = ({ commentaryTracks, setCommentaryTracks, modals }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingInterval = useRef(null);

    useEffect(() => {
        return () => {
            if (recordingInterval.current) {
                clearInterval(recordingInterval.current);
            }
        };
    }, []);

    const startRecording = () => {
        setIsRecording(true);
        setRecordingTime(0);
        recordingInterval.current = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current);
        }

        // Create a new commentary track
        const newTrack = {
            id: commentaryTracks.length + 1,
            title: `Recording ${new Date().toLocaleDateString()}`,
            speakerNames: ['Current User'],
            isDefault: false,
            duration: formatTime(recordingTime),
            audioFile: 'new_recording.mp3'
        };

        setCommentaryTracks([...commentaryTracks, newTrack]);
        modals.setShowRecordingModal(false);
        setRecordingTime(0);

        showNotification('Commentary track recorded successfully!', 'success');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Record Commentary</h3>
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            {isRecording ? (
                                <div className="w-20 h-20 bg-red-500 rounded-lg animate-pulse" />
                            ) : (
                                <Mic className="h-16 w-16 text-gray-400" />
                            )}
                        </div>
                        <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                        {isRecording && <p className="text-sm text-red-600 mt-2">Recording in progress...</p>}
                    </div>

                    <div className="flex gap-3">
                        {!isRecording ? (
                            <>
                                <button
                                    onClick={() => modals.setShowRecordingModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={startRecording}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                                >
                                    <Mic className="h-4 w-4" />
                                    Start Recording
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={stopRecording}
                                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2"
                            >
                                <PauseCircle className="h-4 w-4" />
                                Stop Recording
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordingModal;