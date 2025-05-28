// src/components/FilmmakerDashboard/components/Overview.jsx
import React from 'react';
import { Eye, Users, DollarSign, Heart, Film, TrendingUp, CreditCard, MessageSquare } from 'lucide-react';
import StatCard from './common/StatCard';

const Overview = ({ analytics, annotations, pricingTiers, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          label="Total Views"
          value={analytics?.viewCount || '0'}
          change={15.2}
          color="blue"
        />
        <StatCard
          icon={Users}
          label="Active Viewers"
          value="2,341"
          change={8.5}
          color="green"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue"
          value="$12,846"
          change={-2.3}
          color="purple"
        />
        <StatCard
          icon={Heart}
          label="Engagement Rate"
          value="84%"
          change={5.7}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('content')}
          className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg text-left hover:shadow-lg transition-shadow"
        >
          <Film className="h-8 w-8 text-indigo-600 mb-3" />
          <h4 className="font-semibold">Manage Content</h4>
          <p className="text-sm text-gray-600 mt-1">
            Upload trailers, photos, and film details
          </p>
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg text-left hover:shadow-lg transition-shadow"
        >
          <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
          <h4 className="font-semibold">Marketing Hub</h4>
          <p className="text-sm text-gray-600 mt-1">
            SEO, social media, and promotional tools
          </p>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-left hover:shadow-lg transition-shadow"
        >
          <CreditCard className="h-8 w-8 text-green-600 mb-3" />
          <h4 className="font-semibold">Pricing & Campaigns</h4>
          <p className="text-sm text-gray-600 mt-1">
            {pricingTiers.length} active pricing tiers
          </p>
        </button>

        <button
          onClick={() => setActiveTab('annotations')}
          className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-left hover:shadow-lg transition-shadow"
        >
          <MessageSquare className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold">Annotations</h4>
          <p className="text-sm text-gray-600 mt-1">
            {annotations.length} annotations
          </p>
        </button>
      </div>
    </div>
  );
};

export default Overview;