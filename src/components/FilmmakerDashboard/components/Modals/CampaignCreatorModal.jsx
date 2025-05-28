import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Plus } from 'lucide-react';

const CampaignCreatorModal = ({ showCampaignCreator, setShowCampaignCreator }) => {
    if (!showCampaignCreator) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Campaign created successfully!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        setShowCampaignCreator(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Create Social Media Campaign</h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., Summer Launch Campaign"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Platforms
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" defaultChecked />
                                    <Twitter className="h-4 w-4 text-blue-400" />
                                    <span>Twitter</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" defaultChecked />
                                    <Facebook className="h-4 w-4 text-blue-700" />
                                    <span>Facebook</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <Instagram className="h-4 w-4 text-pink-500" />
                                    <span>Instagram</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <Youtube className="h-4 w-4 text-red-600" />
                                    <span>YouTube</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Message
                            </label>
                            <textarea
                                name="message"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={4}
                                placeholder="What's the main message of your campaign?"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hashtags
                            </label>
                            <input
                                type="text"
                                name="hashtags"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="#IndieFilm #NewRelease #FilmTwitter"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Target Audience
                            </label>
                            <select
                                name="audience"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option>Film Enthusiasts</option>
                                <option>Art House Fans</option>
                                <option>General Audience</option>
                                <option>Genre Specific (Drama/Thriller)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Budget (Optional)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setShowCampaignCreator(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Create Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignCreatorModal;