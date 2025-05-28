import React from 'react';

const PressKitModal = ({
    pressKitSection,
    showPressKitModal,
    setShowPressKitModal,
    handleDownloadPressKit
}) => {
    if (!showPressKitModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">{pressKitSection}</h3>
                <div className="space-y-4">
                    {pressKitSection === 'High-Res Stills' && (
                        <div>
                            <p className="text-gray-600 mb-4">Download high-resolution production stills</p>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked /> Key Art (5 images)
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked /> Behind the Scenes (12 images)
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked /> Cast Photos (8 images)
                                </label>
                            </div>
                        </div>
                    )}
                    {pressKitSection === 'Press Release' && (
                        <div>
                            <p className="text-gray-600 mb-4">Download press release in your preferred format</p>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <option>PDF Format</option>
                                <option>Word Document</option>
                                <option>Plain Text</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => setShowPressKitModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDownloadPressKit(pressKitSection)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PressKitModal;