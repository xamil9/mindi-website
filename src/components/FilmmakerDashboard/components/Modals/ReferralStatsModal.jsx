import React from 'react';
import { X } from 'lucide-react';

const ReferralStatsModal = ({
    selectedReferralLink,
    showReferralStatsModal,
    setShowReferralStatsModal,
    setSelectedReferralLink
}) => {
    if (!showReferralStatsModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Referral Link Statistics</h3>
                    <button onClick={() => {
                        setShowReferralStatsModal(false);
                        setSelectedReferralLink(null);
                    }}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">{selectedReferralLink?.name}</h4>
                        <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {selectedReferralLink?.url}
                        </code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Total Clicks</p>
                            <p className="text-2xl font-bold">{selectedReferralLink?.clicks || 342}</p>
                            <p className="text-xs text-green-600">+12% this week</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Conversions</p>
                            <p className="text-2xl font-bold">{selectedReferralLink?.conversions || 28}</p>
                            <p className="text-xs text-green-600">+5% this week</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-bold">{selectedReferralLink?.ctr || '8.2%'}</p>
                            <p className="text-xs text-red-600">-0.3% this week</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold">$486</p>
                            <p className="text-xs text-green-600">+18% this week</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-3">Traffic Sources</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">Direct Traffic</span>
                                <span className="text-sm font-medium">45%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">Social Media</span>
                                <span className="text-sm font-medium">32%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">Email</span>
                                <span className="text-sm font-medium">18%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">Other</span>
                                <span className="text-sm font-medium">5%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-3">Recent Activity</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Click from Twitter</span>
                                <span className="text-gray-500">2 min ago</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Conversion (rental)</span>
                                <span className="text-gray-500">15 min ago</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Click from Newsletter</span>
                                <span className="text-gray-500">1 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralStatsModal;