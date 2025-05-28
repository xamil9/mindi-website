import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

const VideoLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside modal closes it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail preview */}
      <div className={isOpen ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="max-w-xl mx-auto p-6">
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-full overflow-hidden rounded-lg shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/video/thumbnail.jpg"
              alt="Watch the film"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <PlayIcon className="h-12 w-12 text-white opacity-90" />
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox modal with fade-in */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div
            ref={modalRef}
            className="relative w-[90%] max-w-4xl pointer-events-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-50 text-white text-3xl font-bold hover:text-gray-400"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <video
                src="/video/hero-video.mp4"
                className="w-full h-full object-contain"
                autoPlay
                controls
              />
            </div>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default VideoLightbox;
