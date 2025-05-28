// src/components/FilmmakerDashboard/components/MonetizationManager/index.jsx
import React, { useState } from 'react';
import PricingTiers from './PricingTiers';
import GeoPricing from './GeoPricing';
import Campaigns from './Campaigns';
import RevenueSupport from './RevenueSupport';

const MonetizationManager = (props) => {
    const [monetizationTab, setMonetizationTab] = useState('pricing');

    return (
        <div className="space-y-6">
            {/* Sub-navigation */}
            <div className="flex gap-2 border-b border-gray-200 pb-3">
                <button
                    onClick={() => setMonetizationTab('pricing')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${monetizationTab === 'pricing'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Pricing Tiers
                </button>
                <button
                    onClick={() => setMonetizationTab('geo')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${monetizationTab === 'geo'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Geo Pricing
                </button>
                <button
                    onClick={() => setMonetizationTab('campaigns')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${monetizationTab === 'campaigns'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Campaigns
                </button>
                <button
                    onClick={() => setMonetizationTab('revenue')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${monetizationTab === 'revenue'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Revenue & Support
                </button>
            </div>

            {/* Content */}
            {monetizationTab === 'pricing' && <PricingTiers {...props} />}
            {monetizationTab === 'geo' && <GeoPricing {...props} />}
            {monetizationTab === 'campaigns' && <Campaigns {...props} />}
            {monetizationTab === 'revenue' && <RevenueSupport {...props} />}
        </div>
    );
};

export default MonetizationManager;