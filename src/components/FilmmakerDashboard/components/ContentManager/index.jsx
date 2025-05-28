// src/components/FilmmakerDashboard/components/ContentManager/index.jsx
import React, { useState } from 'react';
import AboutFilm from './AboutFilm';
import TrailersVideos from './TrailersVideos';
import BehindTheScenes from './BehindTheScenes';
import DirectorNotes from './DirectorNotes';

const ContentManager = (props) => {
    const [contentTab, setContentTab] = useState('about');

    return (
        <div className="space-y-6">
            {/* Sub-navigation */}
            <div className="flex gap-2 border-b border-gray-200 pb-3">
                <button
                    onClick={() => setContentTab('about')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${contentTab === 'about'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    About Film
                </button>
                <button
                    onClick={() => setContentTab('trailers')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${contentTab === 'trailers'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Trailers & Videos
                </button>
                <button
                    onClick={() => setContentTab('bts')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${contentTab === 'bts'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Behind the Scenes
                </button>
                <button
                    onClick={() => setContentTab('notes')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${contentTab === 'notes'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Director's Notes
                </button>
            </div>

            {/* Content Sections */}
            {contentTab === 'about' && <AboutFilm {...props} />}
            {contentTab === 'trailers' && <TrailersVideos {...props} />}
            {contentTab === 'bts' && <BehindTheScenes {...props} />}
            {contentTab === 'notes' && <DirectorNotes {...props} />}
        </div>
    );
};

export default ContentManager;