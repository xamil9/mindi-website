// src/components/FilmmakerDashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { X, BarChart3, Film, MessageSquare, DollarSign, TrendingUp, Download, Zap, Settings } from 'lucide-react';

// Components
import ContentManager from './components/ContentManager';
import MonetizationManager from './components/MonetizationManager';
import AnnotationsManager from './components/AnnotationsManager';
import MarketingHub from './components/MarketingHub';
import ExportManager from './components/ExportManager';
import AIInsights from './components/AIInsights';
import SettingsPanel from './components/SettingsPanel';
import Overview from './components/Overview';

// Modals
import {
    AnnotationModal,
    ReplyModal,
    CommentaryModal,
    HotspotModal,
    RecordingModal,
    AudioPreviewModal,
    HotspotEditModal,
    RegionEditModal,
    CampaignEditModal,
    ReferralStatsModal,
    ThreadViewModal,
    SupportersModal,
    ReferrersModal,
    ReferralLinkModal,
    DetailModal,
    TrailerEditModal,
    PressKitModal,
    CampaignCreatorModal
} from './components/Modals';

// Hooks
import { useFilmData } from './hooks/useFilmData';
import { useAnalytics } from './hooks/useAnalytics';
import { useModals } from './hooks/useModals';

// Utils
import Loader from './components/common/Loader';

const FilmmakerDashboard = ({ filmId, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Use custom hooks
    const {
        selectedFilm,
        annotations,
        setAnnotations,
        pricingTiers,
        setPricingTiers,
        trailers,
        setTrailers,
        btsPictures,
        setBtsPictures,
        commentaryTracks,
        setCommentaryTracks,
        hotspots,
        setHotspots,
        exportQueue,
        setExportQueue,
        directorNotes,
        setDirectorNotes,
        filmPoster,
        setFilmPoster,
        aboutInfo,
        setAboutInfo,
        campaigns,
        setCampaigns,
        loading,
        loadFilmData
    } = useFilmData(filmId);

    const { analytics, insights, loadAnalytics, loadInsights } = useAnalytics(filmId);
    const modals = useModals();

    // Film settings state
    const [filmSettings, setFilmSettings] = useState({
        visibility: 'public',
        comments: true,
        downloads: false,
        embedAllowed: true,
        ageRestriction: 'none',
        contentWarnings: []
    });

    // Creator Support Data
    const [creatorSupportData, setCreatorSupportData] = useState({
        totalClicks: 3847,
        totalSupport: 12453,
        avgSupport: 15.50,
        conversionRate: 23.4,
        supporters: 803,
        topSupporters: [
            { name: 'FilmEnthusiast92', amount: 250, date: '2 days ago' },
            { name: 'CinemaLover', amount: 100, date: '1 week ago' },
            { name: 'IndieSupporter', amount: 75, date: '1 week ago' },
            { name: 'MovieBuff_Alex', amount: 50, date: '2 weeks ago' }
        ],
        recentActivity: [
            { action: 'support', user: 'NewFan123', amount: 25, timestamp: '5 min ago' },
            { action: 'click', user: 'Anonymous', timestamp: '12 min ago' },
            { action: 'support', user: 'ReturnViewer', amount: 10, timestamp: '1 hour ago' },
            { action: 'click', user: 'FirstTimer', timestamp: '2 hours ago' }
        ],
        supportTrends: {
            daily: [45, 52, 38, 67, 73, 81, 94],
            weekly: [312, 287, 345, 423],
            monthly: [1234, 1456, 1678, 1890]
        }
    });

    useEffect(() => {
        loadFilmData();
        loadAnalytics();
        loadInsights();
    }, [filmId]);

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id
                ? 'bg-blue-600 text-white'  // Changed back to white for active tab
                : 'text-gray-700 hover:bg-gray-100'  // Changed to dark gray for inactive
                }`}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </button>
    );

    if (loading) {
        return <Loader onClose={onClose} />;
    }

    const sharedProps = {
        filmId,
        selectedFilm,
        annotations,
        setAnnotations,
        pricingTiers,
        setPricingTiers,
        trailers,
        setTrailers,
        btsPictures,
        setBtsPictures,
        commentaryTracks,
        setCommentaryTracks,
        hotspots,
        setHotspots,
        exportQueue,
        setExportQueue,
        directorNotes,
        setDirectorNotes,
        filmPoster,
        setFilmPoster,
        aboutInfo,
        setAboutInfo,
        campaigns,
        setCampaigns,
        analytics,
        insights,
        modals,
        creatorSupportData,
        setCreatorSupportData
    };

    return (
        <>
            {/* Backdrop - click to close */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

            {/* Dashboard Container - Added text-gray-900 for global dark text */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-50 w-full max-w-7xl h-[90vh] rounded-lg overflow-hidden flex flex-col text-gray-900" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{selectedFilm?.title} - Enhanced Dashboard</h1>
                                <p className="text-gray-600 mt-1">Manage all aspects of your film</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
                        <div className="flex gap-2 overflow-x-auto">
                            <TabButton id="overview" label="Overview" icon={BarChart3} />
                            <TabButton id="content" label="Content" icon={Film} />
                            <TabButton id="annotations" label="Annotations" icon={MessageSquare} />
                            <TabButton id="monetization" label="Monetization" icon={DollarSign} />
                            <TabButton id="marketing" label="Marketing Hub" icon={TrendingUp} />
                            <TabButton id="export" label="Export Tools" icon={Download} />
                            <TabButton id="insights" label="AI Insights" icon={Zap} />
                            <TabButton id="settings" label="Settings" icon={Settings} />
                        </div>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        <div className="p-6 min-h-full">
                            {activeTab === 'overview' && <Overview {...sharedProps} setActiveTab={setActiveTab} />}
                            {activeTab === 'content' && <ContentManager {...sharedProps} />}
                            {activeTab === 'annotations' && <AnnotationsManager {...sharedProps} />}
                            {activeTab === 'monetization' && <MonetizationManager {...sharedProps} />}
                            {activeTab === 'marketing' && <MarketingHub {...sharedProps} />}
                            {activeTab === 'export' && <ExportManager {...sharedProps} />}
                            {activeTab === 'insights' && <AIInsights {...sharedProps} />}
                            {activeTab === 'settings' && <SettingsPanel filmSettings={filmSettings} setFilmSettings={setFilmSettings} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {modals.showAnnotationModal && <AnnotationModal {...sharedProps} />}
            {modals.showReplyModal && <ReplyModal {...sharedProps} />}
            {modals.showCommentaryModal && <CommentaryModal {...sharedProps} />}
            {modals.showHotspotModal && <HotspotModal {...sharedProps} />}
            {modals.showRecordingModal && <RecordingModal {...sharedProps} />}
            {modals.showAudioPreviewModal && <AudioPreviewModal {...sharedProps} />}
            {modals.showHotspotEditModal && <HotspotEditModal {...sharedProps} />}
            {modals.showRegionEditModal && <RegionEditModal {...sharedProps} />}
            {modals.showCampaignEditModal && <CampaignEditModal {...sharedProps} />}
            {modals.showReferralStatsModal && <ReferralStatsModal {...sharedProps} />}
            {modals.showThreadViewModal && <ThreadViewModal {...sharedProps} />}
            {modals.showSupportersModal && <SupportersModal {...sharedProps} />}
            {modals.showReferrersModal && <ReferrersModal {...sharedProps} />}
            {modals.showReferralLinkModal && <ReferralLinkModal {...sharedProps} />}
            {modals.showDetailModal && <DetailModal {...sharedProps} />}
            {modals.showTrailerEditModal && <TrailerEditModal {...sharedProps} />}
            {modals.showPressKitModal && <PressKitModal {...sharedProps} />}
            {modals.showCampaignCreatorModal && <CampaignCreatorModal {...sharedProps} />}
        </>
    );
};

export default FilmmakerDashboard;