import React from 'react';

const RegionEditModal = ({ 
    selectedRegion, 
    showRegionEditModal, 
    setShowRegionEditModal, 
    setSelectedRegion 
}) => {
    if (!showRegionEditModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Update region pricing
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `${selectedRegion?.region} pricing updated successfully!`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        setShowRegionEditModal(false);
        setSelectedRegion(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Edit Region Pricing</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Region
                            </label>
                            <input
                                type="text"
                                value={selectedRegion?.region}
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Currency
                            </label>
                            <select
                                name="currency"
                                defaultValue={selectedRegion?.currency}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                                <option value="AUD">AUD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price Multiplier
                            </label>
                            <input
                                type="number"
                                name="multiplier"
                                step="0.1"
                                defaultValue={selectedRegion?.multiplier}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Special Pricing Rules
                            </label>
                            <textarea
                                name="rules"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                                placeholder="e.g., 20% discount during local holidays"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setShowRegionEditModal(false);
                                setSelectedRegion(null);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegionEditModal;