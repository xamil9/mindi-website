import React from 'react';

const ReferralLinkModal = ({ showReferralLinkModal, setShowReferralLinkModal }) => {
    if (!showReferralLinkModal) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = `Referral link created: ${formData.get('campaign')}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        setShowReferralLinkModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Create Referral Link</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                name="campaign"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., Summer Campaign 2024"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                UTM Source
                            </label>
                            <input
                                type="text"
                                name="source"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., newsletter"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                UTM Medium
                            </label>
                            <input
                                type="text"
                                name="medium"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., email"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setShowReferralLinkModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Create Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReferralLinkModal;