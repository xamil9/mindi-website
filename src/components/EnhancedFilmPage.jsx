import React, { useState, useEffect, useRef } from 'react';
import {
    Heart, MessageSquare, Share2, Award, Eye, Calendar, Clock,
    Globe, Star, TrendingUp, Film, Users, PlayCircle, Info,
    FileText, Camera, MessageCircle, Video, Play, Maximize2,
    ChevronLeft, ChevronRight, CreditCard, CheckCircle, Gift,
    Mic, Volume2, Code, Twitter, Facebook, Instagram, Youtube,
    DollarSign, Settings, Sparkles, Menu, X, Pause, Send,
    AlertCircle, Loader2, BarChart, TrendingDown, UserCheck
} from 'lucide-react';

// Import the real FilmmakerDashboard
import FilmmakerDashboard from '../components/FilmmakerDashboard';
// Import the film service
import filmService from '../services/filmService';
// Import payment service and components
import paymentService from '../services/paymentService';
import PaymentModal from './PaymentModal';

// Mock serverTimestamp
const serverTimestamp = () => new Date();

const EnhancedFilmPage = ({
    filmId = 'downers-2024',
    initialTab = 'about',
    onNavigateToFilm,
    currentUser: propsCurrentUser,
    onDashboardClick = null
}) => {
    // Mock auth state for the MockAuth component
    const [mockCurrentUser, setMockCurrentUser] = useState(null);

    const signIn = (userData) => {
        setMockCurrentUser(userData);
    };

    const signOut = () => {
        setMockCurrentUser(null);
    };

    // Create userContext object for MockAuth
    const userContext = {
        currentUser: mockCurrentUser,
        signIn,
        signOut
    };

    // Use props currentUser for actual functionality, fallback to mock if not provided
    const currentUser = propsCurrentUser !== undefined ? propsCurrentUser : mockCurrentUser;

    const [activeTab, setActiveTab] = useState(initialTab);
    const [film, setFilm] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [viewsCount, setViewsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [sharesCount, setSharesCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);

    // New state for functional features
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [selectedPaymentTier, setSelectedPaymentTier] = useState(null);
    const [showActorModal, setShowActorModal] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [selectedCommentaryTrack, setSelectedCommentaryTrack] = useState('');
    const [playingVideo, setPlayingVideo] = useState(null);
    const [hasEnhancedAccess, setHasEnhancedAccess] = useState(false);
    const [currentTier, setCurrentTier] = useState(null);

    // Add state for dashboard
    const [showDashboard, setShowDashboard] = useState(false);

    // New state for payment service integration
    const [showPaymentModalNew, setShowPaymentModalNew] = useState(false);
    const [proratedPrice, setProratedPrice] = useState(null);

    const carouselRef = useRef(null);
    const trailerVideoRef = useRef(null);
    const mainVideoRef = useRef(null);

    // Mock trackEvent function
    const trackEvent = (eventName, eventData) => {
        console.log('Track Event:', eventName, eventData);
    };

    // Calculate prorated price for upgrades
    const calculateProratedPrice = async (targetTier) => {
        if (!currentTier || !targetTier) return targetTier.price;

        // If no user logged in, return full price
        if (!currentUser) return targetTier.price;

        try {
            // Use the payment service to calculate
            const prorated = await paymentService.calculateProratedPrice(
                currentUser.uid,
                filmId,
                targetTier,
                currentTier
            );

            return prorated;
        } catch (error) {
            console.error("Error calculating prorated price:", error);
            // Return full price on error
            return targetTier.price;
        }
    };

    // Check if this is an upgrade
    const isUpgrade = (tier) => {
        if (!currentTier) return false;
        return tier.price > currentTier.price;
    };

    // MockAuth component - USES THE MOCK USER CONTEXT
    const MockAuth = () => {
        const { signIn, signOut, currentUser } = userContext; // Use the context directly

        const signInAsFilmmaker = () => {
            signIn({
                uid: 'filmmaker-123',
                displayName: 'John Director',
                email: 'john@filmmaker.com',
                isFilmmaker: true,
                films: ['downers-2024', 'film-2'] // Films this filmmaker owns
            });
        };

        const signInAsViewer = () => {
            signIn({
                uid: 'viewer-456',
                displayName: 'Jane Viewer',
                email: 'jane@viewer.com',
                isFilmmaker: false,
                films: []
            });
        };

        return (
            <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
                {currentUser ? (
                    <div>
                        <p className="text-sm mb-2">Signed in as: {currentUser.displayName}</p>
                        <p className="text-xs text-gray-500 mb-2">
                            Role: {currentUser.isFilmmaker ? 'Filmmaker' : 'Viewer'}
                        </p>
                        <button
                            onClick={signOut}
                            className="text-sm px-3 py-1 bg-red-600 text-white rounded"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 mb-2">Film ID: {filmId}</p>
                        <button
                            onClick={signInAsFilmmaker}
                            className="block w-full text-sm px-3 py-1 bg-blue-600 text-white rounded"
                        >
                            Sign in as Filmmaker
                        </button>
                        <button
                            onClick={signInAsViewer}
                            className="block w-full text-sm px-3 py-1 bg-gray-600 text-white rounded"
                        >
                            Sign in as Viewer
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // FIXED: Check if user can access dashboard - USES THE ACTUAL CURRENT USER
    const canAccessDashboard = () => {
        console.log('=== Dashboard Access Check ===');
        console.log('Current User:', currentUser);
        console.log('Is Filmmaker?:', currentUser?.isFilmmaker);
        console.log('User Films:', currentUser?.films);
        console.log('Film ID:', filmId);
        console.log('Owns This Film?:', currentUser?.films?.includes(filmId));

        if (!currentUser) {
            console.log('❌ No user logged in');
            return false;
        }

        if (!currentUser.isFilmmaker) {
            console.log('❌ User is not a filmmaker');
            return false;
        }

        // FIXED: Check if films array exists and includes current film
        if (!currentUser.films || !currentUser.films.includes(filmId)) {
            console.log('❌ Filmmaker does not own this film');
            return false;
        }

        console.log('✅ All checks passed - Dashboard access granted');
        return true;
    };

    // Debug effect to log when currentUser changes
    useEffect(() => {
        if (currentUser) {
            console.log('Current user state changed:', currentUser);
            console.log('Can access dashboard?', canAccessDashboard());
        }
    }, [currentUser]);

    // Set current user for film service
    useEffect(() => {
        if (currentUser && filmService.setCurrentUser) {
            // Let the film service know who the current user is
            filmService.setCurrentUser(currentUser);
        }
    }, [currentUser]);

    // REPLACED: Fetch film data with real API implementation
    useEffect(() => {
        const fetchFilmData = async () => {
            console.log('Starting fetchFilmData for filmId:', filmId);
            try {
                setLoading(true);
                setError(null);

                // Fetch film data from API
                const filmData = await filmService.getFilmData(filmId);
                console.log('Film data received:', filmData);

                setFilm(filmData);
                setLikesCount(filmData.likesCount || 0);
                setViewsCount(filmData.viewsCount || 0);
                setCommentsCount(filmData.commentsCount || 0);
                setSharesCount(filmData.sharesCount || 0);

                // Increment view count
                try {
                    await filmService.incrementViewCount(filmId);
                    setViewsCount(prev => prev + 1);
                    trackEvent('Film Viewed', { filmId, filmTitle: filmData.title });
                } catch (viewError) {
                    console.error("Error incrementing view count:", viewError);
                    // Don't fail the whole load if view increment fails
                }

                // Check user-specific data if logged in
                if (currentUser) {
                    try {
                        // Get user's interaction with this film
                        const purchaseStatus = await filmService.getUserPurchaseStatus(
                            filmId,
                            currentUser.uid
                        );

                        setHasPurchased(purchaseStatus.hasPurchased);
                        setCurrentTier(purchaseStatus.tier);
                        setHasEnhancedAccess(purchaseStatus.tier?.enhanced || false);

                        // Check if user has liked this film
                        setLiked(filmData.userHasLiked || false);
                    } catch (userError) {
                        console.error("Error fetching user data:", userError);
                        // Continue without user-specific data
                    }
                }

                // Fetch analytics if filmmaker owns this film
                if (currentUser?.isFilmmaker && currentUser.films?.includes(filmId)) {
                    try {
                        const analytics = await filmService.getFilmAnalytics(
                            filmId,
                            currentUser.uid
                        );

                        if (analytics) {
                            setAnalytics({
                                completionRate: analytics.completionRate,
                                monthlyGrowth: analytics.monthlyGrowth,
                                // Store full analytics for detailed views
                                fullAnalytics: analytics
                            });
                        }
                    } catch (analyticsError) {
                        console.error("Error fetching analytics:", analyticsError);
                        // Continue without analytics
                    }
                }
            } catch (error) {
                console.error("Error fetching film data:", error);
                setError("Failed to load film data. Please refresh the page and try again.");
            } finally {
                console.log('Setting loading to false');
                setLoading(false);
            }
        };

        if (filmId) {
            fetchFilmData();
        } else {
            console.error('No filmId provided');
            setError("No film ID provided");
            setLoading(false);
        }
    }, [filmId, currentUser]);

    // Fetch reviews when reviews tab is active
    useEffect(() => {
        if (activeTab === 'reviews' && !reviewsLoading) {
            fetchReviews();
        }
    }, [activeTab]);

    // Fetch comments when comment modal opens
    useEffect(() => {
        if (showCommentModal && !commentsLoading) {
            fetchComments();
        }
    }, [showCommentModal]);

    // Check rental expiration
    useEffect(() => {
        let expirationCheckInterval;

        if (currentTier?.type === 'rental' && hasPurchased && currentUser && !loading) {
            // Check rental status every 5 minutes
            expirationCheckInterval = setInterval(async () => {
                try {
                    const rentalStatus = await paymentService.checkRentalStatus(
                        currentUser.uid,
                        filmId
                    );

                    if (!rentalStatus.active) {
                        alert("Your rental has expired.");
                        setHasPurchased(false);
                        setCurrentTier(null);
                        setHasEnhancedAccess(false);
                    }
                } catch (error) {
                    console.error("Error checking rental status:", error);
                    // Continue - don't interrupt viewing on error
                }
            }, 5 * 60 * 1000); // 5 minutes
        }

        return () => {
            if (expirationCheckInterval) {
                clearInterval(expirationCheckInterval);
            }
        };
    }, [currentTier, hasPurchased, currentUser?.uid, filmId, loading]);

    // REPLACED: Fetch reviews with real API
    const fetchReviews = async () => {
        setReviewsLoading(true);
        try {
            const { reviews, total, averageRating } = await filmService.getReviews(filmId);

            setReviews(reviews);
            // Update the film rating if it comes from reviews
            if (averageRating && film) {
                setFilm(prev => ({ ...prev, rating: averageRating }));
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    // REPLACED: Fetch comments with real API
    const fetchComments = async () => {
        setCommentsLoading(true);
        try {
            const { comments, total } = await filmService.getComments(filmId);

            setComments(comments);
            setCommentsCount(total);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setComments([]);
        } finally {
            setCommentsLoading(false);
        }
    };

    // REPLACED: Handle like with real API
    const handleLike = async () => {
        if (!currentUser) {
            alert("Please sign in to like films");
            return;
        }

        try {
            const { liked, likesCount } = await filmService.toggleLike(
                filmId,
                currentUser.uid
            );

            setLiked(liked);
            setLikesCount(likesCount);

            trackEvent(liked ? 'Film Liked' : 'Film Unliked', {
                filmId,
                filmTitle: film.title
            });
        } catch (error) {
            console.error("Error updating like:", error);
            // Revert on error
            alert("Failed to update like. Please try again.");
        }
    };

    // REPLACED: Handle share with real API
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: film.title,
                    text: film.synopsis,
                    url: window.location.href
                });

                // Track share on backend
                await filmService.trackShare(filmId);
                setSharesCount(prev => prev + 1);
                trackEvent('Film Shared', { filmId, filmTitle: film.title });
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    const handleComment = () => {
        if (!currentUser) {
            alert("Please sign in to comment");
            return;
        }
        setShowCommentModal(true);
        trackEvent('Comment Modal Opened', { filmId });
    };

    // REPLACED: Handle submit comment with real API
    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setSubmittingComment(true);
        try {
            const comment = await filmService.postComment(
                filmId,
                currentUser.uid,
                newComment
            );

            // Add new comment to the list
            setComments(prev => [comment, ...prev]);
            setCommentsCount(prev => prev + 1);
            setNewComment('');
            trackEvent('Comment Posted', { filmId });
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleSupport = () => {
        if (!currentUser) {
            alert("Please sign in to support creators");
            return;
        }
        setShowSupportModal(true);
        trackEvent('Support Modal Opened', { filmId });
    };

    const handleSupportAmount = async (amount) => {
        trackEvent('Support Amount Selected', { amount, filmId });
        // Here you would integrate with payment processing
        alert(`Processing $${amount} support payment...`);
        setShowSupportModal(false);
    };

    const handlePaymentTier = async (tier) => {
        if (tier.type === 'free') {
            // Handle free tier selection
            setCurrentTier(tier);
            setHasPurchased(true);
            setHasEnhancedAccess(false);

            // Store in Firestore as a free "purchase"
            if (currentUser) {
                try {
                    await paymentService.recordFreeTier(
                        currentUser.uid,
                        filmId,
                        tier
                    );
                } catch (error) {
                    console.error("Error recording free tier:", error);
                    // Continue anyway - user can still watch
                }
            }

            trackEvent('Free Tier Selected', { filmId });
            return;
        }

        if (!currentUser) {
            alert("Please sign in to watch films");
            return;
        }

        try {
            // Calculate prorated price
            const prorated = await calculateProratedPrice(tier);
            setProratedPrice(prorated);
            setSelectedPaymentTier(tier);
            setShowPaymentModalNew(true);

            trackEvent('Payment Modal Opened', {
                tierType: tier.type,
                originalPrice: tier.price,
                proratedPrice: prorated,
                isUpgrade: isUpgrade(tier),
                filmId
            });
        } catch (error) {
            console.error("Error handling payment tier:", error);
            // Fall back to showing full price
            setProratedPrice(tier.price);
            setSelectedPaymentTier(tier);
            setShowPaymentModalNew(true);
        }
    };

    const handlePaymentSuccess = async (tier) => {
        // Update local state
        setHasPurchased(true);
        setCurrentTier(tier);
        setHasEnhancedAccess(tier.enhanced || false);

        // Track the event
        trackEvent('Payment Completed', {
            tierType: tier.type,
            price: proratedPrice || tier.price,
            filmId
        });

        // Reset payment state
        setShowPaymentModalNew(false);
        setSelectedPaymentTier(null);
        setProratedPrice(null);
    };

    const handleVideoPlay = (videoType) => {
        setPlayingVideo(videoType);
        trackEvent('Video Played', { videoType, filmId });
    };

    const handleSeekToTimestamp = (timestamp) => {
        if (mainVideoRef.current) {
            mainVideoRef.current.currentTime = timestamp;
            mainVideoRef.current.play();
            trackEvent('Seeked to Timestamp', { timestamp, filmId });
        }
    };

    const handleCommentaryChange = (e) => {
        setSelectedCommentaryTrack(e.target.value);
        trackEvent('Commentary Track Changed', { trackId: e.target.value, filmId });
        // Here you would switch audio tracks in the video player
    };

    const handleLikeAnnotation = async (annotationId) => {
        if (!currentUser) {
            alert("Please sign in to like annotations");
            return;
        }

        // Update annotation likes in state
        setFilm(prev => ({
            ...prev,
            annotations: prev.annotations.map(ann =>
                ann.id === annotationId
                    ? { ...ann, likes: (ann.likes || 0) + 1 }
                    : ann
            )
        }));

        trackEvent('Annotation Liked', { annotationId, filmId });
    };

    const handleActorClick = (actor) => {
        const actorDetails = film.castDetails?.find(c => c.actor === actor) || {
            actor: actor,
            character: "Cast Member",
            bio: "Biography coming soon..."
        };
        setSelectedActor(actorDetails);
        setShowActorModal(true);
        trackEvent('Actor Modal Opened', { actor, filmId });
    };

    const handleRelatedFilmClick = (relatedFilmId) => {
        trackEvent('Related Film Clicked', { fromFilmId: filmId, toFilmId: relatedFilmId });
        if (onNavigateToFilm) {
            onNavigateToFilm(relatedFilmId);
        } else {
            // Fallback navigation
            window.location.href = `/film/${relatedFilmId}`;
        }
    };

    const handleTrailerPlayPause = () => {
        if (trailerVideoRef.current) {
            if (isTrailerPlaying) {
                trailerVideoRef.current.pause();
                setIsTrailerPlaying(false);
                trackEvent('Trailer Paused', { filmId });
            } else {
                trailerVideoRef.current.play();
                setIsTrailerPlaying(true);
                trackEvent('Trailer Played', { filmId });
            }
        }
    };

    const handleFullscreen = () => {
        if (trailerVideoRef.current) {
            if (trailerVideoRef.current.requestFullscreen) {
                trailerVideoRef.current.requestFullscreen();
            } else if (trailerVideoRef.current.webkitRequestFullscreen) {
                trailerVideoRef.current.webkitRequestFullscreen();
            } else if (trailerVideoRef.current.msRequestFullscreen) {
                trailerVideoRef.current.msRequestFullscreen();
            }
            trackEvent('Trailer Fullscreen', { filmId });
        }
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 200;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setShowMobileMenu(false);
        trackEvent('Film Tab Clicked', { tab: tabId, filmId });
    };

    // Rental Timer Component
    const RentalTimer = ({ userId, filmId }) => {
        const [timeRemaining, setTimeRemaining] = useState(null);

        useEffect(() => {
            const checkTime = async () => {
                try {
                    const status = await paymentService.checkRentalStatus(userId, filmId);
                    if (status.hoursRemaining !== undefined) {
                        setTimeRemaining(status.hoursRemaining);
                    }
                } catch (error) {
                    console.error("Error checking rental time:", error);
                    // Don't show timer on error
                }
            };

            checkTime();
            const interval = setInterval(checkTime, 60000); // Update every minute

            return () => clearInterval(interval);
        }, [userId, filmId]);

        if (timeRemaining === null) return null;

        return (
            <span className="text-xs text-gray-500">
                ({timeRemaining}h remaining)
            </span>
        );
    };

    // All tabs in one array for mobile menu - removed 'enhanced' tab
    const allTabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'watch', label: 'Watch Now', icon: CreditCard },
        { id: 'trailer', label: 'Trailer', icon: Video },
        { id: 'director', label: "Director's Notes", icon: FileText },
        { id: 'bts', label: 'Behind the Scenes', icon: Camera },
        { id: 'credits', label: 'Credits', icon: Users },
        { id: 'reviews', label: 'Reviews', icon: MessageCircle },
        { id: 'moments', label: 'Key Moments', icon: PlayCircle },
        { id: 'technical', label: 'Technical', icon: Settings },
        { id: 'analytics', label: 'Film DNA', icon: TrendingUp }
    ];

    // Split tabs for desktop
    const tabsFirstRow = allTabs.slice(0, 5);
    const tabsSecondRow = allTabs.slice(5);

    const FilmDNACard = ({ aspect, data }) => (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{aspect}</span>
                <span className="text-xs sm:text-sm font-bold text-blue-600">{data?.value || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${data?.value || 0}%` }}
                />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{data?.description || 'No data available'}</p>
        </div>
    );

    // Enhanced Viewing Preview Component for Free Tier
    const EnhancedViewingPreview = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* Preview Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                            Preview Enhanced Features
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Experience a sample of our premium viewing features
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 line-through">$6.99</p>
                        <p className="text-lg font-bold text-green-600">Free Preview</p>
                    </div>
                </div>
            </div>

            {/* Sample Annotations */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    Sample Scene Annotations
                </h4>
                <div className="space-y-2 sm:space-y-3">
                    {film?.annotations?.slice(0, 2).map((annotation) => (
                        <div key={annotation.id} className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                            <div className="text-xs sm:text-sm text-gray-500 font-mono whitespace-nowrap">
                                {Math.floor(annotation.timestamp / 60)}:{(annotation.timestamp % 60).toString().padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <span className="font-medium text-xs sm:text-sm truncate">{annotation.User?.name || 'Anonymous'}</span>
                                    <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${annotation.type === 'director' ? 'bg-purple-100 text-purple-700' :
                                        'bg-blue-100 text-blue-700'
                                        }`}>
                                        {annotation.type}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{annotation.content}</p>
                            </div>
                        </div>
                    ))}
                    <div className="text-center py-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 mb-2">
                            <span className="font-semibold">+45 more annotations</span> available with Premium
                        </p>
                    </div>
                </div>
            </div>

            {/* Sample Commentary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Director's Commentary Preview
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Play className="h-8 w-8 text-gray-400" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">30-second preview available</p>
                            <p className="text-xs text-gray-500">Full 96-minute commentary with Premium</p>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Play Commentary Preview
                    </button>
                </div>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Unlock Full Enhanced Experience</h3>
                <p className="mb-4 text-sm opacity-90">
                    Get all annotations, full commentary tracks, chapter navigation, and more
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => handlePaymentTier(film.pricingTiers[2])}
                        className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Upgrade to Premium Rental - ${calculateProratedPrice(film.pricingTiers[2]).toFixed(2)}
                        {currentTier?.price > 0 && (
                            <span className="text-xs block text-gray-500">
                                (was ${film.pricingTiers[2].price})
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => handlePaymentTier(film.pricingTiers[3])}
                        className="px-6 py-3 bg-purple-800 bg-opacity-50 text-white rounded-lg font-semibold hover:bg-opacity-70 transition-colors"
                    >
                        Own Forever - ${calculateProratedPrice(film.pricingTiers[3]).toFixed(2)}
                        {currentTier?.price > 0 && (
                            <span className="text-xs block opacity-80">
                                (was ${film.pricingTiers[3].price})
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    // Comment Modal Component
    const CommentModal = () => (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCommentModal(false)}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Comments
                        </h3>
                        <button
                            onClick={() => setShowCommentModal(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {commentsLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <Users className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{comment.userName}</span>
                                        <span className="text-sm text-gray-500">
                                            {comment.timestamp instanceof Date ?
                                                comment.timestamp.toLocaleString() :
                                                new Date(comment.timestamp).toLocaleString()
                                            }
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                                    <button className="mt-2 flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                                        <Heart className="h-3 w-3" />
                                        <span>{comment.likes || 0}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
                    )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                        />
                        <button
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim() || submittingComment}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {submittingComment ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Support Modal Component
    const SupportModal = () => (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSupportModal(false)}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                            Support the Creator
                        </h3>
                        <button
                            onClick={() => setShowSupportModal(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Show your appreciation for {film?.director}'s work by sending a one-time support payment.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                            onClick={() => handleSupportAmount(5)}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg font-semibold"
                        >
                            $5
                        </button>
                        <button
                            onClick={() => handleSupportAmount(10)}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg font-semibold"
                        >
                            $10
                        </button>
                        <button
                            onClick={() => handleSupportAmount(25)}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg font-semibold"
                        >
                            $25
                        </button>
                        <button
                            onClick={() => handleSupportAmount(50)}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg font-semibold"
                        >
                            $50
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            const amount = prompt("Enter custom amount:");
                            if (amount && !isNaN(amount)) {
                                handleSupportAmount(parseFloat(amount));
                            }
                        }}
                        className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Custom Amount
                    </button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                        100% of your support goes directly to the filmmaker
                    </p>
                </div>
            </div>
        </div>
    );



    // Actor Modal Component
    const ActorModal = () => (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowActorModal(false)}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Cast Member</h3>
                        <button
                            onClick={() => setShowActorModal(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Users className="h-16 w-16 text-gray-400" />
                        </div>
                        <h4 className="text-2xl font-bold mb-1">{selectedActor?.actor}</h4>
                        <p className="text-gray-600 dark:text-gray-400">as {selectedActor?.character}</p>
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p>{selectedActor?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500">Loading film...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 p-4">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-500 mb-2 text-center">{error}</p>
                <p className="text-gray-500 text-sm mb-4">Film ID: {filmId}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    if (!film) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Film not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 pt-2 sm:pt-3">
            {/* MockAuth Component */}
            <MockAuth />

            {/* FIXED: Show Dashboard Modal with proper z-index */}
            {showDashboard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <FilmmakerDashboard
                            filmId={filmId}
                            onClose={() => {
                                console.log('Closing dashboard');
                                setShowDashboard(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Modals */}
            {showCommentModal && <CommentModal />}
            {showSupportModal && <SupportModal />}
            {showPaymentModalNew && (
                <PaymentModal
                    showModal={showPaymentModalNew}
                    onClose={() => {
                        setShowPaymentModalNew(false);
                        setSelectedPaymentTier(null);
                        setProratedPrice(null);
                    }}
                    selectedTier={selectedPaymentTier}
                    currentUser={currentUser}
                    filmId={filmId}
                    film={film}
                    onPaymentSuccess={handlePaymentSuccess}
                    isUpgrade={isUpgrade(selectedPaymentTier)}
                    proratedPrice={proratedPrice}
                />
            )}
            {showActorModal && selectedActor && <ActorModal />}

            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                {/* FIXED: Dashboard Access Button with better logging */}
                {canAccessDashboard() && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => {
                                console.log('Dashboard button clicked!');
                                console.log('Can access dashboard?', canAccessDashboard());
                                console.log('onDashboardClick provided?', !!onDashboardClick);
                                console.log('Setting showDashboard to true');

                                // If custom callback provided, use it
                                if (onDashboardClick) {
                                    onDashboardClick(filmId, currentUser);
                                    return;
                                }

                                // Option 1: Navigate to a separate dashboard route
                                // window.location.href = `/dashboard/${filmId}`;

                                // Option 2: Show the dashboard modal (default)
                                setShowDashboard(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
                        >
                            <Settings className="h-4 w-4" />
                            <span>Filmmaker Dashboard</span>
                        </button>
                    </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${liked ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${liked ? 'fill-current' : ''}`} />
                        <span className="hidden sm:inline">{likesCount.toLocaleString()}</span>
                        <span className="sm:hidden">{likesCount > 999 ? `${(likesCount / 1000).toFixed(1)}k` : likesCount}</span>
                    </button>

                    <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">{viewsCount.toLocaleString()} views</span>
                        <span className="sm:hidden">{viewsCount > 999 ? `${(viewsCount / 1000).toFixed(0)}k` : viewsCount}</span>
                    </div>

                    <button
                        onClick={handleComment}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 transition-all text-sm sm:text-base"
                    >
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">Comment</span>
                        <span>{commentsCount || 0}</span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 transition-all text-sm sm:text-base"
                    >
                        <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">Share</span>
                        <span>{sharesCount || 0}</span>
                    </button>

                    {/* Support Creator Button */}
                    <button
                        onClick={handleSupport}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Support</span>
                    </button>
                </div>

                {/* Awards Section */}
                {film.awards && film.awards.length > 0 && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                        {film.awards.map((award, index) => (
                            <div key={index} className="flex items-center gap-1 sm:gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                                <span className="text-xs sm:text-sm font-medium">{award.name} - {award.category}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                    <span className="flex items-center gap-2">
                        {allTabs.find(tab => tab.id === activeTab)?.icon &&
                            React.createElement(allTabs.find(tab => tab.id === activeTab).icon, { className: "h-4 w-4" })
                        }
                        <span className="font-medium">{allTabs.find(tab => tab.id === activeTab)?.label}</span>
                    </span>
                    {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* Mobile Menu Dropdown */}
                {showMobileMenu && (
                    <div className="absolute left-0 right-0 z-50 mt-2 mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        {allTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''
                                        } ${tab.id === allTabs[0].id ? 'rounded-t-lg' : ''} ${tab.id === allTabs[allTabs.length - 1].id ? 'rounded-b-lg' : ''}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Desktop Tabs Navigation */}
            <div className="hidden lg:block border-b border-gray-200 dark:border-gray-700 mb-6">
                {/* First Row of Tabs */}
                <div className="flex justify-center gap-1">
                    {tabsFirstRow.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-2 px-3 xl:px-4 py-2 xl:py-3 border-b-2 whitespace-nowrap transition-all text-sm xl:text-base ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden xl:inline">{tab.label}</span>
                                <span className="xl:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Second Row of Tabs */}
                <div className="flex justify-center gap-1 mt-1">
                    {tabsSecondRow.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-2 px-3 xl:px-4 py-2 xl:py-3 border-b-2 whitespace-nowrap transition-all text-sm xl:text-base ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden xl:inline">{tab.label}</span>
                                <span className="xl:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'about' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Film Poster */}
                            <div className="md:col-span-1">
                                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <Film className="h-16 w-16 mx-auto mb-2" />
                                            <p className="text-sm">Film Poster</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Synopsis and Details */}
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Synopsis</h3>
                                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{film.synopsis}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mb-1 sm:mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Year</p>
                                        <p className="font-semibold text-sm sm:text-base">{film.year}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mb-1 sm:mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Duration</p>
                                        <p className="font-semibold text-sm sm:text-base">{film.duration} min</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                        <Film className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mb-1 sm:mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Genre</p>
                                        <p className="font-semibold text-sm sm:text-base">{film.genre}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                        <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mb-1 sm:mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Language</p>
                                        <p className="font-semibold text-sm sm:text-base">{film.language}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Cast</h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {film.cast && film.cast.length > 0 ? (
                                    film.cast.map((actor, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleActorClick(actor)}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm sm:text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                        >
                                            {actor}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Cast information not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'watch' && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* Show current tier status if user has access */}
                        {hasPurchased && currentTier && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                            Current access: <span className="font-semibold">{currentTier.name}</span>
                                            {currentTier.type === 'rental' && currentUser && (
                                                <RentalTimer userId={currentUser.uid} filmId={filmId} />
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCurrentTier(null);
                                            setHasPurchased(false);
                                            setHasEnhancedAccess(false);
                                        }}
                                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                                    >
                                        Change plan
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Pricing Tiers - show condensed view if user has selected a tier */}
                        {!hasPurchased ? (
                            // Full pricing grid when no tier selected
                            <div className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {film.pricingTiers?.map((tier) => (
                                        <div key={tier.id} className={`bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border-2 transition-all ${tier.badge ? 'border-blue-500 shadow-lg' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
                                            }`}>
                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${tier.type === 'free' ? 'bg-green-100 text-green-700' :
                                                    tier.type === 'rental' ? 'bg-blue-100 text-blue-700' :
                                                        tier.type === 'purchase' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {tier.type === 'free' ? 'Free' : tier.type}
                                                </span>
                                                {tier.badge && (
                                                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                                        {tier.badge}
                                                    </span>
                                                )}
                                                {tier.type === 'rental' && tier.duration && (
                                                    <span className="text-xs text-gray-500">{tier.duration}h</span>
                                                )}
                                            </div>

                                            <h4 className="font-semibold text-base sm:text-lg mb-2">{tier.name}</h4>
                                            <p className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                                                {tier.price === 0 ? 'Free' : `$${tier.price}`}
                                            </p>

                                            <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                                                {tier.features?.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <button
                                                onClick={() => handlePaymentTier(tier)}
                                                className={`w-full py-2 rounded-lg transition-colors text-sm sm:text-base ${tier.badge
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                                                    }`}
                                            >
                                                {tier.price === 0 ? 'Watch Free' :
                                                    tier.type === 'rental' ? 'Rent Now' : 'Buy Now'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Condensed upgrade options when tier is selected
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <h4 className="font-medium mb-3 text-sm">Upgrade Options</h4>
                                <div className="flex flex-wrap gap-3">
                                    {film.pricingTiers?.filter(tier => tier.price > currentTier.price).map((tier) => (
                                        <button
                                            key={tier.id}
                                            onClick={() => handlePaymentTier(tier)}
                                            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all text-sm"
                                        >
                                            <span className="font-medium">{tier.name}</span>
                                        </button>
                                    ))}
                                    {film.pricingTiers?.filter(tier => tier.price > currentTier.price).length === 0 && (
                                        <p className="text-sm text-gray-500">You have the highest tier available</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Active Campaign Banner */}
                        {film.activeCampaign && (
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 sm:p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{film.activeCampaign.name}</h4>
                                        <p className="text-sm sm:text-base mb-2">{film.activeCampaign.description}</p>
                                        <p className="text-xl sm:text-2xl font-bold">
                                            {film.activeCampaign.discount}% OFF - Limited Time!
                                        </p>
                                    </div>
                                    <Gift className="h-12 w-12 sm:h-16 sm:w-16 opacity-20" />
                                </div>
                                <div className="mt-3 sm:mt-4 text-xs sm:text-sm opacity-90">
                                    Ends in {film.activeCampaign.daysLeft} days
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

                        {/* Enhanced Viewing Section */}
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                {hasEnhancedAccess ? 'Enhanced Viewing Experience' : 'Now Playing'}
                                {!hasEnhancedAccess && currentTier?.type !== 'free' && (
                                    <span className="text-sm font-normal text-gray-500">(Upgrade for Enhanced Features)</span>
                                )}
                            </h3>

                            {/* Video Player - Available for ALL tiers */}
                            {hasPurchased && (
                                <div className="relative">
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-white">
                                            <div className="text-center">
                                                <Play className="h-16 w-16 mx-auto mb-4" />
                                                <p className="text-lg mb-2">Video Player Placeholder</p>
                                                <p className="text-sm text-gray-400">Actual video would play here</p>
                                            </div>
                                        </div>

                                        {/* Annotation markers on timeline - only for enhanced users */}
                                        {hasEnhancedAccess && (
                                            <div className="absolute bottom-10 left-0 right-0 h-1 bg-gray-700">
                                                {film.annotations?.map((annotation) => (
                                                    <div
                                                        key={annotation.id}
                                                        onClick={() => handleSeekToTimestamp(annotation.timestamp)}
                                                        className="absolute w-2 h-2 bg-blue-500 rounded-full -top-0.5 cursor-pointer hover:scale-150 transition-transform"
                                                        style={{ left: `${(annotation.timestamp / (film.duration * 60)) * 100}%` }}
                                                        title={annotation.content}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Ad overlay for free tier */}
                                        {currentTier?.hasAds && (
                                            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-medium">
                                                Ad Supported
                                            </div>
                                        )}
                                    </div>

                                    {/* Commentary Track Selector - only for enhanced users */}
                                    {hasEnhancedAccess && (
                                        <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-4">
                                            <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                            <select
                                                value={selectedCommentaryTrack}
                                                onChange={handleCommentaryChange}
                                                className="flex-1 px-2 sm:px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm sm:text-base"
                                            >
                                                <option value="">No Commentary</option>
                                                {film.commentaryTracks?.map((track) => (
                                                    <option key={track.id} value={track.id}>
                                                        {track.title} - {track.speakerNames?.join(', ')}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            )}

                            {hasEnhancedAccess ? (
                                <>
                                    {/* Full Enhanced Features for Premium Users */}
                                    {/* Annotations List */}
                                    {film.annotations && film.annotations.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                            <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                                Scene Annotations
                                            </h4>
                                            <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
                                                {film.annotations.map((annotation) => (
                                                    <div key={annotation.id} className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg">
                                                        <div
                                                            onClick={() => handleSeekToTimestamp(annotation.timestamp)}
                                                            className="text-xs sm:text-sm text-gray-500 font-mono whitespace-nowrap cursor-pointer hover:text-blue-600"
                                                        >
                                                            {Math.floor(annotation.timestamp / 60)}:{(annotation.timestamp % 60).toString().padStart(2, '0')}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                                                <span className="font-medium text-xs sm:text-sm truncate">{annotation.User?.name || 'Anonymous'}</span>
                                                                <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${annotation.type === 'director' ? 'bg-purple-100 text-purple-700' :
                                                                    annotation.type === 'technical' ? 'bg-green-100 text-green-700' :
                                                                        'bg-blue-100 text-blue-700'
                                                                    }`}>
                                                                    {annotation.type}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{annotation.content}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleLikeAnnotation(annotation.id)}
                                                            className="text-gray-400 hover:text-red-500 flex items-center gap-1"
                                                        >
                                                            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                                                            <span className="text-xs">{annotation.likes || 0}</span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Chapter Navigation */}
                                    {film.chapters && film.chapters.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Chapters</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {film.chapters.map((chapter, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSeekToTimestamp(chapter.timestamp)}
                                                        className="text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <span className="text-xs text-gray-500">
                                                            {Math.floor(chapter.timestamp / 60)}:{(chapter.timestamp % 60).toString().padStart(2, '0')}
                                                        </span>
                                                        <p className="text-xs sm:text-sm font-medium truncate">{chapter.title}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : currentTier?.type === 'free' ? (
                                // Show preview for free tier users (below the video player)
                                <EnhancedViewingPreview />
                            ) : currentTier && (
                                // Show upgrade prompt for basic rental users (below the video player)
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                <Sparkles className="h-5 w-5 text-purple-500" />
                                                Unlock Enhanced Features
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Upgrade to Premium for director's commentary, scene annotations, and chapter navigation
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => film?.pricingTiers?.[2] && handlePaymentTier(film.pricingTiers[2])}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                                        >
                                            Upgrade Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'trailer' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500">Trailer not available in demo</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                <h4 className="font-medium mb-2 text-sm sm:text-base">Teaser Trailer</h4>
                                <div
                                    onClick={() => handleVideoPlay('teaser')}
                                    className="aspect-video bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative group"
                                >
                                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 group-hover:text-gray-700 transition-colors" />
                                    <p className="absolute bottom-2 left-2 text-xs text-gray-600 dark:text-gray-400">1:30</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                <h4 className="font-medium mb-2 text-sm sm:text-base">Behind the Scenes Reel</h4>
                                <div
                                    onClick={() => handleVideoPlay('bts')}
                                    className="aspect-video bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative group"
                                >
                                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 group-hover:text-gray-700 transition-colors" />
                                    <p className="absolute bottom-2 left-2 text-xs text-gray-600 dark:text-gray-400">5:45</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tab content remains the same... */}
                {activeTab === 'director' && (
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                        <h3>Director's Vision</h3>
                        <p>
                            Creating "Downers" was a journey of exploring the human condition in its rawest form. The forest scenes
                            represent not just a physical space but a psychological landscape where our characters confront their
                            deepest fears and desires.
                        </p>
                        <p>
                            The mask serves as both a literal and metaphorical device - what we hide behind, what we reveal, and
                            the consequences of taking what isn't ours. Each frame was carefully composed to reflect the internal
                            struggles of our protagonists.
                        </p>
                        <h4>On Working with the Cast</h4>
                        <p>
                            Victoria Doctor and Sean Jones brought an incredible authenticity to their roles. Their chemistry was
                            palpable from the first table read, and they truly understood the complexities of their characters'
                            relationship.
                        </p>
                        <h4>The Visual Language</h4>
                        <p>
                            We chose to shoot in a 2.39:1 aspect ratio to emphasize the isolation and vastness of the forest setting.
                            The color grading shifts subtly throughout the film, reflecting the characters' emotional journey from
                            desperation to hope to confrontation.
                        </p>
                    </div>
                )}

                {activeTab === 'bts' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Production Insights</h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    <li>• Shot entirely on location in the Pacific Northwest over 23 days</li>
                                    <li>• The forest scenes were filmed during the golden hour for natural lighting</li>
                                    <li>• Used practical effects for the cult ritual scenes</li>
                                    <li>• The mask was hand-crafted by a local artisan</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Fun Facts</h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    <li>• The cast lived in cabins near the filming location for authenticity</li>
                                    <li>• Over 17 takes were needed for the mask stealing scene</li>
                                    <li>• The film's score was recorded in a single 12-hour session</li>
                                    <li>• Real forest sounds were incorporated into the sound design</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Behind the Scenes Gallery</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg hover:opacity-90 cursor-pointer transition-opacity">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Camera className="h-8 w-8" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'credits' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Main Crew</h4>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Director</span>
                                        <span className="font-medium">{film.director}</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Producer</span>
                                        <span className="font-medium">Sarah Chen</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Cinematographer</span>
                                        <span className="font-medium">Michael Rodriguez</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Editor</span>
                                        <span className="font-medium">Emily Thompson</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Production Designer</span>
                                        <span className="font-medium">David Park</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Music & Sound</h4>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Composer</span>
                                        <span className="font-medium">Lisa Wong</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Sound Design</span>
                                        <span className="font-medium">Mark Stevens</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Music Supervisor</span>
                                        <span className="font-medium">Jennifer Kim</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cast Carousel */}
                        <div className="mt-6 sm:mt-8">
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Cast</h4>
                            <div className="relative group">
                                <div className="px-8 sm:px-10">
                                    <div
                                        ref={carouselRef}
                                        className="overflow-x-auto -mx-8 sm:-mx-10 px-8 sm:px-10 scrollbar-hide"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        <div className="flex gap-3 sm:gap-4 pb-3 sm:pb-4">
                                            {film.castDetails?.map((cast, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleActorClick(cast.actor)}
                                                    className="flex-shrink-0 w-32 sm:w-40 group/card cursor-pointer"
                                                >
                                                    <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-2 sm:mb-3 shadow-md hover:shadow-xl transition-all duration-200 border-2 border-gray-300 dark:border-gray-600 group-hover/card:scale-105">
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <Users className="h-12 w-12 sm:h-16 sm:w-16" />
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-medium text-xs sm:text-sm">{cast.actor}</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{cast.character}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => scrollCarousel('left')}
                                    className="absolute left-0 top-[35%] -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1.5 sm:p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                                >
                                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel('right')}
                                    className="absolute right-0 top-[35%] -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1.5 sm:p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                                >
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                            <div className="flex items-center gap-0.5 sm:gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 sm:h-6 sm:w-6 ${i < Math.floor(film.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-xl sm:text-2xl font-bold">{film.rating || 0}</span>
                            <span className="text-xs sm:text-base text-gray-600 dark:text-gray-400">from {reviews.length} reviews</span>
                        </div>

                        {reviewsLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : reviews.length > 0 ? (
                            <div className="space-y-3 sm:space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-3 w-3 sm:h-4 sm:w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                            <span className="font-medium text-sm sm:text-base">{review.userName || 'Anonymous'}</span>
                                            <span className="text-xs sm:text-sm text-gray-500">• {new Date(review.timestamp?.toDate ? review.timestamp.toDate() : review.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">No reviews yet. Be the first to review!</p>
                                <button
                                    onClick={() => alert("Review functionality coming soon!")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Write a Review
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'moments' && (
                    <div className="space-y-3 sm:space-y-4">
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Explore key moments from the film as highlighted by viewers and critics.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4">
                                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                    <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-base">The Mask Theft</span>
                                    <span className="text-xs sm:text-sm text-gray-500">00:32:15</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    A pivotal moment where Damon's desperation leads to a fateful decision that changes everything.
                                </p>
                                <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                        Turning Point
                                    </span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                        Suspense
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4">
                                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                    <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-base">Forest Confrontation</span>
                                    <span className="text-xs sm:text-sm text-gray-500">01:05:42</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    The cult catches up with our protagonists in a heart-pounding chase through the dark woods.
                                </p>
                                <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                        Action
                                    </span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                        Climax
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'technical' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Video Specs */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                    <Film className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Video Specifications
                                </h4>
                                <dl className="space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Format</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.format || 'Digital'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Resolution</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.resolution || '4K (3840x2160)'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Aspect Ratio</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.aspectRatio || '2.39:1'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Frame Rate</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.frameRate || '24 fps'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Color Space</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.colorSpace || 'DCI-P3'}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Audio Specs */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                    Audio Specifications
                                </h4>
                                <dl className="space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Format</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.audioFormat || 'Dolby Atmos'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Channels</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.audioChannels || '7.1.4'}</dd>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <dt className="text-gray-600 dark:text-gray-400">Sample Rate</dt>
                                        <dd className="font-medium">{film.technicalSpecs?.sampleRate || '48 kHz'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Film DNA Section */}
                        {film.filmDNA && Object.keys(film.filmDNA).length > 0 && (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    Film DNA™ - Visual & Style Fingerprint
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                                    {Object.entries(film.filmDNA).map(([key, data]) => (
                                        <FilmDNACard
                                            key={key}
                                            aspect={key.replace(/([A-Z])/g, ' $1').trim()}
                                            data={data}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Analytics for filmmakers - ONLY VISIBLE TO FILMMAKERS */}
                        {currentUser?.isFilmmaker && (
                            <>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 sm:p-4">
                                    <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                                        Additional analytics visible only to filmmakers. View detailed insights in your dashboard.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                        <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                                        <p className="text-xl sm:text-2xl font-bold">{viewsCount.toLocaleString()}</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                        <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                                        <p className="text-xl sm:text-2xl font-bold">{analytics?.completionRate || 0}%</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                                        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                                        <p className="text-xl sm:text-2xl font-bold">{analytics?.monthlyGrowth || 0}%</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Growth This Month</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Related Films Section */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">You Might Also Like</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {film.relatedFilms?.map((relatedFilm) => (
                        <div
                            key={relatedFilm.id}
                            onClick={() => handleRelatedFilmClick(relatedFilm.id)}
                            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="aspect-video bg-gray-300 dark:bg-gray-700">
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Film className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="p-2 sm:p-3">
                                <h4 className="font-medium truncate text-sm sm:text-base">{relatedFilm.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{relatedFilm.genre} • {relatedFilm.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnhancedFilmPage;