// src/components/FilmmakerDashboard/components/MonetizationManager/Campaigns.jsx
import React, { useState } from 'react';
import { Calendar, Gift, Users } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const Campaigns = ({ campaigns, setCampaigns, modals }) => {
    const [showCampaignModal, setShowCampaignModal] = useState(false);

    const handleSaveCampaign = (formData) => {
        const newCampaign = {
            id: Date.now(),
            name: formData.get('name'),
            type: formData.get('type'),
            description: formData.get('description'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            status: 'scheduled',
            engagement: '-'
        };

        setCampaigns([...campaigns, newCampaign]);
        setShowCampaignModal(false);
        showNotification('Campaign created successfully!', 'success');
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Special Campaigns</h3>
                <button
                    onClick={() => setShowCampaignModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    <Calendar className="h-4 w-4" />
                    Create Campaign
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className={`${campaign.id === 1 ? 'bg-gradient-to-r from-purple-50 to-pink-50' : 'bg-gradient-to-r from-blue-50 to-cyan-50'
                        } rounded-lg p-6 border ${campaign.id === 1 ? 'border-purple-200' : 'border-blue-200'
                        }`}>
                        <div className="flex items-center justify-between mb-4">
                            {campaign.id === 1 ? <Gift className="h-8 w-8 text-purple-600" /> : <Users className="h-8 w-8 text-blue-600" />}
                            <span className={`text-xs ${campaign.status === 'active' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                } px-2 py-1 rounded-full`}>
                                {campaign.status === 'active' ? 'Active' : 'Scheduled'}
                            </span>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{campaign.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            {campaign.description}
                        </p>
                        <div className="space-y-2 mb-4">
                            {campaign.originalPrice && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Original Price</span>
                                    <span className="line-through text-gray-400">${campaign.originalPrice}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="font-medium">{campaign.campaignPrice ? 'Campaign Price' : 'Event Price'}</span>
                                <span className={`text-xl font-bold ${campaign.id === 1 ? 'text-purple-600' : 'text-blue-600'}`}>
                                    ${campaign.campaignPrice || campaign.price}
                                </span>
                            </div>
                            {campaign.date && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Date</span>
                                    <span>{campaign.date}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                                {campaign.sold ? `${campaign.sold} sold • Ends in ${campaign.endsIn}` : `${campaign.registered || 0} registered`}
                            </span>
                            <button
                                onClick={() => {
                                    modals.setSelectedCampaign(campaign);
                                    modals.setShowCampaignEditModal(true);
                                }}
                                className={`${campaign.id === 1 ? 'text-purple-600 hover:text-purple-700' : 'text-blue-600 hover:text-blue-700'}`}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campaign Performance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold mb-4">Campaign Performance</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Summer Sale 2024</p>
                            <p className="text-sm text-gray-500">30% off • Ended Aug 31</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">$3,847</p>
                            <p className="text-sm text-gray-500">142 sales</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Launch Week Special</p>
                            <p className="text-sm text-gray-500">$4.99 rental • Ended May 7</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">$1,247</p>
                            <p className="text-sm text-gray-500">250 sales</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Modal */}
            {showCampaignModal && (
                <CampaignModal
                    onSave={handleSaveCampaign}
                    onClose={() => setShowCampaignModal(false)}
                />
            )}
        </div>
    );
};

const CampaignModal = ({ onSave, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSave(new FormData(e.target));
            }}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Summer Special"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Campaign Type
                            </label>
                            <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option>Limited Time Offer</option>
                                <option>Early Access</option>
                                <option>Bundle Deal</option>
                                <option>Premiere Event</option>
                                <option>Holiday Special</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="Describe your campaign..."
                        />
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

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3">Pricing Options</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <input type="radio" name="pricing" id="discount" className="text-green-600" />
                                <label htmlFor="discount" className="flex-1">
                                    <span className="font-medium">Percentage Discount</span>
                                    <input
                                        type="number"
                                        className="ml-3 w-20 px-2 py-1 border border-gray-300 rounded"
                                        placeholder="25"
                                    />
                                    <span className="ml-1">%</span>
                                </label>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="radio" name="pricing" id="fixed" className="text-green-600" />
                                <label htmlFor="fixed" className="flex-1">
                                    <span className="font-medium">Fixed Price</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="ml-3 w-24 px-2 py-1 border border-gray-300 rounded"
                                        placeholder="14.99"
                                    />
                                </label>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="radio" name="pricing" id="bundle" className="text-green-600" />
                                <label htmlFor="bundle" className="font-medium">
                                    Bundle with Other Films
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Audience
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">New Users</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Returning Customers</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Email Subscribers</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Geographic Region</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Create Campaign
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default Campaigns;