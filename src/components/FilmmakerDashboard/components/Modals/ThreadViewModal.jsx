import React from 'react';
import { X } from 'lucide-react';

const ThreadViewModal = ({
    selectedFilm,
    filmId,
    showThreadViewModal,
    setShowThreadViewModal,
    handleCopyToClipboard
}) => {
    if (!showThreadViewModal) return null;

    const thread = `🎬 Just released: "${selectedFilm?.title}" - a journey through human resilience...`;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Twitter Thread</h3>
                    <button onClick={() => setShowThreadViewModal(false)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm mb-2">1/5</p>
                        <p>🎬 Just released: "{selectedFilm?.title}" - a journey through human resilience and the power of connection. Now available for streaming!</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm mb-2">2/5</p>
                        <p>This film has been a labor of love, taking 2 years from concept to completion. Every frame tells a story of dedication from our incredible cast and crew.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm mb-2">3/5</p>
                        <p>Special thanks to our amazing supporters who believed in this project from day one. Your faith in independent cinema keeps stories like this alive.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm mb-2">4/5</p>
                        <p>Watch it now with our special launch pricing - 30% off for the first week! Don't miss the director's commentary track for behind-the-scenes insights.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm mb-2">5/5</p>
                        <p>Link to watch: platform.com/films/{filmId}

                            Share if you love independent cinema! 🎭 #IndieFilm #NewRelease #FilmTwitter</p>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => handleCopyToClipboard(thread)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Copy Thread
                    </button>
                    <button
                        onClick={() => {
                            setShowThreadViewModal(false);
                            window.open('https://twitter.com/compose/tweet', '_blank');
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Post on Twitter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreadViewModal;