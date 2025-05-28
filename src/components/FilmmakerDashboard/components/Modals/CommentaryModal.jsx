// src/components/FilmmakerDashboard/components/Modals/CommentaryModal.jsx
import React from 'react';
import { showNotification } from '../../utils/helpers';

const CommentaryModal = ({ commentaryTracks, setCommentaryTracks, modals }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput?.files?.[0];

        const newTrack = {
            id: commentaryTracks.length + 1,
            title: formData.get('title'),
            speakerNames: formData.get('speakers').split(',').map(s => s.trim()),
            isDefault: false,
            duration: '0:00',
            audioFile: file ? file.name : 'uploaded_commentary.mp3'
        };

        setCommentaryTracks([...commentaryTracks, newTrack]);
        modals.setShowCommentaryModal(false);
        showNotification('Commentary track uploaded successfully!', 'success');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Upload Commentary Track</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Track Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., Director & Cast Commentary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Speakers (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="speakers"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="John Director, Jane Actor"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Audio File
                            </label>
                            <input
                                type="file"
                                accept="audio/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => modals.setShowCommentaryModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Upload Commentary
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentaryModal;