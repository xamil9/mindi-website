import React from 'react';

const HotspotEditModal = ({
    selectedHotspot,
    hotspots,
    setHotspots,
    showHotspotEditModal,
    setShowHotspotEditModal,
    setSelectedHotspot
}) => {
    if (!showHotspotEditModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedHotspots = hotspots.map(h =>
            h.id === selectedHotspot.id
                ? {
                    ...h,
                    type: formData.get('type'),
                    startTime: parseInt(formData.get('startTime')),
                    endTime: parseInt(formData.get('endTime')),
                    content: {
                        title: formData.get('title'),
                        description: formData.get('description'),
                        link: formData.get('link')
                    }
                }
                : h
        );
        setHotspots(updatedHotspots);
        setShowHotspotEditModal(false);
        setSelectedHotspot(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Edit Hotspot</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hotspot Type
                            </label>
                            <select
                                name="type"
                                defaultValue={selectedHotspot?.type}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="info">Information</option>
                                <option value="product">Product</option>
                                <option value="location">Location</option>
                                <option value="link">External Link</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Time (sec)
                                </label>
                                <input
                                    type="number"
                                    name="startTime"
                                    defaultValue={selectedHotspot?.startTime}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Time (sec)
                                </label>
                                <input
                                    type="number"
                                    name="endTime"
                                    defaultValue={selectedHotspot?.endTime}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={selectedHotspot?.content.title}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                defaultValue={selectedHotspot?.content.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={2}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Link (optional)
                            </label>
                            <input
                                type="url"
                                name="link"
                                defaultValue={selectedHotspot?.content.link}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowHotspotEditModal(false);
                                setSelectedHotspot(null);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update Hotspot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotspotEditModal;