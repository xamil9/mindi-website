// src/components/FilmmakerDashboard/components/Modals/ReplyModal.jsx
import React from 'react';

const ReplyModal = ({ annotations, setAnnotations, modals }) => {
    const { selectedAnnotation, setShowReplyModal, setSelectedAnnotation } = modals;

    const handleAddReply = (reply) => {
        const updatedAnnotations = annotations.map(a => {
            if (a.id === selectedAnnotation.id) {
                return {
                    ...a,
                    replies: [...(a.replies || []), {
                        id: Date.now(),
                        content: reply,
                        user: 'Current User',
                        timestamp: new Date().toISOString()
                    }]
                };
            }
            return a;
        });
        setAnnotations(updatedAnnotations);
        setShowReplyModal(false);
        setSelectedAnnotation(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Reply to Annotation</h3>
                {selectedAnnotation && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{selectedAnnotation.content}</p>
                        <p className="text-xs text-gray-500 mt-1">- {selectedAnnotation.User?.name}</p>
                    </div>
                )}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleAddReply(formData.get('reply'));
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Reply
                        </label>
                        <textarea
                            name="reply"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowReplyModal(false);
                                setSelectedAnnotation(null);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Post Reply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReplyModal;