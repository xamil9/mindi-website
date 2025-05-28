// src/components/FilmmakerDashboard/components/MonetizationManager/RevenueSupport.jsx
import React from 'react';
import {
    Sparkles, DollarSign, Users, TrendingUp, Heart, Clock,
    Eye, Share2, Plus, Copy, Zap
} from 'lucide-react';
import { handleCopyToClipboard } from '../../utils/helpers';

const RevenueSupport = ({ creatorSupportData, filmId, modals }) => {
    return (
        <div className="space-y-6">
            {/* Creator Support Analytics */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Creator Support Analytics</h3>

                {/* Support Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <Sparkles className="h-8 w-8 text-purple-600" />
                            <span className="text-sm text-green-600 font-medium">+15%</span>
                        </div>
                        <p className="text-sm text-gray-600">Total Clicks</p>
                        <p className="text-2xl font-bold mt-1">{creatorSupportData.totalClicks.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="h-8 w-8 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">+18%</span>
                        </div>
                        <p className="text-sm text-gray-600">Support Revenue</p>
                        <p className="text-2xl font-bold mt-1">${creatorSupportData.totalSupport.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="h-8 w-8 text-blue-600" />
                            <span className="text-sm text-green-600 font-medium">+12%</span>
                        </div>
                        <p className="text-sm text-gray-600">Total Supporters</p>
                        <p className="text-2xl font-bold mt-1">{creatorSupportData.supporters}</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <TrendingUp className="h-8 w-8 text-orange-600" />
                            <span className="text-sm text-green-600 font-medium">+3.2%</span>
                        </div>
                        <p className="text-sm text-gray-600">Conversion Rate</p>
                        <p className="text-2xl font-bold mt-1">{creatorSupportData.conversionRate}%</p>
                    </div>
                </div>

                {/* Creator Support Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Supporters */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500" />
                            Top Supporters
                        </h4>
                        <div className="space-y-3">
                            {creatorSupportData.topSupporters.map((supporter, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-gray-300'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{supporter.name}</p>
                                            <p className="text-xs text-gray-500">{supporter.date}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-green-600">${supporter.amount}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => modals.setShowSupportersModal(true)}
                            className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700"
                        >
                            View All Supporters →
                        </button>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Recent Activity
                        </h4>
                        <div className="space-y-3">
                            {creatorSupportData.recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        {activity.action === 'support' ? (
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <Eye className="h-4 w-4 text-purple-600" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium">{activity.user}</p>
                                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                        </div>
                                    </div>
                                    {activity.amount && (
                                        <span className="font-medium text-green-600">+${activity.amount}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Support Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-600" />
                        Support Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Average Support Amount</p>
                            <p className="font-semibold text-2xl">${creatorSupportData.avgSupport}</p>
                            <p className="text-sm text-gray-500 mt-1">Per transaction</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Peak Support Time</p>
                            <p className="font-semibold text-2xl">7-9 PM</p>
                            <p className="text-sm text-gray-500 mt-1">Weekend evenings</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Repeat Supporters</p>
                            <p className="font-semibold text-2xl">34%</p>
                            <p className="text-sm text-gray-500 mt-1">Support multiple times</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900 mb-2">💡 Optimization Tip</p>
                        <p className="text-sm text-purple-800">
                            Your Support Creator button performs 45% better when viewers reach the 75% mark of your film.
                            Consider adding a gentle reminder or thank you message at this point.
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold">Referral Sales & Views</h3>
            </div>

            {/* Referral Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <Share2 className="h-8 w-8 text-blue-600" />
                        <span className="text-sm text-green-600 font-medium">+12%</span>
                    </div>
                    <p className="text-sm text-gray-600">Total Referral Views</p>
                    <p className="text-2xl font-bold mt-1">8,435</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="h-8 w-8 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">+23%</span>
                    </div>
                    <p className="text-sm text-gray-600">Referral Revenue</p>
                    <p className="text-2xl font-bold mt-1">$3,847</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="h-8 w-8 text-purple-600" />
                        <span className="text-sm text-green-600 font-medium">+5%</span>
                    </div>
                    <p className="text-sm text-gray-600">Active Referrers</p>
                    <p className="text-2xl font-bold mt-1">142</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="h-8 w-8 text-orange-600" />
                        <span className="text-sm text-red-600 font-medium">-2%</span>
                    </div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold mt-1">18.4%</p>
                </div>
            </div>

            {/* Top Referral Sources */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold mb-4">Top Referral Sources</h4>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium">Film Critics Network</p>
                                <p className="text-sm text-gray-500">@filmcritics</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">$1,234</p>
                            <p className="text-sm text-gray-500">2,456 views • 87 sales</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium">Indie Film Blog</p>
                                <p className="text-sm text-gray-500">indiefilmblog.com</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">$892</p>
                            <p className="text-sm text-gray-500">1,823 views • 62 sales</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => modals.setShowReferrersModal(true)}
                    className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700"
                >
                    View All Referrers →
                </button>
            </div>

            {/* Referral Link Management */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">Referral Links</h4>
                    <button
                        onClick={() => modals.setShowReferralLinkModal(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Link
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="font-medium">Press Kit Campaign</p>
                                <p className="text-sm text-gray-500">Created 2 weeks ago</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleCopyToClipboard(`https://platform.com/films/${filmId}?ref=press-kit-2024`)}
                                    className="text-sm text-gray-600 hover:text-gray-700"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        modals.setSelectedReferralLink({
                                            name: 'Press Kit Campaign',
                                            url: `https://platform.com/films/${filmId}?ref=press-kit-2024`,
                                            clicks: 342,
                                            conversions: 28,
                                            ctr: '8.2%'
                                        });
                                        modals.setShowReferralStatsModal(true);
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Stats
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <code className="flex-1 text-xs bg-gray-100 px-3 py-2 rounded">
                                https://platform.com/films/{filmId}?ref=press-kit-2024
                            </code>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                            <span>342 clicks</span>
                            <span>•</span>
                            <span>28 conversions</span>
                            <span>•</span>
                            <span>8.2% CTR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueSupport;