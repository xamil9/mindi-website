// src/components/FilmmakerDashboard/components/MonetizationManager/PricingTiers.jsx
import React, { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const PricingTiers = ({ pricingTiers, setPricingTiers }) => {
    const [showPricingModal, setShowPricingModal] = useState(false);
    const [editingTier, setEditingTier] = useState(null);

    const handleToggleTier = (tierId, isActive) => {
        const updatedTiers = pricingTiers.map(t =>
            t.id === tierId ? { ...t, isActive } : t
        );
        setPricingTiers(updatedTiers);
        showNotification(`Pricing tier ${isActive ? 'activated' : 'deactivated'}`, 'success');
    };

    const handleSavePricingTier = (formData) => {
        if (editingTier) {
            // Update existing tier
            const updatedTiers = pricingTiers.map(tier =>
                tier.id === editingTier.id
                    ? {
                        ...tier,
                        name: formData.get('name'),
                        type: formData.get('type'),
                        price: parseFloat(formData.get('price')),
                        duration: formData.get('duration') ? parseInt(formData.get('duration')) : null
                    }
                    : tier
            );
            setPricingTiers(updatedTiers);
        } else {
            // Add new tier
            const newTier = {
                id: pricingTiers.length + 1,
                name: formData.get('name'),
                type: formData.get('type'),
                price: parseFloat(formData.get('price')),
                duration: formData.get('duration') ? parseInt(formData.get('duration')) : null,
                isActive: true,
                features: [],
                activeUsers: 0
            };
            setPricingTiers([...pricingTiers, newTier]);
        }
        setShowPricingModal(false);
        setEditingTier(null);
        showNotification('Pricing tier saved successfully', 'success');
    };

    const getTierColorClasses = (type) => {
        switch (type) {
            case 'rental':
                return 'bg-blue-100 text-blue-700';
            case 'purchase':
                return 'bg-green-100 text-green-700';
            case 'subscription':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-orange-100 text-orange-700';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Pricing Tiers</h3>
                <button
                    onClick={() => setShowPricingModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Pricing Tier
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingTiers.map((tier) => (
                    <div key={tier.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColorClasses(tier.type)}`}>
                                {tier.type}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={tier.isActive}
                                    onChange={(e) => handleToggleTier(tier.id, e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>

                        <h4 className="font-semibold text-lg">{tier.name}</h4>
                        <p className="text-2xl font-bold mt-2">
                            ${tier.price}
                            {tier.duration && <span className="text-sm font-normal text-gray-600">/{tier.duration}h</span>}
                        </p>

                        <div className="mt-4 space-y-2">
                            {tier.features?.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Active users: {tier.activeUsers || 0}</span>
                                <button
                                    onClick={() => {
                                        setEditingTier(tier);
                                        setShowPricingModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Average Price</p>
                    <p className="text-xl font-semibold">$12.99</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Most Popular</p>
                    <p className="text-xl font-semibold">48h Rental</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-xl font-semibold">23.5%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Revenue/User</p>
                    <p className="text-xl font-semibold">$8.42</p>
                </div>
            </div>

            {/* Pricing Modal */}
            {showPricingModal && (
                <PricingModal
                    editingTier={editingTier}
                    onSave={handleSavePricingTier}
                    onClose={() => {
                        setShowPricingModal(false);
                        setEditingTier(null);
                    }}
                />
            )}
        </div>
    );
};

const PricingModal = ({ editingTier, onSave, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
                {editingTier ? 'Edit Pricing Tier' : 'Add New Pricing Tier'}
            </h3>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSave(new FormData(e.target));
            }}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tier Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Weekend Rental"
                            defaultValue={editingTier?.name}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                        </label>
                        <select
                            name="type"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            defaultValue={editingTier?.type || 'rental'}
                        >
                            <option value="rental">Rental</option>
                            <option value="purchase">Purchase</option>
                            <option value="subscription">Subscription</option>
                            <option value="payPerView">Pay Per View</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="9.99"
                                defaultValue={editingTier?.price}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="48"
                                defaultValue={editingTier?.duration}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Features
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="text-sm">HD Quality (1080p)</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">4K Quality</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="text-sm">Offline Download</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Bonus Content</span>
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
                        {editingTier ? 'Update' : 'Create'} Tier
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default PricingTiers;