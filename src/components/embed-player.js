// public/embed-player.js - Embeddable version for external websites
(function(window, document) {
    'use strict';

    class IndieStreamPlayer {
        constructor(containerId, options) {
            this.containerId = containerId;
            this.container = document.getElementById(containerId);
            this.options = options;
            this.apiBase = 'https://downersfilm.com/api/embed'; // Update for production
            this.domain = window.location.hostname;
            this.videoElement = null;
            this.adContainer = null;
            this.adsManager = null;
            this.isPlayingAd = false;
            this.hasTrackedView = false;
            
            // Validate container exists
            if (!this.container) {
                throw new Error(`Container with ID "${containerId}" not found`);
            }
            
            this.init();
        }

        async init() {
            try {
                this.showLoading();
                
                const filmData = await this.getFilmData();
                
                if (!filmData.success) {
                    this.showError(filmData.error || 'Failed to load film data');
                    return;
                }

                this.initPlayer(filmData.film);
                
            } catch (error) {
                console.error('IndieStream Player Error:', error);
                this.showError('Failed to load player');
            }
        }

        async getFilmData() {
            try {
                const response = await fetch(`${this.apiBase}/film-data`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        film_id: this.options.filmId,
                        domain: this.domain,
                        user_token: this.getUserToken()
                    })
                });

                return await response.json();
            } catch (error) {
                console.error('API request failed:', error);
                return { success: false, error: 'Network error' };
            }
        }

        initPlayer(film) {
            // Get ad tag URL if not premium
            const isPremium = this.options.type === 'premium';
            const adTagUrl = isPremium ? null : this.getAdTagUrl();
            
            console.log('Initializing player:', { film: film.title, isPremium, hasAds: !!adTagUrl });
            
            this.container.innerHTML = `
                <div class="indiestream-embed" style="
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                ">
                    <!-- Premium/Free indicator -->
                    <div style="
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        padding: 6px 12px;
                        background: ${isPremium ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)'};
                        color: white;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        z-index: 10;
                        backdrop-filter: blur(4px);
                    ">
                        ${isPremium ? 'Premium' : 'Free'}
                    </div>

                    <div class="video-container" style="
                        position: relative;
                        width: 100%;
                        height: 0;
                        padding-bottom: 56.25%;
                        background: #000;
                    ">
                        <!-- Ad container for Google IMA -->
                        <div id="${this.containerId}-ad-container" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: ${this.isPlayingAd ? 3 : 1};
                            pointer-events: ${this.isPlayingAd ? 'auto' : 'none'};
                        "></div>
                        
                        <!-- Main video element -->
                        <video 
                            id="${this.containerId}-video"
                            controls
                            playsInline
                            preload="metadata"
                            poster="${film.posterUrl || ''}"
                            style="
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                z-index: 2;
                            "
                        >
                            <source src="${film.movieUrl}" type="video/mp4">
                            Your browser does not support video playback.
                        </video>

                        <!-- Error overlay -->
                        <div id="${this.containerId}-error" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.8);
                            color: white;
                            display: none;
                            align-items: center;
                            justify-content: center;
                            z-index: 4;
                            text-align: center;
                            padding: 20px;
                        ">
                            <div>
                                <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
                                <div style="font-size: 16px; margin-bottom: 10px;">Playback Error</div>
                                <div style="font-size: 14px; opacity: 0.8;">Please check your connection and try again</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Film information bar -->
                    <div style="
                        padding: 20px;
                        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                        color: white;
                    ">
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            ${film.posterUrl ? `
                                <img src="${film.posterUrl}" alt="${film.title}" style="
                                    width: 60px;
                                    height: 90px;
                                    object-fit: cover;
                                    border-radius: 6px;
                                    flex-shrink: 0;
                                ">
                            ` : ''}
                            <div style="flex: 1; min-width: 0;">
                                <h3 style="
                                    margin: 0 0 8px 0; 
                                    font-size: 20px; 
                                    font-weight: 700;
                                    line-height: 1.2;
                                ">${film.title}</h3>
                                <p style="
                                    margin: 0 0 12px 0; 
                                    font-size: 14px; 
                                    color: #9ca3af;
                                    font-weight: 500;
                                ">
                                    Directed by ${film.filmmaker}
                                </p>
                                <p style="
                                    margin: 0; 
                                    font-size: 14px; 
                                    color: #d1d5db; 
                                    line-height: 1.5;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 3;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                ">
                                    ${film.synopsis ? film.synopsis.substring(0, 200) + (film.synopsis.length > 200 ? '...' : '') : 'A compelling independent film.'}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Powered by badge -->
                        <div style="
                            margin-top: 16px;
                            padding-top: 16px;
                            border-top: 1px solid #374151;
                            text-align: center;
                        ">
                            <a href="https://downersfilm.com" target="_blank" style="
                                color: #9ca3af;
                                text-decoration: none;
                                font-size: 12px;
                                font-weight: 500;
                                transition: color 0.3s ease;
                            " onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#9ca3af'">
                                Powered by IndieStream
                            </a>
                        </div>
                    </div>
                </div>
            `;

            // Get video element reference
            this.videoElement = document.getElementById(`${this.containerId}-video`);
            this.adContainer = document.getElementById(`${this.containerId}-ad-container`);
            
            // Set up video event listeners
            this.setupVideoEvents();
            
            // Initialize ads if enabled
            if (adTagUrl && !isPremium) {
                this.setupAds(adTagUrl);
            }

            console.log('Player initialized successfully');
        }

        setupVideoEvents() {
            if (!this.videoElement) return;

            this.videoElement.addEventListener('loadstart', () => {
                console.log('Video loading started');
            });

            this.videoElement.addEventListener('loadedmetadata', () => {
                console.log('Video metadata loaded');
            });

            this.videoElement.addEventListener('play', () => {
                console.log('Video play started');
                this.trackEvent('play');
                
                if (!this.hasTrackedView) {
                    this.hasTrackedView = true;
                    // View is already tracked in getFilmData, but we could track additional play events
                }
            });

            this.videoElement.addEventListener('pause', () => {
                console.log('Video paused');
            });

            this.videoElement.addEventListener('ended', () => {
                console.log('Video completed');
                this.trackEvent('complete');
            });

            this.videoElement.addEventListener('error', (e) => {
                console.error('Video error:', e);
                this.showVideoError();
            });

            // Track progress at 25%, 50%, 75%
            this.videoElement.addEventListener('timeupdate', () => {
                if (this.videoElement.duration > 0) {
                    const progress = (this.videoElement.currentTime / this.videoElement.duration) * 100;
                    
                    if (progress >= 25 && !this.tracked25) {
                        this.tracked25 = true;
                        this.trackEvent('progress_25');
                    } else if (progress >= 50 && !this.tracked50) {
                        this.tracked50 = true;
                        this.trackEvent('progress_50');
                    } else if (progress >= 75 && !this.tracked75) {
                        this.tracked75 = true;
                        this.trackEvent('progress_75');
                    }
                }
            });
        }

        setupAds(adTagUrl) {
            // Load Google IMA SDK if not already loaded
            if (!window.google?.ima) {
                console.log('Loading Google IMA SDK...');
                const script = document.createElement('script');
                script.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
                script.async = true;
                script.onload = () => {
                    console.log('Google IMA SDK loaded');
                    this.initializeAds(adTagUrl);
                };
                script.onerror = (error) => {
                    console.error('Failed to load Google IMA SDK:', error);
                };
                document.head.appendChild(script);
            } else {
                this.initializeAds(adTagUrl);
            }
        }

        initializeAds(adTagUrl) {
            try {
                console.log('Initializing ads with tag:', adTagUrl);

                if (!this.videoElement || !this.adContainer) {
                    console.error('Video element or ad container not found');
                    return;
                }

                // Create ad display container
                const adDisplayContainer = new window.google.ima.AdDisplayContainer(
                    this.adContainer, 
                    this.videoElement
                );
                
                // Must be done via user action
                this.videoElement.addEventListener('click', () => {
                    adDisplayContainer.initialize();
                }, { once: true });

                // Create ads loader
                const adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);

                // Listen for ads manager loaded
                adsLoader.addEventListener(
                    window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                    (event) => this.onAdsManagerLoaded(event),
                    false
                );

                // Listen for ad errors
                adsLoader.addEventListener(
                    window.google.ima.AdErrorEvent.Type.AD_ERROR,
                    (event) => this.onAdError(event),
                    false
                );

                // Create ads request
                const adsRequest = new window.google.ima.AdsRequest();
                adsRequest.adTagUrl = adTagUrl;
                adsRequest.linearAdSlotWidth = this.videoElement.clientWidth;
                adsRequest.linearAdSlotHeight = this.videoElement.clientHeight;
                adsRequest.nonLinearAdSlotWidth = this.videoElement.clientWidth;
                adsRequest.nonLinearAdSlotHeight = this.videoElement.clientHeight / 3;

                // Request ads
                adsLoader.requestAds(adsRequest);

            } catch (error) {
                console.error('Error initializing ads:', error);
            }
        }

        onAdsManagerLoaded(event) {
            console.log('Ads manager loaded');
            
            try {
                this.adsManager = event.getAdsManager(this.videoElement);

                // Add event listeners
                this.adsManager.addEventListener(
                    window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
                    () => {
                        console.log('Content pause requested');
                        this.isPlayingAd = true;
                        this.videoElement.pause();
                    }
                );

                this.adsManager.addEventListener(
                    window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
                    () => {
                        console.log('Content resume requested');
                        this.isPlayingAd = false;
                        this.videoElement.play();
                    }
                );

                this.adsManager.addEventListener(
                    window.google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                    () => {
                        console.log('All ads completed');
                        this.isPlayingAd = false;
                    }
                );

                // Initialize and start ads
                this.adsManager.init(
                    this.videoElement.clientWidth,
                    this.videoElement.clientHeight,
                    window.google.ima.ViewMode.NORMAL
                );

                this.adsManager.start();

            } catch (error) {
                console.error('Error setting up ads manager:', error);
                this.onAdError({ getError: () => ({ getMessage: () => error.message }) });
            }
        }

        onAdError(event) {
            console.error('Ad error:', event.getError().getMessage());
            
            // Cleanup ads manager
            if (this.adsManager) {
                this.adsManager.destroy();
                this.adsManager = null;
            }
            
            this.isPlayingAd = false;
            
            // Continue with content video
            if (this.videoElement) {
                this.videoElement.play();
            }
        }

        showVideoError() {
            const errorOverlay = document.getElementById(`${this.containerId}-error`);
            if (errorOverlay) {
                errorOverlay.style.display = 'flex';
            }
        }

        getAdTagUrl() {
            // Use Google's test ad tag for now
            const correlator = Date.now();
            return `https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=${correlator}`;
        }

        async trackEvent(eventType, metadata = {}) {
            try {
                await fetch(`${this.apiBase}/track-event`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        film_id: this.options.filmId,
                        event_type: eventType,
                        domain: this.domain,
                        user_token: this.getUserToken(),
                        metadata: {
                            timestamp: Date.now(),
                            ...metadata
                        }
                    })
                });
                
                console.log('Event tracked:', eventType);
            } catch (error) {
                console.error('Tracking failed:', error);
            }
        }

        getUserToken() {
            let token = localStorage.getItem('indiestream_user_token');
            if (!token) {
                token = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                localStorage.setItem('indiestream_user_token', token);
            }
            return token;
        }

        showLoading() {
            this.container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                ">
                    <div style="text-align: center;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            border: 4px solid rgba(255,255,255,0.3);
                            border-top: 4px solid white;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto 20px auto;
                        "></div>
                        <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
                            Loading IndieStream Player
                        </div>
                        <div style="font-size: 14px; opacity: 0.8;">
                            Preparing your viewing experience...
                        </div>
                    </div>
                </div>
                <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                </style>
            `;
        }

        showError(message) {
            this.container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                    color: white;
                    text-align: center;
                    padding: 40px;
                    border-radius: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                ">
                    <div>
                        <div style="font-size: 48px; margin-bottom: 20px;">🎬</div>
                        <div style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">
                            Unable to Load Player
                        </div>
                        <div style="font-size: 16px; opacity: 0.9; margin-bottom: 20px;">
                            ${message}
                        </div>
                        <div style="font-size: 14px; opacity: 0.7;">
                            Please check your connection and try refreshing the page
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Global API - this is what external websites will use
    window.IndieStream = {
        init: function(containerId, options) {
            try {
                return new IndieStreamPlayer(containerId, options);
            } catch (error) {
                console.error('IndieStream initialization error:', error);
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `
                        <div style="
                            padding: 20px; 
                            background: #fee; 
                            color: #d63031; 
                            border-radius: 8px;
                            text-align: center;
                            font-family: Arial, sans-serif;
                        ">
                            <strong>IndieStream Error:</strong> ${error.message}
                        </div>
                    `;
                }
            }
        },
        
        version: '1.0.0'
    };

    // Auto-initialize if data attributes are present
    document.addEventListener('DOMContentLoaded', function() {
        const autoInitElements = document.querySelectorAll('[data-indiestream-film-id]');
        autoInitElements.forEach(element => {
            const filmId = element.getAttribute('data-indiestream-film-id');
            const type = element.getAttribute('data-indiestream-type') || 'free';
            
            if (filmId && element.id) {
                window.IndieStream.init(element.id, {
                    filmId: filmId,
                    type: type
                });
            }
        });
    });

})(window, document);