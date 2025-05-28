// src/components/VideoPlayer.jsx - Simplified IMA integration with Analytics Tracking
import React, { useEffect, useRef, useState, useCallback } from 'react';

const VideoPlayer = ({ src, poster, adTagUrl, filmId, userId, isEmbedded = false, embedDomain = null }) => {
  // State
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [isPremium, setIsPremium] = useState(!adTagUrl);
  const [adError, setAdError] = useState(null);
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const [viewTracked, setViewTracked] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const adContainerRef = useRef(null);
  const adsManagerRef = useRef(null);
  const adsLoaderRef = useRef(null);

  // Default to sample video if no src is provided
  const videoSrc = src || "/sample-video.mp4";

  // Log component state
  console.log("VideoPlayer rendered:", { isPremium, adTagUrl, isPlayingAd });

  // Track video view (after 10 seconds of playback)
  const trackView = useCallback(async () => {
    if (viewTracked || !filmId) return;

    try {
      await fetch('/api/analytics/track-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          filmId,
          userId,
          timestamp: new Date().toISOString(),
          isEmbedded,
          domain: embedDomain || window.location.hostname,
          userAgent: navigator.userAgent
        })
      });
      setViewTracked(true);
      console.log('View tracked successfully');
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }, [viewTracked, filmId, userId, isEmbedded, embedDomain]);

  // Track ad events
  const trackAdEvent = useCallback(async (eventType, adData) => {
    if (!filmId) return;

    try {
      await fetch('/api/analytics/track-ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          filmId,
          userId,
          eventType, // 'impression', 'start', 'complete', 'skip', 'click'
          timestamp: new Date().toISOString(),
          adId: adData?.adId,
          adTitle: adData?.adTitle,
          advertiser: adData?.advertiser,
          duration: adData?.duration,
          isEmbedded,
          domain: embedDomain || window.location.hostname
        })
      });
      console.log(`Ad event tracked: ${eventType}`);
    } catch (error) {
      console.error('Error tracking ad event:', error);
    }
  }, [filmId, userId, isEmbedded, embedDomain]);

  // Track view after 10 seconds of playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !filmId) return;

    const handleTimeUpdate = () => {
      // Track view after 10 seconds of playback
      if (videoElement.currentTime >= 10 && !viewTracked && !isPlayingAd) {
        trackView();
      }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [viewTracked, filmId, isPlayingAd, trackView]);

  // Initialize the Google IMA SDK
  useEffect(() => {
    // Skip for premium users
    if (isPremium) {
      console.log("Premium user - skipping ad setup");
      setPlayerInitialized(true);
      return;
    }

    // Function to load the IMA SDK
    const loadImaScript = () => {
      return new Promise((resolve, reject) => {
        // Check if IMA SDK is already fully loaded
        if (window.google && window.google.ima) {
          console.log("IMA SDK already loaded");
          resolve();
          return;
        }
        // Check if script tag exists and wait for it to load
        const existingScript = document.querySelector('script[src*="ima3.js"]');
        if (existingScript) {
          console.log("IMA script tag exists, waiting for load...");

          // Set up a polling interval to check when SDK is ready
          let attempts = 0;
          const checkInterval = setInterval(() => {
            attempts++;
            if (window.google && window.google.ima) {
              clearInterval(checkInterval);
              console.log("IMA SDK now available");
              resolve();
            } else if (attempts > 50) { // 5 seconds timeout
              clearInterval(checkInterval);
              reject(new Error("IMA SDK load timeout"));
            }
          }, 100);

          return;
        }
        // Create new script tag
        console.log("Loading Google IMA SDK");
        const script = document.createElement('script');
        script.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
        script.async = true;

        let loadTimeout;

        script.onload = () => {
          console.log("IMA SDK script tag loaded");

          // Give SDK time to initialize
          loadTimeout = setTimeout(() => {
            if (window.google && window.google.ima) {
              console.log("Google IMA SDK loaded successfully");
              resolve();
            } else {
              reject(new Error("IMA SDK loaded but not initialized"));
            }
          }, 500);
        };

        script.onerror = (err) => {
          clearTimeout(loadTimeout);
          console.error("Failed to load Google IMA SDK:", err);
          setAdError("Failed to load ad services");
          reject(err);
        };

        document.head.appendChild(script);
      });
    };

    // Only proceed if we have a valid ad tag
    if (!adTagUrl) {
      console.log("No ad tag URL provided");
      setPlayerInitialized(true);
      return;
    }

    // Simple initialization of ads
    const initializeAds = async (retryCount = 0) => {
      try {
        // Load the IMA SDK first
        await loadImaScript();

        // Double-check SDK is available
        if (!window.google || !window.google.ima) {
          if (retryCount < 2) {
            console.log(`IMA SDK not ready, retrying... (attempt ${retryCount + 1})`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return initializeAds(retryCount + 1);
          }
          throw new Error("Google IMA SDK failed to load properly");
        }

        // Get video and ad container elements
        const videoElement = videoRef.current;
        const adContainer = adContainerRef.current;

        if (!videoElement || !adContainer) {
          throw new Error("Video or ad container elements not found");
        }

        // Create the ads loader
        const adDisplayContainer = new window.google.ima.AdDisplayContainer(adContainer, videoElement);

        // Ensure the ad container is properly sized before initialization
        adContainer.style.width = videoElement.offsetWidth + 'px';
        adContainer.style.height = videoElement.offsetHeight + 'px';

        adDisplayContainer.initialize();

        // Create ads loader
        const adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);
        adsLoaderRef.current = adsLoader;

        // Add event listeners
        adsLoader.addEventListener(
          window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          (event) => handleAdsManagerLoaded(event),
          false
        );

        adsLoader.addEventListener(
          window.google.ima.AdErrorEvent.Type.AD_ERROR,
          (event) => handleAdError(event),
          false
        );

        // Request ads
        const adsRequest = new window.google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = videoElement.clientWidth;
        adsRequest.linearAdSlotHeight = videoElement.clientHeight;
        adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
        adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight;

        // Request ads
        adsLoader.requestAds(adsRequest);
        console.log("Ad request sent with tag:", adTagUrl);

        setPlayerInitialized(true);
      } catch (error) {
        console.error("Error initializing ads:", error);
        setAdError(`Ad setup error: ${error.message}`);
        setPlayerInitialized(true); // Still mark as initialized so we can play the main content
      }
    };

    // Handle ad manager loaded
    const handleAdsManagerLoaded = (adsManagerLoadedEvent) => {
      console.log("Ads manager loaded");
      try {
        // Get the ads manager
        const adsManager = adsManagerLoadedEvent.getAdsManager(videoRef.current);
        adsManagerRef.current = adsManager;

        // Add tracking event listeners
        adsManager.addEventListener(window.google.ima.AdEvent.Type.IMPRESSION, (event) => {
          const ad = event.getAd();
          trackAdEvent('impression', {
            adId: ad.getAdId(),
            adTitle: ad.getTitle(),
            advertiser: ad.getAdvertiserName(),
            duration: ad.getDuration()
          });
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.STARTED, (event) => {
          const ad = event.getAd();
          trackAdEvent('start', {
            adId: ad.getAdId(),
            adTitle: ad.getTitle(),
            advertiser: ad.getAdvertiserName()
          });
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.COMPLETE, (event) => {
          const ad = event.getAd();
          trackAdEvent('complete', {
            adId: ad.getAdId(),
            adTitle: ad.getTitle(),
            duration: ad.getDuration()
          });
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, (event) => {
          const ad = event.getAd();
          trackAdEvent('skip', {
            adId: ad.getAdId()
          });
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.CLICK, (event) => {
          const ad = event.getAd();
          trackAdEvent('click', {
            adId: ad.getAdId()
          });
        });

        // Add existing event listeners
        adsManager.addEventListener(window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
          console.log("Content pause requested - ad starting");
          setIsPlayingAd(true);
          videoRef.current.pause();
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
          console.log("Content resume requested - ad finished");
          setIsPlayingAd(false);
          // Ensure video is visible and container is properly sized
          if (adContainerRef.current) {
            adContainerRef.current.style.display = 'none';
          }
          videoRef.current.style.display = 'block';
          videoRef.current.play();
        });

        adsManager.addEventListener(window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED, () => {
          console.log("All ads completed");
          setIsPlayingAd(false);

          // Resume content
          if (videoRef.current) {
            videoRef.current.play();
          }
        });

        adsManager.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (event) => {
          handleAdError(event);
        });

        // Initialize and start ads
        adsManager.init(
          videoRef.current.clientWidth,
          videoRef.current.clientHeight,
          window.google.ima.ViewMode.NORMAL
        );
        adsManager.start();
      } catch (error) {
        console.error("Error setting up ads manager:", error);
        setAdError(`Ad manager error: ${error.message}`);

        // Fall back to content video
        setIsPlayingAd(false);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
    };

    // Handle ad errors
    const handleAdError = (adErrorEvent) => {
      console.error("Ad error:", adErrorEvent.getError());
      setAdError("Ad error: " + adErrorEvent.getError().getMessage());

      // Track ad error
      trackAdEvent('error', {
        error: adErrorEvent.getError().getMessage()
      });

      // Cleanup and fall back to content
      if (adsManagerRef.current) {
        adsManagerRef.current.destroy();
      }

      setIsPlayingAd(false);
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    // Initialize ads
    initializeAds();

    // Cleanup function
    return () => {
      if (adsManagerRef.current) {
        try {
          adsManagerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying ads manager:", e);
        }
      }

      if (adsLoaderRef.current) {
        try {
          adsLoaderRef.current.contentComplete();
        } catch (e) {
          console.error("Error completing ads loader:", e);
        }
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [adTagUrl, isPremium]);

  // Update premium status when adTagUrl changes
  useEffect(() => {
    setIsPremium(!adTagUrl);
  }, [adTagUrl]);

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      if (!isPremium && adsManagerRef.current && !isPlayingAd) {
        try {
          // Try to show pre-roll ad on first play
          adsManagerRef.current.start();
        } catch (e) {
          console.error("Error starting ads manager:", e);
        }
      }
    };

    const handleEnded = () => {
      // Track video completion
      if (filmId && viewTracked) {
        trackAdEvent('video_complete', {
          watchTime: videoElement.currentTime
        });
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('ended', handleEnded);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isPremium, isPlayingAd, filmId, viewTracked]);

  return (
    <div style={{
      backgroundColor: '#000',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Premium indicator */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '4px 8px',
        backgroundColor: isPremium ? 'rgba(16, 185, 129, 0.8)' : 'rgba(245, 158, 11, 0.8)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 10
      }}>
        {isPremium ? 'Premium' : 'Free'}
      </div>

      {/* Video container */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
        position: 'relative',
        backgroundColor: '#000',
        aspectRatio: '16 / 9'  // Maintain aspect ratio
      }}>
        {/* Ad container (for IMA SDK) */}
        <div
          ref={adContainerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: isPlayingAd ? 2 : 1,
            pointerEvents: isPlayingAd ? 'auto' : 'none',
            backgroundColor: isPlayingAd ? '#000' : 'transparent',
            display: isPlayingAd ? 'block' : 'block'  // Always block to maintain dimensions
          }}
        />

        {/* Main video player */}
        <video
          ref={videoRef}
          controls
          playsInline
          poster={poster}
          style={{
            width: '100%',
            borderRadius: '8px',
            display: 'block',
            height: 'auto',
            backgroundColor: '#000'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Ad error message */}
        {adError && !isPremium && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {adError}
          </div>
        )}

        {/* Loading indicator */}
        {!playerInitialized && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '16px'
          }}>
            Loading player...
          </div>
        )}
      </div>

      {/* Status message */}
      <div style={{
        marginTop: '10px',
        textAlign: 'center',
        color: 'white',
        fontSize: '14px'
      }}>
        {isPremium ?
          'Enjoying ad-free viewing with your premium account.' :
          'Upgrade to premium for ad-free viewing.'
        }
      </div>
    </div>
  );
};

export default VideoPlayer;