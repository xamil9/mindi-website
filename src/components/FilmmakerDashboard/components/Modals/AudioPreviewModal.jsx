import React from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

const AudioPreviewModal = ({
    selectedAudioTrack,
    showAudioPreviewModal,
    setShowAudioPreviewModal,
    setSelectedAudioTrack,
    isPlaying,
    playbackTime,
    startAudioPreview,
    stopAudioPreview
}) => {
    if (!showAudioPreviewModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Preview: {selectedAudioTrack?.title}</h3>
                <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Speakers:</span>
                            <span className="text-sm font-medium">{selectedAudioTrack?.speakerNames.join(', ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Duration:</span>
                            <span className="text-sm font-medium">{selectedAudioTrack?.duration}</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                                style={{ width: `${(playbackTime / 10) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>{playbackTime.toFixed(1)}s</span>
                            <span>10.0s</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setShowAudioPreviewModal(false);
                                setSelectedAudioTrack(null);
                                stopAudioPreview();
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Close
                        </button>
                        <button
                            onClick={isPlaying ? stopAudioPreview : startAudioPreview}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            {isPlaying ? (
                                <>
                                    <PauseCircle className="h-4 w-4" />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <PlayCircle className="h-4 w-4" />
                                    Play Preview
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPreviewModal;