import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Zap, Award, Eye, Clock, Users, Heart,
    AlertCircle, ChevronRight, Target, Lightbulb,
    BarChart3, Activity, Calendar, MessageSquare,
    DollarSign, Share2, Video, Image, Music, Globe,
    Sparkles, Brain, CheckCircle, X, Loader, Info,
    Volume2, Maximize, MousePointer, Pause, Play,
    SkipForward, Rewind, Headphones, Monitor, Smartphone,
    Tv, ArrowUpRight, ArrowDownRight, TrendingDown,
    UserCheck, UserX, FileText, Link2, Instagram,
    Twitter, Film, Layers, Navigation, Flag,
    Gauge, Shield, Star, Gift, Camera, Facebook, ArrowRight,
    ChevronUp, ChevronDown
} from 'lucide-react';

const AdvancedAIInsights = ({
    filmData = { title: 'My Amazing Film', id: '123' },
    analytics = {},
    jwPlayerData = {},
    monetizationData = {}
}) => {
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState(null);
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [activeCategory, setActiveCategory] = useState('overview');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [processingNewInsights, setProcessingNewInsights] = useState(false);
    const [selectedScene, setSelectedScene] = useState(null);
    const [showSceneModal, setShowSceneModal] = useState(false);
    const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

    useEffect(() => {
        generateAdvancedInsights();
    }, []);

    const generateAdvancedInsights = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newInsights = {
                overview: {
                    score: 87,
                    trend: 'improving',
                    keyMetrics: {
                        engagementScore: 82,
                        retentionScore: 78,
                        monetizationScore: 74,
                        technicalQuality: 91,
                        socialImpact: 69
                    }
                },

                microEngagement: {
                    mouseActivity: {
                        heatmapIntensity: 'high',
                        inactivityPeriods: [
                            { start: 240, end: 420, reason: 'Full immersion - action sequence' },
                            { start: 1800, end: 2100, reason: 'Emotional scene captivation' }
                        ],
                        nearExitMoments: [
                            { timestamp: 180, saved: true, intervention: 'Chapter preview shown' },
                            { timestamp: 960, saved: false }
                        ],
                        averageEngagementScore: 8.2
                    },
                    volumePatterns: {
                        adjustments: [
                            { timestamp: 30, from: 50, to: 75, reason: 'Dialogue clarity' },
                            { timestamp: 450, from: 75, to: 100, reason: 'Action sequence' },
                            { timestamp: 1200, from: 100, to: 60, reason: 'Loud scene to quiet' }
                        ],
                        mutePoints: [
                            { timestamp: 0, duration: 15, reason: 'Opening credits' }
                        ],
                        headphoneUsage: 67, // percentage
                        optimalVolume: 82
                    },
                    fullscreenAnalytics: {
                        conversionRate: 73,
                        averageEntryTime: 45, // seconds
                        exitPoints: [
                            { timestamp: 1800, reason: 'Scene transition' },
                            { timestamp: 3200, reason: 'Near end' }
                        ],
                        correlationWithPurchase: 0.84
                    },
                    interactionVelocity: {
                        peakInteractionMoments: [
                            { timestamp: 420, type: 'annotations', count: 234 },
                            { timestamp: 890, type: 'shares', count: 156 }
                        ],
                        pauseAnalysis: {
                            reflectivePauses: [
                                { timestamp: 567, duration: 45, context: 'Plot twist reveal' },
                                { timestamp: 2340, duration: 30, context: 'Emotional dialogue' }
                            ],
                            technicalPauses: 12,
                            intentionalPauses: 28
                        }
                    }
                },

                scenePerformance: {
                    scenes: [
                        {
                            id: 'opening',
                            name: 'Cold Open',
                            start: 0,
                            end: 180,
                            metrics: {
                                retentionRate: 92,
                                replayCount: 456,
                                skipRate: 3,
                                emotionalTone: 'suspenseful',
                                socialShares: 89,
                                screenshotsTaken: 23,
                                annotationDensity: 12,
                                averageRewatch: 2.3
                            },
                            microMetrics: {
                                volumeIncreases: 15,
                                mouseMovement: 'minimal',
                                fullscreenConversion: 45
                            },
                            insights: 'High retention cold open. Consider similar pacing for future projects.'
                        },
                        {
                            id: 'introduction',
                            name: 'Character Introduction',
                            start: 180,
                            end: 480,
                            metrics: {
                                retentionRate: 88,
                                replayCount: 234,
                                skipRate: 7,
                                emotionalTone: 'curious',
                                socialShares: 45,
                                screenshotsTaken: 67,
                                annotationDensity: 23,
                                averageRewatch: 1.8
                            },
                            microMetrics: {
                                volumeIncreases: 8,
                                mouseMovement: 'moderate',
                                fullscreenConversion: 62
                            },
                            insights: 'Character reveals drive engagement. Screenshot spike indicates memorable visuals.'
                        },
                        {
                            id: 'conflict',
                            name: 'Rising Conflict',
                            start: 480,
                            end: 900,
                            metrics: {
                                retentionRate: 85,
                                replayCount: 189,
                                skipRate: 5,
                                emotionalTone: 'tense',
                                socialShares: 156,
                                screenshotsTaken: 34,
                                annotationDensity: 45,
                                averageRewatch: 1.2
                            },
                            microMetrics: {
                                volumeIncreases: 23,
                                mouseMovement: 'high',
                                fullscreenConversion: 78
                            },
                            insights: 'Tension maintains engagement. High annotation density suggests viewer investment.'
                        }
                    ],
                    transitionQuality: {
                        smoothTransitions: 8,
                        abruptTransitions: 2,
                        viewerConfusion: [
                            { between: 'introduction', and: 'conflict', confusionScore: 15 }
                        ]
                    },
                    optimalChapterPoints: [180, 480, 900, 1500, 2400, 3200]
                },

                revenueAttribution: {
                    conversionJourney: {
                        averageSteps: 4.2,
                        commonPaths: [
                            {
                                path: ['trailer', 'film_start', 'pause_at_10min', 'purchase'],
                                frequency: 34,
                                value: 14.99
                            },
                            {
                                path: ['social_share', 'film_start', 'annotation_click', 'purchase'],
                                frequency: 28,
                                value: 12.99
                            }
                        ],
                        triggerPoints: [
                            { timestamp: 600, trigger: 'Quality realization', conversionRate: 23 },
                            { timestamp: 1200, trigger: 'Emotional investment', conversionRate: 31 },
                            { timestamp: 180, trigger: 'Hook effectiveness', conversionRate: 18 }
                        ]
                    },
                    supportButtonPerformance: {
                        optimalPlacements: [
                            { timestamp: 2400, conversionRate: 12.3, averageAmount: 15.50 },
                            { timestamp: 3600, conversionRate: 18.7, averageAmount: 22.00 }
                        ],
                        hoverAnalytics: {
                            averageHoverTime: 3.2, // seconds
                            hoverToClickRate: 24,
                            abandonmentReasons: ['Too early', 'Wrong moment', 'Price concern']
                        }
                    },
                    priceElasticity: {
                        sweetSpot: 12.99,
                        elasticityCurve: [
                            { price: 7.99, conversion: 28.5, revenue: 227.72 },
                            { price: 9.99, conversion: 24.2, revenue: 241.76 },
                            { price: 12.99, conversion: 19.8, revenue: 257.20 },
                            { price: 14.99, conversion: 15.3, revenue: 229.35 },
                            { price: 19.99, conversion: 8.7, revenue: 173.91 }
                        ],
                        recommendedStrategy: 'Dynamic pricing based on viewer engagement score'
                    }
                },

                socialDynamics: {
                    viralCoefficient: 1.34,
                    sharingPatterns: {
                        mostSharedMoments: [
                            { timestamp: 420, shares: 345, primaryPlatform: 'twitter', sentiment: 'excitement' },
                            { timestamp: 1890, shares: 234, primaryPlatform: 'instagram', sentiment: 'emotional' },
                            { timestamp: 2700, shares: 189, primaryPlatform: 'facebook', sentiment: 'inspirational' }
                        ],
                        shareVelocity: {
                            first24Hours: 456,
                            first7Days: 2341,
                            steadyState: 45 // per day after 30 days
                        }
                    },
                    annotationImpact: {
                        viewLift: {
                            withAnnotations: 2834,
                            withoutAnnotations: 1923,
                            improvement: 47.3
                        },
                        topAnnotations: [
                            {
                                timestamp: 340,
                                author: 'FilmCritic92',
                                likes: 234,
                                influence: 'high',
                                content: 'Notice the mirror symbolism here',
                                resultingShares: 45
                            }
                        ]
                    },
                    communityFormation: {
                        superFans: {
                            count: 67,
                            characteristics: ['Multiple views', 'High sharing', 'Annotation creators'],
                            lifetimeValue: 234.56
                        },
                        discussionTopics: [
                            { topic: 'Ending interpretation', threads: 23, engagement: 'high' },
                            { topic: 'Character motivations', threads: 18, engagement: 'medium' },
                            { topic: 'Cinematography', threads: 12, engagement: 'high' }
                        ]
                    }
                },

                technicalQuality: {
                    streamingPerformance: {
                        averageBitrate: 4500,
                        bitrateOptimization: {
                            autoAdjustments: 234,
                            manualOverrides: 12,
                            commonUserSelection: '1080p'
                        },
                        bufferingEvents: {
                            total: 45,
                            averagePerView: 0.02,
                            criticalMoments: [
                                { timestamp: 1200, impact: 'high', viewers: 23 }
                            ]
                        }
                    },
                    audioExperience: {
                        commentaryTrackUsage: 34,
                        preferredAudioTracks: {
                            original: 78,
                            directorCommentary: 18,
                            castCommentary: 4
                        },
                        subtitleUsage: {
                            total: 45,
                            byLanguage: {
                                english: 23,
                                spanish: 12,
                                french: 10
                            },
                            hearingImpaired: 8
                        }
                    },
                    deviceOptimization: {
                        viewsByDevice: {
                            desktop: { percentage: 38, retention: 89 },
                            mobile: { percentage: 42, retention: 72 },
                            tv: { percentage: 15, retention: 94 },
                            tablet: { percentage: 5, retention: 81 }
                        },
                        optimalDevice: 'tv',
                        mobileSpecificIssues: ['Small text in annotations', 'Complex scenes hard to see']
                    }
                },

                predictiveAnalytics: {
                    viewerRetention: {
                        churnRisk: {
                            high: [
                                { timestamp: 300, riskScore: 78, intervention: 'Show preview of next scene' },
                                { timestamp: 1500, riskScore: 65, intervention: 'Display viewer testimonial' }
                            ],
                            interventionSuccess: 67
                        },
                        projectedCompletion: 76,
                        optimalInterventions: ['Chapter previews', 'Social proof', 'Quality reminder']
                    },
                    viralPotential: {
                        score: 82,
                        reasoning: 'High share velocity, emotional peaks, discussion generation',
                        optimalReleaseTime: 'Friday 7PM EST',
                        expectedPeakViews: 'Day 3-5 post release',
                        amplificationSuggestions: [
                            'Create shareable moment compilations',
                            'Engage with early superfans',
                            'Time social posts with viewer peak times'
                        ]
                    },
                    revenueProjection: {
                        day30Revenue: 45678,
                        day90Revenue: 89234,
                        yearOneRevenue: 234567,
                        ltv: {
                            direct: 15.67,
                            referral: 4.23,
                            merchandise: 8.90,
                            total: 28.80
                        }
                    }
                },

                audienceSegmentation: {
                    segments: [
                        {
                            name: 'Cinephiles',
                            size: 23,
                            characteristics: {
                                behavior: ['Watches credits', 'Uses commentary', 'High retention'],
                                devices: ['TV 67%', 'Desktop 33%'],
                                viewingTime: 'Late evening',
                                socialSharing: 'Very high'
                            },
                            value: {
                                averagePurchase: 19.99,
                                supportCreator: 45.00,
                                referralValue: 67.89
                            },
                            engagement: {
                                annotations: 'Creates',
                                discussions: 'Leads',
                                completion: 98
                            }
                        },
                        {
                            name: 'Casual Viewers',
                            size: 45,
                            characteristics: {
                                behavior: ['Weekend viewing', 'Skip intro', 'Price sensitive'],
                                devices: ['Mobile 78%', 'Tablet 22%'],
                                viewingTime: 'Weekend afternoons',
                                socialSharing: 'Low'
                            },
                            value: {
                                averagePurchase: 9.99,
                                supportCreator: 5.00,
                                referralValue: 12.34
                            },
                            engagement: {
                                annotations: 'Reads',
                                discussions: 'Lurks',
                                completion: 67
                            }
                        },
                        {
                            name: 'Educators',
                            size: 12,
                            characteristics: {
                                behavior: ['Frequent pauses', 'Screenshots', 'Rewatch scenes'],
                                devices: ['Desktop 89%', 'Tablet 11%'],
                                viewingTime: 'Weekday mornings',
                                socialSharing: 'Targeted'
                            },
                            value: {
                                averagePurchase: 49.99,
                                supportCreator: 0,
                                institutionalLicense: 299.99
                            },
                            engagement: {
                                annotations: 'Educational',
                                discussions: 'Professional',
                                completion: 100
                            }
                        }
                    ],
                    migrationPatterns: {
                        casualToCinephile: 8,
                        oneTimeToRepeat: 23,
                        freeToPayingConversion: 18.7
                    }
                },

                creatorInsights: {
                    artisticAlignment: {
                        intendedPacing: {
                            score: 82,
                            matches: ['Opening tension', 'Climax buildup', 'Resolution calm'],
                            mismatches: ['Mid-point drag at 25min', 'Rushed character intro']
                        },
                        emotionalJourney: {
                            intended: ['curiosity', 'tension', 'shock', 'relief', 'satisfaction'],
                            achieved: ['curiosity', 'confusion', 'shock', 'relief', 'wanting more'],
                            alignment: 72
                        },
                        thematicResonance: {
                            primaryTheme: { understood: 78, discussed: 'frequently' },
                            secondaryThemes: { understood: 45, discussed: 'occasionally' },
                            symbolismRecognition: 34
                        }
                    },
                    narrativeEffectiveness: {
                        plotComprehension: {
                            clearPoints: ['Opening mystery', 'Main conflict', 'Resolution'],
                            confusionPoints: ['Timeline jump at 23min', 'Character motivation at 45min'],
                            overall: 81
                        },
                        characterConnection: {
                            protagonist: { connection: 89, journey: 'well understood' },
                            antagonist: { connection: 67, journey: 'partially clear' },
                            supporting: { connection: 45, journey: 'needs development' }
                        }
                    },
                    technicalExecution: {
                        cinematographyImpact: {
                            mentionedInReviews: 234,
                            screenshotMoments: 45,
                            discussionTopics: ['Lighting in scene 3', 'Color grading', 'Camera movement']
                        },
                        audioImpact: {
                            volumeAdjustmentsForMusic: 23,
                            soundDesignMentions: 89,
                            musicShazams: 156
                        }
                    }
                },

                crossPlatformJourney: {
                    discoveryChannels: [
                        { channel: 'Instagram', percentage: 34, conversionRate: 12.3 },
                        { channel: 'Twitter', percentage: 23, conversionRate: 18.7 },
                        { channel: 'Film Blogs', percentage: 18, conversionRate: 24.5 },
                        { channel: 'Word of Mouth', percentage: 15, conversionRate: 31.2 },
                        { channel: 'Platform Browse', percentage: 10, conversionRate: 8.9 }
                    ],
                    touchpointAnalysis: {
                        averageTouchpoints: 4.7,
                        commonSequences: [
                            ['Instagram teaser', 'Twitter discussion', 'Review read', 'Trailer', 'Purchase'],
                            ['Friend recommendation', 'Trailer', 'First 5 min', 'Purchase']
                        ],
                        dropoffPoints: [
                            { after: 'Trailer view', rate: 45 },
                            { after: 'Price reveal', rate: 23 },
                            { after: 'First 5 minutes', rate: 12 }
                        ]
                    }
                },

                recommendations: {
                    immediate: [
                        {
                            title: 'Add Chapter Markers at Scene Breaks',
                            impact: 'High',
                            effort: 'Low',
                            description: 'Improve navigation and retention by 15%',
                            implementation: 'Add markers at timestamps: 180, 480, 900, 1500, 2400',
                            expectedResult: '+15% completion rate',
                            dataSupport: 'Users pause 3x more at these points'
                        },
                        {
                            title: 'Optimize Support Button Timing',
                            impact: 'High',
                            effort: 'Low',
                            description: 'Move support button to emotional peak at 2400s',
                            implementation: 'Trigger after resolution scene',
                            expectedResult: '+45% support conversion',
                            dataSupport: 'Highest engagement and emotional investment'
                        },
                        {
                            title: 'Create Social Clips from Viral Moments',
                            impact: 'Medium',
                            effort: 'Medium',
                            description: 'Extract clips from timestamps 420, 1890, 2700',
                            implementation: 'Auto-generate 30-60s clips with captions',
                            expectedResult: '+234% social reach',
                            dataSupport: 'These moments have highest share velocity'
                        }
                    ],
                    strategic: [
                        {
                            title: 'Implement Dynamic Pricing',
                            impact: 'Very High',
                            effort: 'Medium',
                            description: 'Price based on engagement score and segment',
                            timeline: '2 weeks',
                            expectedRevenue: '+34% revenue',
                            implementation: 'Cinephiles: $19.99, Casual: $9.99, Educators: $49.99'
                        },
                        {
                            title: 'Mobile Experience Optimization',
                            impact: 'High',
                            effort: 'High',
                            description: '42% watch on mobile with lower retention',
                            timeline: '4 weeks',
                            focus: ['Larger annotation text', 'Simplified UI', 'Portrait mode scenes']
                        }
                    ],
                    longTerm: [
                        {
                            title: 'Educational License Program',
                            impact: 'Very High',
                            effort: 'Medium',
                            description: '12% of audience are educators seeking institutional access',
                            potential: '$35,998 additional revenue',
                            timeline: '2-3 months'
                        },
                        {
                            title: 'Superfan Community Platform',
                            impact: 'High',
                            effort: 'High',
                            description: 'Monetize 67 superfans with exclusive content',
                            potential: '$15,730 annual recurring revenue',
                            features: ['Director Q&As', 'Script access', 'Behind scenes']
                        }
                    ]
                }
            };

            setInsights(newInsights);
        } catch (error) {
            console.error('Error generating insights:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshInsights = async () => {
        setProcessingNewInsights(true);
        await generateAdvancedInsights();
        setProcessingNewInsights(false);

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
        notification.innerHTML = '<span>Insights refreshed with latest JW Player data!</span>';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    const CategoryButton = ({ id, label, icon: Icon, badge }) => (
        <button
            onClick={() => setActiveCategory(id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeCategory === id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{label}</span>
            {badge && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {badge}
                </span>
            )}
        </button>
    );

    const SceneDetailModal = () => {
        if (!selectedScene) return null;

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">{selectedScene.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {Math.floor(selectedScene.start / 60)}:{(selectedScene.start % 60).toString().padStart(2, '0')} -
                                    {Math.floor(selectedScene.end / 60)}:{(selectedScene.end % 60).toString().padStart(2, '0')}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowSceneModal(false);
                                    setSelectedScene(null);
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600">Retention</p>
                                <p className="text-xl font-bold">{selectedScene.metrics.retentionRate}%</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600">Replays</p>
                                <p className="text-xl font-bold">{selectedScene.metrics.replayCount}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600">Shares</p>
                                <p className="text-xl font-bold">{selectedScene.metrics.socialShares}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600">Screenshots</p>
                                <p className="text-xl font-bold">{selectedScene.metrics.screenshotsTaken}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Micro-Engagement Metrics</h4>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Volume Increases</span>
                                        <span className="font-medium">{selectedScene.microMetrics.volumeIncreases}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Mouse Activity</span>
                                        <span className="font-medium capitalize">{selectedScene.microMetrics.mouseMovement}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Fullscreen Conversions</span>
                                        <span className="font-medium">{selectedScene.microMetrics.fullscreenConversion}%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">AI Insights</h4>
                                <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-4">
                                    {selectedScene.insights}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    View in Editor
                                </button>
                                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Export Scene Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const InsightDetailModal = () => {
        if (!selectedInsight) return null;

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">{selectedInsight.title}</h3>
                            <button
                                onClick={() => {
                                    setShowDetailModal(false);
                                    setSelectedInsight(null);
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${selectedInsight.impact === 'Very High' ? 'bg-purple-100 text-purple-700' :
                                    selectedInsight.impact === 'High' ? 'bg-red-100 text-red-700' :
                                        selectedInsight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                    }`}>
                                    {selectedInsight.impact} Impact
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${selectedInsight.effort === 'High' ? 'bg-red-100 text-red-700' :
                                    selectedInsight.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {selectedInsight.effort} Effort
                                </span>
                            </div>

                            <p className="text-gray-600">{selectedInsight.description}</p>

                            {selectedInsight.implementation && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">Implementation Steps:</h4>
                                    <p className="text-sm text-gray-600">{selectedInsight.implementation}</p>
                                </div>
                            )}

                            {selectedInsight.expectedResult && (
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2 text-green-900">Expected Result:</h4>
                                    <p className="text-sm text-green-700">{selectedInsight.expectedResult}</p>
                                </div>
                            )}

                            {selectedInsight.dataSupport && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2 text-blue-900">Data Support:</h4>
                                    <p className="text-sm text-blue-700">{selectedInsight.dataSupport}</p>
                                </div>
                            )}

                            {selectedInsight.timeline && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">Timeline: {selectedInsight.timeline}</span>
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Start Implementation
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        setSelectedInsight(null);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
                    <p className="text-gray-600">Analyzing JW Player data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 transition-all ${isHeaderCollapsed ? 'p-3' : 'p-6'}`}>
                {!isHeaderCollapsed ? (
                    <>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <Zap className="h-8 w-8 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Advanced AI Analytics</h3>
                                    <p className="text-gray-600">
                                        Deep insights powered by JW Player behavioral data and machine learning
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={refreshInsights}
                                    disabled={processingNewInsights}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                >
                                    {processingNewInsights ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="h-4 w-4" />
                                    )}
                                    Refresh Insights
                                </button>
                                <button
                                    onClick={() => setIsHeaderCollapsed(true)}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    title="Collapse header"
                                >
                                    <ChevronUp className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Performance Metrics */}
                        {insights && (
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Overall Score</span>
                                        <Activity className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insights.overview.score}</span>
                                        <span className="text-sm text-green-600">↑ 5</span>
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Engagement</span>
                                        <MousePointer className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insights.overview.keyMetrics.engagementScore}%</span>
                                        <span className="text-sm text-green-600">↑ 3%</span>
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Retention</span>
                                        <Clock className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insights.overview.keyMetrics.retentionScore}%</span>
                                        <span className="text-sm text-red-600">↓ 2%</span>
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Revenue</span>
                                        <DollarSign className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insights.overview.keyMetrics.monetizationScore}%</span>
                                        <span className="text-sm text-green-600">↑ 8%</span>
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Social Impact</span>
                                        <Share2 className="h-4 w-4 text-pink-600" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold">{insights.overview.keyMetrics.socialImpact}%</span>
                                        <span className="text-sm text-green-600">↑ 12%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Collapsed view */
                    insights && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-blue-600" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{insights.overview.score}</span>
                                        <span className="text-xs text-green-600">↑5</span>
                                    </div>
                                </div>
                                <div className="h-6 w-px bg-gray-300" />
                                <div className="flex items-center gap-2">
                                    <MousePointer className="h-5 w-5 text-purple-600" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{insights.overview.keyMetrics.engagementScore}%</span>
                                        <span className="text-xs text-green-600">↑3%</span>
                                    </div>
                                </div>
                                <div className="h-6 w-px bg-gray-300" />
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{insights.overview.keyMetrics.retentionScore}%</span>
                                        <span className="text-xs text-red-600">↓2%</span>
                                    </div>
                                </div>
                                <div className="h-6 w-px bg-gray-300" />
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{insights.overview.keyMetrics.monetizationScore}%</span>
                                        <span className="text-xs text-green-600">↑8%</span>
                                    </div>
                                </div>
                                <div className="h-6 w-px bg-gray-300" />
                                <div className="flex items-center gap-2">
                                    <Share2 className="h-5 w-5 text-pink-600" />
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold">{insights.overview.keyMetrics.socialImpact}%</span>
                                        <span className="text-xs text-green-600">↑12%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={refreshInsights}
                                    disabled={processingNewInsights}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    title="Refresh insights"
                                >
                                    {processingNewInsights ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsHeaderCollapsed(false)}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    title="Expand header"
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Category Navigation - Now properly separated */}
            <div className="flex gap-2 overflow-x-auto overflow-y-visible pb-2 pt-2 px-1">
                <CategoryButton id="overview" label="Overview" icon={BarChart3} />
                <CategoryButton id="micro" label="Micro-Engagement" icon={MousePointer} badge="3" />
                <CategoryButton id="scenes" label="Scene Analysis" icon={Film} />
                <CategoryButton id="revenue" label="Revenue Intel" icon={DollarSign} />
                <CategoryButton id="social" label="Social Dynamics" icon={Share2} />
                <CategoryButton id="technical" label="Technical" icon={Gauge} />
                <CategoryButton id="predictive" label="Predictions" icon={TrendingUp} />
                <CategoryButton id="segments" label="Segments" icon={Users} />
                <CategoryButton id="creator" label="Creator" icon={Award} />
            </div>

            {/* Content based on active category */}
            {insights && (
                <div>
                    {/* Overview Tab */}
                    {activeCategory === 'overview' && (
                        <div className="space-y-4">
                            {/* Top Recommendations */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                                    Top Recommendations
                                </h4>
                                <div className="space-y-3">
                                    {insights.recommendations.immediate.map((rec, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                            onClick={() => {
                                                setSelectedInsight(rec);
                                                setShowDetailModal(true);
                                            }}
                                        >
                                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${rec.impact === 'High' ? 'bg-red-500' : 'bg-green-500'
                                                }`} />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h5 className="font-medium">{rec.title}</h5>
                                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className={`text-xs px-2 py-1 rounded ${rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                                                        rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                        {rec.impact} Impact
                                                    </span>
                                                    <span className={`text-xs px-2 py-1 rounded ${rec.effort === 'High' ? 'bg-red-100 text-red-700' :
                                                        rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                        {rec.effort} Effort
                                                    </span>
                                                    {rec.expectedResult && (
                                                        <span className="text-xs text-green-600 font-medium">
                                                            {rec.expectedResult}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Wins vs Strategic Initiatives */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-yellow-500" />
                                        Quick Wins
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <Target className="h-5 w-5 text-yellow-600" />
                                            <div>
                                                <p className="font-medium text-sm">Move Support Button</p>
                                                <p className="text-xs text-gray-600">+45% conversion at 40min mark</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <Video className="h-5 w-5 text-yellow-600" />
                                            <div>
                                                <p className="font-medium text-sm">Extract Viral Clips</p>
                                                <p className="text-xs text-gray-600">3 moments with high share potential</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                                        <Star className="h-5 w-5 text-purple-500" />
                                        Strategic Opportunities
                                    </h4>
                                    <div className="space-y-3">
                                        {insights.recommendations.strategic.slice(0, 2).map((rec, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                                <TrendingUp className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <p className="font-medium text-sm">{rec.title}</p>
                                                    <p className="text-xs text-gray-600">{rec.expectedRevenue}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Micro-Engagement Tab */}
                    {activeCategory === 'micro' && (
                        <div className="space-y-4">
                            {/* Mouse Activity Heatmap */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <MousePointer className="h-5 w-5 text-purple-600" />
                                    Viewer Attention Patterns
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">Engagement Intensity</p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            {insights.microEngagement.mouseActivity.heatmapIntensity}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Based on mouse movement</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">Immersion Score</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {insights.microEngagement.mouseActivity.averageEngagementScore}/10
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Full attention periods</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">Near-Exit Saves</p>
                                        <p className="text-2xl font-bold text-orange-600">67%</p>
                                        <p className="text-xs text-gray-500 mt-1">Prevented drop-offs</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">Full Immersion Periods</h5>
                                    {insights.microEngagement.mouseActivity.inactivityPeriods.map((period, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Eye className="h-4 w-4 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {Math.floor(period.start / 60)}:{(period.start % 60).toString().padStart(2, '0')} -
                                                        {Math.floor(period.end / 60)}:{(period.end % 60).toString().padStart(2, '0')}
                                                    </p>
                                                    <p className="text-xs text-gray-600">{period.reason}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm text-green-600 font-medium">
                                                {Math.round((period.end - period.start) / 60)}min immersion
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Volume Patterns */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Volume2 className="h-5 w-5 text-blue-600" />
                                    Audio Engagement Analysis
                                </h4>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center">
                                        <Headphones className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.microEngagement.volumePatterns.headphoneUsage}%</p>
                                        <p className="text-xs text-gray-600">Headphone users</p>
                                    </div>
                                    <div className="text-center">
                                        <Volume2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.microEngagement.volumePatterns.optimalVolume}%</p>
                                        <p className="text-xs text-gray-600">Optimal volume</p>
                                    </div>
                                    <div className="text-center">
                                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.microEngagement.volumePatterns.adjustments.length}</p>
                                        <p className="text-xs text-gray-600">Volume changes</p>
                                    </div>
                                    <div className="text-center">
                                        <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.microEngagement.volumePatterns.mutePoints.length}</p>
                                        <p className="text-xs text-gray-600">Mute events</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Volume Adjustment Timeline</h5>
                                    {insights.microEngagement.volumePatterns.adjustments.map((adj, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                            <span className="text-gray-600">
                                                {Math.floor(adj.timestamp / 60)}:{(adj.timestamp % 60).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span>{adj.from}%</span>
                                                <ArrowRight className="h-3 w-3" />
                                                <span className="font-medium">{adj.to}%</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{adj.reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fullscreen & Pause Analysis */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                                        <Maximize className="h-5 w-5 text-indigo-600" />
                                        Fullscreen Behavior
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Conversion Rate</span>
                                            <span className="text-2xl font-bold">{insights.microEngagement.fullscreenAnalytics.conversionRate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Avg Entry Time</span>
                                            <span className="font-medium">{insights.microEngagement.fullscreenAnalytics.averageEntryTime}s</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Purchase Correlation</span>
                                            <span className="font-medium text-green-600">+{Math.round(insights.microEngagement.fullscreenAnalytics.correlationWithPurchase * 100)}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                                        <Pause className="h-5 w-5 text-orange-600" />
                                        Pause Intelligence
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <p className="text-xl font-bold">{insights.microEngagement.interactionVelocity.pauseAnalysis.reflectivePauses.length}</p>
                                                <p className="text-xs text-gray-600">Reflective</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{insights.microEngagement.interactionVelocity.pauseAnalysis.technicalPauses}</p>
                                                <p className="text-xs text-gray-600">Technical</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold">{insights.microEngagement.interactionVelocity.pauseAnalysis.intentionalPauses}</p>
                                                <p className="text-xs text-gray-600">Intentional</p>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t">
                                            <p className="text-xs text-gray-600 mb-2">Key Pause Moments:</p>
                                            {insights.microEngagement.interactionVelocity.pauseAnalysis.reflectivePauses.slice(0, 2).map((pause, idx) => (
                                                <p key={idx} className="text-xs text-gray-700">
                                                    • {Math.floor(pause.timestamp / 60)}:{(pause.timestamp % 60).toString().padStart(2, '0')} - {pause.context}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scene Analysis Tab */}
                    {activeCategory === 'scenes' && (
                        <div className="space-y-6">
                            {/* Scene Performance Grid */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Film className="h-5 w-5 text-blue-600" />
                                    Scene-by-Scene Performance
                                </h4>

                                <div className="space-y-4">
                                    {insights.scenePerformance.scenes.map((scene, idx) => (
                                        <div
                                            key={scene.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => {
                                                setSelectedScene(scene);
                                                setShowSceneModal(true);
                                            }}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h5 className="font-medium">{scene.name}</h5>
                                                    <p className="text-sm text-gray-600">
                                                        {Math.floor(scene.start / 60)}:{(scene.start % 60).toString().padStart(2, '0')} -
                                                        {Math.floor(scene.end / 60)}:{(scene.end % 60).toString().padStart(2, '0')}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${scene.metrics.retentionRate >= 90 ? 'bg-green-100 text-green-700' :
                                                    scene.metrics.retentionRate >= 80 ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {scene.metrics.retentionRate}% retention
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4 mb-3">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">{scene.metrics.replayCount}</p>
                                                    <p className="text-xs text-gray-600">Replays</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">{scene.metrics.socialShares}</p>
                                                    <p className="text-xs text-gray-600">Shares</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">{scene.metrics.screenshotsTaken}</p>
                                                    <p className="text-xs text-gray-600">Screenshots</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">{scene.metrics.annotationDensity}</p>
                                                    <p className="text-xs text-gray-600">Annotations</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Emotional tone: <span className="font-medium">{scene.metrics.emotionalTone}</span></span>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h5 className="font-medium mb-2 flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-blue-600" />
                                        Optimal Chapter Points
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {insights.scenePerformance.optimalChapterPoints.map((point, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm">
                                                {Math.floor(point / 60)}:{(point % 60).toString().padStart(2, '0')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Revenue Intelligence Tab */}
                    {activeCategory === 'revenue' && (
                        <div className="space-y-6">
                            {/* Conversion Journey */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Navigation className="h-5 w-5 text-green-600" />
                                    Purchase Journey Analysis
                                </h4>

                                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Average Steps to Purchase</p>
                                            <p className="text-2xl font-bold">{insights.revenueAttribution.conversionJourney.averageSteps}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Conversion Rate</p>
                                            <p className="text-2xl font-bold">18.7%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">Common Purchase Paths</h5>
                                    {insights.revenueAttribution.conversionJourney.commonPaths.map((path, idx) => (
                                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                {path.path.map((step, stepIdx) => (
                                                    <React.Fragment key={stepIdx}>
                                                        <span className="text-xs bg-white px-2 py-1 rounded">{step}</span>
                                                        {stepIdx < path.path.length - 1 && <ChevronRight className="h-3 w-3 text-gray-400" />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">{path.frequency}% of purchases</span>
                                                <span className="font-medium">${path.value} avg</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Elasticity */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                    Price Optimization Intelligence
                                </h4>

                                <div className="mb-4 text-center p-4 bg-purple-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Optimal Price Point</p>
                                    <p className="text-3xl font-bold text-purple-600">${insights.revenueAttribution.priceElasticity.sweetSpot}</p>
                                    <p className="text-sm text-gray-600 mt-1">Maximizes revenue per viewer</p>
                                </div>

                                <div className="space-y-2">
                                    <h5 className="font-medium text-sm mb-2">Price Performance Analysis</h5>
                                    {insights.revenueAttribution.priceElasticity.elasticityCurve.map((point, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="font-medium">${point.price}</span>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-gray-600">{point.conversion}% conv</span>
                                                <span className="font-medium">${point.revenue} rev</span>
                                            </div>
                                            {point.price === insights.revenueAttribution.priceElasticity.sweetSpot && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Optimal</span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                                    <p className="font-medium text-blue-900 mb-1">Recommendation:</p>
                                    <p className="text-blue-700">{insights.revenueAttribution.priceElasticity.recommendedStrategy}</p>
                                </div>
                            </div>

                            {/* Support Button Analytics */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-pink-600" />
                                    Creator Support Analytics
                                </h4>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                                        <p className="text-lg font-bold">{insights.revenueAttribution.supportButtonPerformance.hoverAnalytics.hoverToClickRate}%</p>
                                        <p className="text-xs text-gray-600">Click rate</p>
                                    </div>
                                    <div className="text-center">
                                        <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                        <p className="text-lg font-bold">{insights.revenueAttribution.supportButtonPerformance.hoverAnalytics.averageHoverTime}s</p>
                                        <p className="text-xs text-gray-600">Hover time</p>
                                    </div>
                                    <div className="text-center">
                                        <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                        <p className="text-lg font-bold">$22</p>
                                        <p className="text-xs text-gray-600">Avg support</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Optimal Placement Times</h5>
                                    {insights.revenueAttribution.supportButtonPerformance.optimalPlacements.map((placement, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                            <span className="text-sm">
                                                {Math.floor(placement.timestamp / 60)}:{(placement.timestamp % 60).toString().padStart(2, '0')}
                                            </span>
                                            <div className="text-right">
                                                <p className="font-medium">{placement.conversionRate}% conversion</p>
                                                <p className="text-xs text-gray-600">${placement.averageAmount} average</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Dynamics Tab */}
                    {activeCategory === 'social' && (
                        <div className="space-y-6">
                            {/* Viral Coefficient */}
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-pink-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <Share2 className="h-5 w-5 text-pink-600" />
                                        Viral Dynamics
                                    </h4>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Viral Coefficient</p>
                                        <p className="text-2xl font-bold text-pink-600">{insights.socialDynamics.viralCoefficient}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="bg-white/80 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold">{insights.socialDynamics.sharingPatterns.shareVelocity.first24Hours}</p>
                                        <p className="text-xs text-gray-600">First 24h shares</p>
                                    </div>
                                    <div className="bg-white/80 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold">{insights.socialDynamics.sharingPatterns.shareVelocity.first7Days}</p>
                                        <p className="text-xs text-gray-600">First week shares</p>
                                    </div>
                                    <div className="bg-white/80 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold">{insights.socialDynamics.sharingPatterns.shareVelocity.steadyState}/day</p>
                                        <p className="text-xs text-gray-600">Steady state</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">Most Viral Moments</h5>
                                    {insights.socialDynamics.sharingPatterns.mostSharedMoments.map((moment, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/80 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {moment.primaryPlatform === 'twitter' && <Twitter className="h-4 w-4 text-blue-400" />}
                                                {moment.primaryPlatform === 'instagram' && <Instagram className="h-4 w-4 text-pink-400" />}
                                                {moment.primaryPlatform === 'facebook' && <Facebook className="h-4 w-4 text-blue-700" />}
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {Math.floor(moment.timestamp / 60)}:{(moment.timestamp % 60).toString().padStart(2, '0')}
                                                    </p>
                                                    <p className="text-xs text-gray-600">Sentiment: {moment.sentiment}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{moment.shares}</p>
                                                <p className="text-xs text-gray-600">shares</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Community Formation */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    Community Analytics
                                </h4>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.socialDynamics.communityFormation.superFans.count}</p>
                                        <p className="text-xs text-gray-600">Super Fans</p>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">${insights.socialDynamics.communityFormation.superFans.lifetimeValue}</p>
                                        <p className="text-xs text-gray-600">Avg LTV</p>
                                    </div>
                                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">53</p>
                                        <p className="text-xs text-gray-600">Discussions</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h5 className="font-medium text-sm">Hot Discussion Topics</h5>
                                    {insights.socialDynamics.communityFormation.discussionTopics.map((topic, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm">{topic.topic}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-600">{topic.threads} threads</span>
                                                <span className={`px-2 py-1 rounded text-xs ${topic.engagement === 'high' ? 'bg-green-100 text-green-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {topic.engagement}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Technical Quality Tab */}
                    {activeCategory === 'technical' && (
                        <div className="space-y-6">
                            {/* Streaming Performance */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Gauge className="h-5 w-5 text-blue-600" />
                                    Streaming Quality Metrics
                                </h4>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{insights.technicalQuality.streamingPerformance.averageBitrate}</p>
                                        <p className="text-xs text-gray-600">Avg Bitrate (kbps)</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">{insights.technicalQuality.streamingPerformance.bufferingEvents.averagePerView}</p>
                                        <p className="text-xs text-gray-600">Buffer/View</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{insights.technicalQuality.streamingPerformance.bitrateOptimization.autoAdjustments}</p>
                                        <p className="text-xs text-gray-600">Auto Adjusts</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{insights.technicalQuality.streamingPerformance.bitrateOptimization.commonUserSelection}</p>
                                        <p className="text-xs text-gray-600">Preferred Quality</p>
                                    </div>
                                </div>

                                {insights.technicalQuality.streamingPerformance.bufferingEvents.criticalMoments.length > 0 && (
                                    <div className="p-3 bg-red-50 rounded-lg">
                                        <p className="text-sm font-medium text-red-900 mb-1">⚠️ Critical Buffering Events</p>
                                        {insights.technicalQuality.streamingPerformance.bufferingEvents.criticalMoments.map((event, idx) => (
                                            <p key={idx} className="text-xs text-red-700">
                                                {Math.floor(event.timestamp / 60)}:{(event.timestamp % 60).toString().padStart(2, '0')} - {event.viewers} viewers affected ({event.impact} impact)
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Device Optimization */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Monitor className="h-5 w-5 text-purple-600" />
                                    Device Performance Analysis
                                </h4>

                                <div className="space-y-4">
                                    {Object.entries(insights.technicalQuality.deviceOptimization.viewsByDevice).map(([device, data]) => (
                                        <div key={device} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {device === 'desktop' && <Monitor className="h-5 w-5 text-gray-600" />}
                                                {device === 'mobile' && <Smartphone className="h-5 w-5 text-gray-600" />}
                                                {device === 'tv' && <Tv className="h-5 w-5 text-gray-600" />}
                                                {device === 'tablet' && <Smartphone className="h-5 w-5 text-gray-600 rotate-90" />}
                                                <div>
                                                    <p className="font-medium capitalize">{device}</p>
                                                    <p className="text-xs text-gray-600">{data.percentage}% of views</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{data.retention}%</p>
                                                <p className="text-xs text-gray-600">retention</p>
                                            </div>
                                            {device === insights.technicalQuality.deviceOptimization.optimalDevice && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Optimal</span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {insights.technicalQuality.deviceOptimization.mobileSpecificIssues.length > 0 && (
                                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                        <p className="text-sm font-medium text-yellow-900 mb-1">Mobile Experience Issues:</p>
                                        <ul className="text-xs text-yellow-700 space-y-1">
                                            {insights.technicalQuality.deviceOptimization.mobileSpecificIssues.map((issue, idx) => (
                                                <li key={idx}>• {issue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Audio Experience */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Headphones className="h-5 w-5 text-indigo-600" />
                                    Audio & Subtitle Usage
                                </h4>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium text-sm mb-3">Audio Track Preferences</h5>
                                        <div className="space-y-2">
                                            {Object.entries(insights.technicalQuality.audioExperience.preferredAudioTracks).map(([track, percentage]) => (
                                                <div key={track} className="flex items-center justify-between">
                                                    <span className="text-sm capitalize">{track.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-indigo-600 h-2 rounded-full"
                                                                style={{ width: `${percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-sm mb-3">Subtitle Usage</h5>
                                        <div className="text-center mb-3">
                                            <p className="text-2xl font-bold">{insights.technicalQuality.audioExperience.subtitleUsage.total}%</p>
                                            <p className="text-xs text-gray-600">Total subtitle usage</p>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            {Object.entries(insights.technicalQuality.audioExperience.subtitleUsage.byLanguage).map(([lang, percentage]) => (
                                                <div key={lang} className="flex justify-between">
                                                    <span className="text-gray-600 capitalize">{lang}</span>
                                                    <span className="font-medium">{percentage}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Predictive Analytics Tab */}
                    {activeCategory === 'predictive' && (
                        <div className="space-y-6">
                            {/* Churn Risk Analysis */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-orange-600" />
                                    Viewer Retention Predictions
                                </h4>

                                <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Projected Completion Rate</p>
                                            <p className="text-3xl font-bold text-orange-600">{insights.predictiveAnalytics.viewerRetention.projectedCompletion}%</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Intervention Success</p>
                                            <p className="text-2xl font-bold">{insights.predictiveAnalytics.viewerRetention.churnRisk.interventionSuccess}%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">High-Risk Drop-off Points</h5>
                                    {insights.predictiveAnalytics.viewerRetention.churnRisk.high.map((risk, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">
                                                    {Math.floor(risk.timestamp / 60)}:{(risk.timestamp % 60).toString().padStart(2, '0')}
                                                </p>
                                                <p className="text-xs text-gray-600">Risk Score: {risk.riskScore}%</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-green-600">Intervention:</p>
                                                <p className="text-xs text-gray-600">{risk.intervention}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Viral Potential */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                    Viral Potential Analysis
                                </h4>

                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-purple-600">{insights.predictiveAnalytics.viralPotential.score}</p>
                                            <p className="text-xs text-gray-600">Viral Score</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white/80 rounded-lg p-3">
                                        <p className="text-sm text-gray-600">Optimal Release</p>
                                        <p className="font-medium">{insights.predictiveAnalytics.viralPotential.optimalReleaseTime}</p>
                                    </div>
                                    <div className="bg-white/80 rounded-lg p-3">
                                        <p className="text-sm text-gray-600">Peak Views Expected</p>
                                        <p className="font-medium">{insights.predictiveAnalytics.viralPotential.expectedPeakViews}</p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-medium text-sm mb-2">Amplification Strategies:</h5>
                                    <ul className="space-y-2">
                                        {insights.predictiveAnalytics.viralPotential.amplificationSuggestions.map((suggestion, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Revenue Projections */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    Revenue Projections
                                </h4>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs text-gray-600">30 Days</p>
                                        <p className="text-xl font-bold text-green-600">
                                            ${(insights.predictiveAnalytics.revenueProjection.day30Revenue / 1000).toFixed(1)}K
                                        </p>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs text-gray-600">90 Days</p>
                                        <p className="text-xl font-bold text-green-600">
                                            ${(insights.predictiveAnalytics.revenueProjection.day90Revenue / 1000).toFixed(1)}K
                                        </p>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs text-gray-600">Year 1</p>
                                        <p className="text-xl font-bold text-green-600">
                                            ${(insights.predictiveAnalytics.revenueProjection.yearOneRevenue / 1000).toFixed(0)}K
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h5 className="font-medium text-sm mb-2">Lifetime Value Breakdown</h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Direct Purchase</span>
                                            <span className="font-medium">${insights.predictiveAnalytics.revenueProjection.ltv.direct}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Referral Value</span>
                                            <span className="font-medium">${insights.predictiveAnalytics.revenueProjection.ltv.referral}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Merchandise</span>
                                            <span className="font-medium">${insights.predictiveAnalytics.revenueProjection.ltv.merchandise}</span>
                                        </div>
                                        <div className="flex justify-between text-sm pt-2 border-t">
                                            <span className="font-medium">Total LTV</span>
                                            <span className="font-bold text-green-600">${insights.predictiveAnalytics.revenueProjection.ltv.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Audience Segmentation Tab */}
                    {activeCategory === 'segments' && (
                        <div className="space-y-6">
                            {/* Segment Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {insights.audienceSegmentation.segments.map((segment, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold">{segment.name}</h4>
                                            <span className="text-2xl font-bold text-blue-600">{segment.size}%</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Primary Device</p>
                                                <p className="text-sm font-medium">{segment.characteristics.devices[0]}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Viewing Time</p>
                                                <p className="text-sm font-medium">{segment.characteristics.viewingTime}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Average Purchase</p>
                                                <p className="text-lg font-bold text-green-600">${segment.value.averagePurchase}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Engagement Type</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                        {segment.engagement.annotations}
                                                    </span>
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                        {segment.engagement.completion}% completion
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Migration Patterns */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <UserCheck className="h-5 w-5 text-green-600" />
                                    Audience Evolution
                                </h4>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <ArrowUpRight className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.audienceSegmentation.migrationPatterns.casualToCinephile}%</p>
                                        <p className="text-xs text-gray-600">Casual → Cinephile</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.audienceSegmentation.migrationPatterns.oneTimeToRepeat}%</p>
                                        <p className="text-xs text-gray-600">One-time → Repeat</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.audienceSegmentation.migrationPatterns.freeToPayingConversion}%</p>
                                        <p className="text-xs text-gray-600">Free → Paying</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Creator Insights Tab */}
                    {activeCategory === 'creator' && (
                        <div className="space-y-6">
                            {/* Artistic Alignment */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Artistic Vision Alignment
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-center mb-4">
                                            <div className="relative w-24 h-24 mx-auto">
                                                <svg className="transform -rotate-90 w-24 h-24">
                                                    <circle cx="48" cy="48" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                                                    <circle
                                                        cx="48" cy="48" r="36"
                                                        stroke="#8B5CF6"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray={`${2 * Math.PI * 36}`}
                                                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - insights.creatorInsights.artisticAlignment.intendedPacing.score / 100)}`}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xl font-bold">{insights.creatorInsights.artisticAlignment.intendedPacing.score}%</span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium mt-2">Pacing Match</p>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="text-green-600">✓ {insights.creatorInsights.artisticAlignment.intendedPacing.matches[0]}</p>
                                            <p className="text-red-600">✗ {insights.creatorInsights.artisticAlignment.intendedPacing.mismatches[0]}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-center mb-4">
                                            <div className="relative w-24 h-24 mx-auto">
                                                <svg className="transform -rotate-90 w-24 h-24">
                                                    <circle cx="48" cy="48" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                                                    <circle
                                                        cx="48" cy="48" r="36"
                                                        stroke="#EC4899"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray={`${2 * Math.PI * 36}`}
                                                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - insights.creatorInsights.artisticAlignment.emotionalJourney.alignment / 100)}`}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xl font-bold">{insights.creatorInsights.artisticAlignment.emotionalJourney.alignment}%</span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium mt-2">Emotional Arc</p>
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-gray-600">Viewers felt: <span className="italic">wanting more</span></p>
                                            <p className="text-gray-600">vs intended: <span className="italic">satisfaction</span></p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-center mb-4">
                                            <div className="relative w-24 h-24 mx-auto">
                                                <svg className="transform -rotate-90 w-24 h-24">
                                                    <circle cx="48" cy="48" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                                                    <circle
                                                        cx="48" cy="48" r="36"
                                                        stroke="#3B82F6"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray={`${2 * Math.PI * 36}`}
                                                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - insights.creatorInsights.artisticAlignment.thematicResonance.primaryTheme.understood / 100)}`}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xl font-bold">{insights.creatorInsights.artisticAlignment.thematicResonance.primaryTheme.understood}%</span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium mt-2">Theme Recognition</p>
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-gray-600">Symbolism recognized: {insights.creatorInsights.artisticAlignment.thematicResonance.symbolismRecognition}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Narrative Effectiveness */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Narrative Impact Analysis
                                </h4>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium text-sm mb-3">Plot Comprehension</h5>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Overall Understanding</span>
                                                <span className="font-medium">{insights.creatorInsights.narrativeEffectiveness.plotComprehension.overall}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${insights.creatorInsights.narrativeEffectiveness.plotComprehension.overall}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-xs">
                                            <p className="text-green-600">✓ {insights.creatorInsights.narrativeEffectiveness.plotComprehension.clearPoints[0]}</p>
                                            <p className="text-red-600">? {insights.creatorInsights.narrativeEffectiveness.plotComprehension.confusionPoints[0]}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-sm mb-3">Character Connection</h5>
                                        <div className="space-y-2">
                                            {Object.entries(insights.creatorInsights.narrativeEffectiveness.characterConnection).map(([character, data]) => (
                                                <div key={character} className="flex justify-between text-sm">
                                                    <span className="capitalize">{character}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-green-600 h-2 rounded-full"
                                                                style={{ width: `${data.connection}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs w-8">{data.connection}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Execution Impact */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Camera className="h-5 w-5 text-indigo-600" />
                                    Technical Excellence Recognition
                                </h4>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                                        <Image className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.creatorInsights.technicalExecution.cinematographyImpact.mentionedInReviews}</p>
                                        <p className="text-xs text-gray-600">Cinematography mentions</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <Music className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.creatorInsights.technicalExecution.audioImpact.musicShazams}</p>
                                        <p className="text-xs text-gray-600">Music Shazams</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Camera className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">{insights.creatorInsights.technicalExecution.cinematographyImpact.screenshotMoments}</p>
                                        <p className="text-xs text-gray-600">Screenshot moments</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium mb-1">Most Discussed Technical Elements:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {insights.creatorInsights.technicalExecution.cinematographyImpact.discussionTopics.map((topic, idx) => (
                                            <span key={idx} className="text-xs bg-white px-2 py-1 rounded">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modals */}
            {showDetailModal && selectedInsight && <InsightDetailModal />}
            {showSceneModal && selectedScene && <SceneDetailModal />}
        </div>
    );
};

export default AdvancedAIInsights;