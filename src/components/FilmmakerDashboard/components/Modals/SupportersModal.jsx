// src/components/FilmmakerDashboard/components/Modals/SupportersModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const SupportersModal = ({ creatorSupportData, modals }) => {
    const allSupporters = [
        ...creatorSupportData.topSupporters,
        { name: 'ArtHouseAficionado', amount: 40, date: '3 weeks ago' },
        { name: 'IndieFilmFan', amount: 35, date: '1 month ago' },
        { name: 'CinemaBuff2024', amount: 30, date: '1 month ago' },
        { name: 'MovieLover88', amount: 25, date: '1 month ago' },
        { name: 'FilmCritic101', amount: 20, date: '1 month ago' },
        { name: 'CinephileX', amount: 15, date: '2 months ago' },
        { name: 'MovieMarathoner', amount: 10, date: '2 months ago' },
        { name: 'IndieSupporter2024', amount: 10, date: '2 months ago' }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">All Supporters</h3>
                    <button onClick={() => modals.setShowSupportersModal(false)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600">Total Supporters</p>
                            <p className="text-2xl font-bold text-purple-600">{creatorSupportData.supporters}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Support</p>
                            <p className="text-2xl font-bold text-green-600">${creatorSupportData.totalSupport.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Support</p>
                            <p className="text-2xl font-bold text-blue-600">${creatorSupportData.avgSupport}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {allSupporters.map((supporter, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-yellow-500' :
                                        idx === 1 ? 'bg-gray-400' :
                                            idx === 2 ? 'bg-orange-600' :
                                                'bg-purple-400'
                                    }`}>
                                    {supporter.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium">{supporter.name}</p>
                                    <p className="text-sm text-gray-500">{supporter.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-green-600">${supporter.amount}</p>
                                {idx < 3 && (
                                    <p className="text-xs text-gray-500">Top Supporter</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportersModal;