import React from 'react';
import { X, Users } from 'lucide-react';

const ReferrersModal = ({ showReferrersModal, setShowReferrersModal }) => {
    if (!showReferrersModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">All Referrers</h3>
                    <button onClick={() => setShowReferrersModal(false)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    {/* Extended list of referrers */}
                    <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">Cinema Weekly Newsletter</p>
                                    <p className="text-sm text-gray-500">newsletter@cinemaweekly.com</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">$432</p>
                                    <p className="text-sm text-gray-500">890 views • 31 sales</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">Film Festival Blog</p>
                                    <p className="text-sm text-gray-500">festblog.org</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">$289</p>
                                    <p className="text-sm text-gray-500">567 views • 20 sales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferrersModal;