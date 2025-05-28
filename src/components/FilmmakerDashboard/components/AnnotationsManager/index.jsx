// src/components/FilmmakerDashboard/components/AnnotationsManager/index.jsx
import React, { useState } from 'react';
import TimelineAnnotations from './TimelineAnnotations';
import DirectorCommentary from './DirectorCommentary';
import InteractiveHotspots from './InteractiveHotspots';
import Chapters from './Chapters';

const AnnotationsManager = (props) => {
  const [annotationsTab, setAnnotationsTab] = useState('timeline');

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setAnnotationsTab('timeline')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            annotationsTab === 'timeline'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Timeline Annotations
        </button>
        <button
          onClick={() => setAnnotationsTab('commentary')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            annotationsTab === 'commentary'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Director Commentary
        </button>
        <button
          onClick={() => setAnnotationsTab('hotspots')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            annotationsTab === 'hotspots'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Interactive Hotspots
        </button>
        <button
          onClick={() => setAnnotationsTab('chapters')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            annotationsTab === 'chapters'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Chapters
        </button>
      </div>

      {/* Content */}
      {annotationsTab === 'timeline' && <TimelineAnnotations {...props} />}
      {annotationsTab === 'commentary' && <DirectorCommentary {...props} />}
      {annotationsTab === 'hotspots' && <InteractiveHotspots {...props} />}
      {annotationsTab === 'chapters' && <Chapters {...props} />}
    </div>
  );
};

export default AnnotationsManager;