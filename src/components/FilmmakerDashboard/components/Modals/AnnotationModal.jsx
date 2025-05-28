// src/components/FilmmakerDashboard/components/Modals/AnnotationModal.jsx
import React from 'react';

const AnnotationModal = ({ annotations, setAnnotations, modals }) => {
    const handleAddAnnotation = (annotation) => {
        const newAnnotation = {
            id: annotations.length + 1,
            userId: 1,
            User: { name: 'Current User' },
            timestamp: annotation.timestamp,
            type: annotation.type,
            content: annotation.content,
            likes: 0,
            replies: [],
            createdAt: new Date().toISOString()
        };
        setAnnotations([...annotations, newAnnotation]);
        modals.setShowAnnotationModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Add Annotation</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleAddAnnotation({
                        timestamp: parseInt(formData.get('timestamp')),
                        type: formData.get('type'),
                        content: formData.get('content')
                    });
                }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Timestamp (seconds)
                            </label>
                            <input
                                type="number"
                                name="timestamp"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option value="director">Director's Note</option>
                                <option value="technical">Technical Info</option>
                                <option value="trivia">Trivia</option>
                                <option value="location">Location</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                name="content"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => modals.setShowAnnotationModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Annotation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnnotationModal;