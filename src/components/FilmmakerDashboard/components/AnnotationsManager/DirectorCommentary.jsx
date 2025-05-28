// src/components/FilmmakerDashboard/components/AnnotationsManager/DirectorCommentary.jsx
import React from 'react';
import { Upload, Mic, PlayCircle, CheckCircle, Trash2 } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const DirectorCommentary = ({ commentaryTracks, setCommentaryTracks, modals }) => {
    const handleSetDefaultTrack = (trackId) => {
        const updatedTracks = commentaryTracks.map(t => ({
            ...t,
            isDefault: t.id === trackId
        }));
        setCommentaryTracks(updatedTracks);

        const track = commentaryTracks.find(t => t.id === trackId);
        showNotification(`${track?.title} set as default track`, 'success');
    };

    const handleDeleteTrack = (trackId) => {
        if (window.confirm('Delete this commentary track?')) {
            setCommentaryTracks(commentaryTracks.filter(t => t.id !== trackId));
            showNotification('Commentary track deleted successfully', 'success');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Director Commentary Tracks</h3>
                <button
                    onClick={() => modals.setShowCommentaryModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Upload className="h-4 w-4" />
                    Upload Commentary
                </button>
            </div>

            {commentaryTracks.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Commentary Tracks Yet</h4>
                    <p className="text-gray-600 mb-4">
                        Add director commentary to provide deeper insights into your film
                    </p>
                    <button
                        onClick={() => modals.setShowRecordingModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Record Commentary
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {commentaryTracks.map((track) => (
                        <div key={track.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold">{track.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Speakers: {track.speakerNames.join(', ')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleSetDefaultTrack(track.id)}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        title="Set as default"
                                    >
                                        <CheckCircle className={`h-4 w-4 ${track.isDefault ? 'text-green-600' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTrack(track.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        modals.setSelectedAudioTrack(track);
                                        modals.setShowAudioPreviewModal(true);
                                    }}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    Preview
                                </button>
                                <span className="text-sm text-gray-500">
                                    Duration: {track.duration}
                                </span>
                                {track.isDefault && (
                                    <span className="text-sm text-green-600">• Default track</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DirectorCommentary;