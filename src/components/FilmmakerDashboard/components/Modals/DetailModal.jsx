// src/components/FilmmakerDashboard/components/Modals/DetailModal.jsx
import React from 'react';

const DetailModal = ({ modals }) => {
  const { selectedAnnotation, setShowDetailModal } = modals;
  const point = selectedAnnotation; // In this case, selectedAnnotation contains drop-off point data

  if (!point) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Drop-off Analysis</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Timestamp</p>
            <p className="font-semibold">
              {Math.floor(point.timestamp / 60)}:{(point.timestamp % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Drop-off Rate</p>
            <p className="font-semibold text-orange-600">{point.dropPercentage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Analysis</p>
            <p className="text-gray-700">{point.reason}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Recommendations</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
              <li>Consider adding a chapter marker here</li>
              <li>Add visual cues to maintain engagement</li>
              <li>Review pacing in this section</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setShowDetailModal(false)}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailModal;