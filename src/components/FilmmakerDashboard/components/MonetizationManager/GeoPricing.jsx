// src/components/FilmmakerDashboard/components/MonetizationManager/GeoPricing.jsx
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const GeoPricing = ({ modals }) => {
    const [geoPricing, setGeoPricing] = useState([
        { region: 'North America', multiplier: 1.0, currency: 'USD' },
        { region: 'Europe', multiplier: 0.9, currency: 'EUR' },
        { region: 'Asia', multiplier: 0.7, currency: 'USD' },
        { region: 'South America', multiplier: 0.6, currency: 'USD' }
    ]);
    const [showRegionModal, setShowRegionModal] = useState(false);

    const handleMultiplierChange = (index, value) => {
        const newGeoPricing = [...geoPricing];
        newGeoPricing[index].multiplier = parseFloat(value);
        setGeoPricing(newGeoPricing);
        showNotification('Price multiplier updated', 'success');
    };

    const handleAddRegion = (formData) => {
        const newRegion = {
            region: formData.get('region'),
            multiplier: parseFloat(formData.get('multiplier')),
            currency: formData.get('currency')
        };
        setGeoPricing([...geoPricing, newRegion]);
        setShowRegionModal(false);
        showNotification('Region added successfully', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Geographic Pricing</h3>
                <button
                    onClick={() => setShowRegionModal(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    Add Region
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Region
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Currency
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Price Multiplier
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Example Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {geoPricing.map((region, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {region.region}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {region.currency}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={region.multiplier}
                                        onChange={(e) => handleMultiplierChange(idx, e.target.value)}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    ${(9.99 * region.multiplier).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => {
                                            modals.setSelectedRegion(region);
                                            modals.setShowRegionEditModal(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-blue-900">Geo Pricing Tips</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            Adjust pricing based on local purchasing power and market conditions.
                            Consider local holidays and events for optimal conversion.
                        </p>
                    </div>
                </div>
            </div>

            {/* Add Region Modal */}
            {showRegionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Add Region</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAddRegion(new FormData(e.target));
                        }}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Region Name
                                    </label>
                                    <input
                                        type="text"
                                        name="region"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="e.g., Africa"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Currency
                                    </label>
                                    <input
                                        type="text"
                                        name="currency"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="e.g., USD"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price Multiplier
                                    </label>
                                    <input
                                        type="number"
                                        name="multiplier"
                                        step="0.1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="0.5"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowRegionModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Add Region
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeoPricing;