import React, { useRef, useState } from 'react';
import ShareModal from './ShareModal';
import newLogo from '../assets/images/new-logo.svg';
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { trackEvent } from '../utils/trackEvent';

const HeroSection = ({ onOpenShare, onOpenWatchNow }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef(null);

  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      trackEvent('Toggle Sound', { muted: video.muted });
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      video.currentTime = 0;
      video.play();
      setIsPaused(false);
      setHasEnded(false);
      trackEvent('Restart Video');
    } else if (video.paused) {
      video.play();
      setIsPaused(false);
      trackEvent('Play Video');
    } else {
      video.pause();
      setIsPaused(true);
      trackEvent('Pause Video');
    }
  };

  const RatingBadge = () => (
    <div className="relative group inline-block">
      <span className="inline-block px-2 py-0.5 bg-white/10 border border-white/30 rounded text-[10px] font-semibold tracking-wide text-white">
        NR
      </span>
      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-[200px] text-center bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40 border border-white/20 shadow-lg whitespace-normal leading-tight">
        language, mild violence,<br />limited drug use and depictions of domestic abuse
      </div>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      <div className="relative h-screen">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted={isMuted}
          loop={true}
          playsInline
          onEnded={() => {
            setIsPaused(true);
            setHasEnded(true);
            trackEvent('Video Ended');
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90 z-10" />

        {/* Mobile Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3 sm:hidden">
          <div className="flex gap-2">
            <button
              onClick={() => {
                trackEvent('Clicked Watch Now', { source: 'HeroSection', device: 'mobile' });
                onOpenWatchNow();
              }}
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Watch Now"
            >
              ▶
            </button>
            <button
              onClick={() => {
                trackEvent('Clicked Share', { source: 'HeroSection', device: 'mobile' });
                onOpenShare();
              }}
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Share"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M 12.5 1 C 11.125 1 10 2.125 10 3.5 C 10 3.671875 10.019531 3.835938 10.050781 4 L 5.519531 6.039063 C 5.0625 5.414063 4.328125 5 3.5 5 C 2.125 5 1 6.125 1 7.5 C 1 8.875 2.125 10 3.5 10 C 4.332031 10 5.074219 9.582031 5.527344 8.949219 L 10.0625 10.964844 C 10.023438 11.136719 10 11.316406 10 11.5 C 10 12.875 11.125 14 12.5 14 C 13.875 14 15 12.875 15 11.5 C 15 10.125 13.875 9 12.5 9 C 11.667969 9 10.925781 9.417969 10.472656 10.050781 L 5.9375 8.039063 C 5.976563 7.863281 6 7.683594 6 7.5 C 6 7.3125 5.976563 7.128906 5.9375 6.953125 L 10.445313 4.914063 C 10.898438 5.570313 11.652344 6 12.5 6 C 13.875 6 15 4.875 15 3.5 C 15 2.125 13.875 1 12.5 1 Z M 12.5 2 C 13.335938 2 14 2.664063 14 3.5 C 14 4.335938 13.335938 5 12.5 5 C 11.664063 5 11 4.335938 11 3.5 C 11 2.664063 11.664063 2 12.5 2 Z M 3.5 6 C 4.335938 6 5 6.664063 5 7.5 C 5 8.335938 4.335938 9 3.5 9 C 2.664063 9 2 8.335938 2 7.5 C 2 6.664063 2.664063 6 3.5 6 Z M 12.5 10 C 13.335938 10 14 10.664063 14 11.5 C 14 12.335938 13.335938 13 12.5 13 C 11.664063 13 11 12.335938 11 11.5 C 11 10.664063 11.664063 10 12.5 10 Z" />
              </svg>
            </button>

          </div>
          <img src={newLogo} alt="Film Logo" className="w-[100px]" />
          <div className="flex gap-2">
            <button
              onClick={toggleSound}
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Toggle Sound"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-4 w-4 text-white" />
              ) : (
                <SpeakerWaveIcon className="h-4 w-4 text-white" />
              )}
            </button>
            <button
              onClick={togglePlayPause}
              className="w-9 h-9 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Toggle Play/Pause"
            >
              {isPaused || hasEnded ? (
                <PlayIcon className="h-4 w-4 text-white" />
              ) : (
                <PauseIcon className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden sm:flex absolute bottom-6 right-6 z-30 gap-3">
          <button
            onClick={toggleSound}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="h-5 w-5 text-white" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5 text-white" />
            )}
          </button>
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Toggle Play/Pause"
          >
            {isPaused || hasEnded ? (
              <PlayIcon className="h-5 w-5 text-white" />
            ) : (
              <PauseIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-end h-full px-4 sm:px-8 pb-24 md:pb-12 space-y-4 text-left">
          <div className="hidden sm:block mt-auto">
            <img src={newLogo} alt="Film Logo" className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[600px]" />
          </div>

          <div className="hidden sm:block max-w-3xl">
            <p className="text-base md:text-lg leading-relaxed mb-3 drop-shadow">
              Damon and Devon are going through it! Flamboyant Hustlers. Superstitious Gangsters.
              Creepy Death Cults and rent is <strong>still</strong> too damn high! An Atlanta Story.
            </p>
            <div className="flex flex-row gap-3">
              <button
                onClick={() => {
                  trackEvent('Clicked Watch Now', { source: 'HeroSection', device: 'desktop' });
                  onOpenWatchNow();
                }}
                className="bg-white text-black px-4 py-2.5 text-base rounded-md font-semibold hover:bg-opacity-80 transition"
              >
                ▶ Watch Now
              </button>
              <button
                onClick={() => {
                  trackEvent('Clicked Share', { source: 'HeroSection', device: 'desktop' });
                  onOpenShare();
                }}
                className="border border-white px-4 py-2.5 text-base rounded-md text-white font-semibold hover:bg-white/20 transition"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Description */}
      <div className="block sm:hidden px-4 py-6 max-w-3xl mx-auto text-sm leading-relaxed drop-shadow text-center">
        Damon and Devon are going through it! Flamboyant Hustlers. Superstitious Gangsters.
        Creepy Death Cults and rent is <strong>still</strong> too damn high! An Atlanta Story.
      </div>

      {/* Metadata */}
      <div className="hidden sm:block absolute bottom-[11%] right-[3vw] text-right space-y-1 text-xs md:text-sm capitalize drop-shadow max-w-xs z-30 bg-black/60 p-3 rounded-md">
        <p><span className="text-gray-400">Director:</span> Xavier Miles</p>
        <p><span className="text-gray-400">Cast:</span> Victoria Doctor, Sean Jones, Kyle Porter, Jesse Lewis IV</p>
        <p><span className="text-gray-400">Run Time:</span> 96min</p>
        <RatingBadge />
      </div>
    </div>
  );
};

export default HeroSection;
