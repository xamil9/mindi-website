import React from 'react';

const TrailerEditModal = ({
    selectedTrailer,
    trailers,
    setTrailers,
    showTrailerEditModal,
    setShowTrailerEditModal,
    setSelectedTrailer
}) => {
    if (!showTrailerEditModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedTrailers = trailers.map(t =>
            t.id === selectedTrailer.id
                ? { ...t, title: formData.get('title') }
                : t
        );
        setTrailers(updatedTrailers);
        setShowTrailerEditModal(false);
        setSelectedTrailer(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Edit Trailer</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trailer Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={selectedTrailer?.title}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowTrailerEditModal(false);
                                setSelectedTrailer(null);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrailerEditModal;