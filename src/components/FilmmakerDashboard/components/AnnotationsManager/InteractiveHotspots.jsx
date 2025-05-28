// src/components/FilmmakerDashboard/components/AnnotationsManager/InteractiveHotspots.jsx
import React from 'react';
import { Plus, Zap, MapPin, Info } from 'lucide-react';

const InteractiveHotspots = ({ hotspots, setHotspots, modals }) => {
    const getHotspotIcon = (type) => {
        switch (type) {
            case 'location':
                return MapPin;
            case 'info':
                return Info;
            default:
                return Info;
        }
    };

    const getHotspotColorClasses = (type) => {
        switch (type) {
            case 'info':
                return 'bg-blue-100 text-blue-700';
            case 'product':
                return 'bg-green-100 text-green-700';
            case 'location':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-purple-100 text-purple-700';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Interactive Hotspots</h3>
                <button
                    onClick={() => modals.setShowHotspotModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Hotspot
                </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-yellow-900">Boost Engagement</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                            Interactive hotspots increase viewer engagement by 45% on average
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotspots.map((hotspot) => {
                    const Icon = getHotspotIcon(hotspot.type);
                    const colorClasses = getHotspotColorClasses(hotspot.type);

                    return (
                        <div key={hotspot.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                                        <Icon className="h-3 w-3" />
                                        {hotspot.type}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {hotspot.clicks} clicks
                                </span>
                            </div>

                            <h4 className="font-medium mb-1">{hotspot.content.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{hotspot.content.description}</p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>
                                    {Math.floor(hotspot.startTime / 60)}:{(hotspot.startTime % 60).toString().padStart(2, '0')} -
                                    {Math.floor(hotspot.endTime / 60)}:{(hotspot.endTime % 60).toString().padStart(2, '0')}
                                </span>
                                <button
                                    onClick={() => {
                                        modals.setSelectedHotspot(hotspot);
                                        modals.setShowHotspotEditModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveHotspots;