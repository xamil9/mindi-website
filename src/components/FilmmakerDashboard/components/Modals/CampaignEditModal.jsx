import React from 'react';

const CampaignEditModal = ({ 
    selectedCampaign, 
    campaigns, 
    setCampaigns, 
    showCampaignEditModal, 
    setShowCampaignEditModal, 
    setSelectedCampaign 
}) => {
    if (!showCampaignEditModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedCampaigns = campaigns.map(c =>
            c.id === selectedCampaign?.id
                ? {
                    ...c,
                    name: formData.get('name'),
                    description: formData.get('description'),
                    campaignPrice: parseFloat(formData.get('price'))
                }
                : c
        );
        setCampaigns(updatedCampaigns);
        setShowCampaignEditModal(false);
        setSelectedCampaign(null);

        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Campaign updated successfully!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Edit Campaign</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedCampaign?.name}
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
                                defaultValue={selectedCampaign?.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                defaultValue={selectedCampaign?.campaignPrice || selectedCampaign?.price}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        {selectedCampaign?.status === 'scheduled' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Date/Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="eventDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowCampaignEditModal(false);
                                setSelectedCampaign(null);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Update Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignEditModal;