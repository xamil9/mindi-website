import React, { useState, useRef, useCallback } from 'react';
import AudioPreviewModal from './AudioPreviewModal';
import HotspotEditModal from './HotspotEditModal';
import RegionEditModal from './RegionEditModal';
import CampaignEditModal from './CampaignEditModal';
import ReferralStatsModal from './ReferralStatsModal';
import ThreadViewModal from './ThreadViewModal';
import ReferrersModal from './ReferrersModal';
import ReferralLinkModal from './ReferralLinkModal';
import TrailerEditModal from './TrailerEditModal';
import PressKitModal from './PressKitModal';
import CampaignCreatorModal from './CampaignCreatorModal';

const ModalManager = ({
    // Film data
    selectedFilm,
    filmId,

    // Collections
    trailers,
    setTrailers,
    hotspots,
    setHotspots,
    campaigns,
    setCampaigns,

    // Utilities
    handleCopyToClipboard,
    handleDownloadPressKit,

    // Additional props that might be needed
    children
}) => {
    // Modal visibility states
    const [modalStates, setModalStates] = useState({
        audioPreview: false,
        hotspotEdit: false,
        regionEdit: false,
        campaignEdit: false,
        referralStats: false,
        threadView: false,
        referrers: false,
        referralLink: false,
        trailerEdit: false,
        pressKit: false,
        campaignCreator: false
    });

    // Selected items for modals
    const [selectedItems, setSelectedItems] = useState({
        audioTrack: null,
        hotspot: null,
        region: null,
        campaign: null,
        referralLink: null,
        trailer: null,
        pressKitSection: ''
    });

    // Audio preview states
    const [audioStates, setAudioStates] = useState({
        isPlaying: false,
        playbackTime: 0
    });

    // Refs for intervals
    const playbackInterval = useRef(null);

    // Generic modal toggle function
    const toggleModal = useCallback((modalName, isOpen) => {
        setModalStates(prev => ({
            ...prev,
            [modalName]: isOpen
        }));
    }, []);

    // Generic item selector
    const selectItem = useCallback((itemType, item) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemType]: item
        }));
    }, []);

    // Modal-specific handlers
    const modalHandlers = {
        // Audio Preview Modal handlers
        audioPreview: {
            open: (audioTrack) => {
                selectItem('audioTrack', audioTrack);
                toggleModal('audioPreview', true);
            },
            close: () => {
                toggleModal('audioPreview', false);
                selectItem('audioTrack', null);
                stopAudioPreview();
            },
            startPreview: () => {
                setAudioStates(prev => ({ ...prev, isPlaying: true, playbackTime: 0 }));
                playbackInterval.current = setInterval(() => {
                    setAudioStates(prev => {
                        if (prev.playbackTime >= 10) {
                            modalHandlers.audioPreview.stopPreview();
                            return prev;
                        }
                        return { ...prev, playbackTime: prev.playbackTime + 0.1 };
                    });
                }, 100);
            },
            stopPreview: () => {
                setAudioStates(prev => ({ ...prev, isPlaying: false }));
                if (playbackInterval.current) {
                    clearInterval(playbackInterval.current);
                }
            }
        },

        // Hotspot Edit Modal handlers
        hotspotEdit: {
            open: (hotspot) => {
                selectItem('hotspot', hotspot);
                toggleModal('hotspotEdit', true);
            },
            close: () => {
                toggleModal('hotspotEdit', false);
                selectItem('hotspot', null);
            }
        },

        // Region Edit Modal handlers
        regionEdit: {
            open: (region) => {
                selectItem('region', region);
                toggleModal('regionEdit', true);
            },
            close: () => {
                toggleModal('regionEdit', false);
                selectItem('region', null);
            }
        },

        // Campaign Edit Modal handlers
        campaignEdit: {
            open: (campaign) => {
                selectItem('campaign', campaign);
                toggleModal('campaignEdit', true);
            },
            close: () => {
                toggleModal('campaignEdit', false);
                selectItem('campaign', null);
            }
        },

        // Referral Stats Modal handlers
        referralStats: {
            open: (referralLink) => {
                selectItem('referralLink', referralLink);
                toggleModal('referralStats', true);
            },
            close: () => {
                toggleModal('referralStats', false);
                selectItem('referralLink', null);
            }
        },

        // Thread View Modal handlers
        threadView: {
            open: () => {
                toggleModal('threadView', true);
            },
            close: () => {
                toggleModal('threadView', false);
            }
        },

        // Referrers Modal handlers
        referrers: {
            open: () => {
                toggleModal('referrers', true);
            },
            close: () => {
                toggleModal('referrers', false);
            }
        },

        // Referral Link Modal handlers
        referralLink: {
            open: () => {
                toggleModal('referralLink', true);
            },
            close: () => {
                toggleModal('referralLink', false);
            }
        },

        // Trailer Edit Modal handlers
        trailerEdit: {
            open: (trailer) => {
                selectItem('trailer', trailer);
                toggleModal('trailerEdit', true);
            },
            close: () => {
                toggleModal('trailerEdit', false);
                selectItem('trailer', null);
            }
        },

        // Press Kit Modal handlers
        pressKit: {
            open: (section) => {
                selectItem('pressKitSection', section);
                toggleModal('pressKit', true);
            },
            close: () => {
                toggleModal('pressKit', false);
                selectItem('pressKitSection', '');
            }
        },

        // Campaign Creator Modal handlers
        campaignCreator: {
            open: () => {
                toggleModal('campaignCreator', true);
            },
            close: () => {
                toggleModal('campaignCreator', false);
            }
        }
    };

    // Helper to stop audio preview
    const stopAudioPreview = useCallback(() => {
        modalHandlers.audioPreview.stopPreview();
    }, []);

    // Create a context value with all modal controls
    const modalContextValue = {
        modalStates,
        selectedItems,
        audioStates,
        modalHandlers,
        // Expose individual open methods for convenience
        openAudioPreview: modalHandlers.audioPreview.open,
        openHotspotEdit: modalHandlers.hotspotEdit.open,
        openRegionEdit: modalHandlers.regionEdit.open,
        openCampaignEdit: modalHandlers.campaignEdit.open,
        openReferralStats: modalHandlers.referralStats.open,
        openThreadView: modalHandlers.threadView.open,
        openReferrers: modalHandlers.referrers.open,
        openReferralLink: modalHandlers.referralLink.open,
        openTrailerEdit: modalHandlers.trailerEdit.open,
        openPressKit: modalHandlers.pressKit.open,
        openCampaignCreator: modalHandlers.campaignCreator.open,
    };

    return (
        <>
            {/* Render children with modal context */}
            {typeof children === 'function' ? children(modalContextValue) : children}

            {/* Audio Preview Modal */}
            <AudioPreviewModal
                selectedAudioTrack={selectedItems.audioTrack}
                showAudioPreviewModal={modalStates.audioPreview}
                setShowAudioPreviewModal={(show) => toggleModal('audioPreview', show)}
                setSelectedAudioTrack={(track) => selectItem('audioTrack', track)}
                isPlaying={audioStates.isPlaying}
                playbackTime={audioStates.playbackTime}
                startAudioPreview={modalHandlers.audioPreview.startPreview}
                stopAudioPreview={modalHandlers.audioPreview.stopPreview}
            />

            {/* Hotspot Edit Modal */}
            <HotspotEditModal
                selectedHotspot={selectedItems.hotspot}
                hotspots={hotspots}
                setHotspots={setHotspots}
                showHotspotEditModal={modalStates.hotspotEdit}
                setShowHotspotEditModal={(show) => toggleModal('hotspotEdit', show)}
                setSelectedHotspot={(hotspot) => selectItem('hotspot', hotspot)}
            />

            {/* Region Edit Modal */}
            <RegionEditModal
                selectedRegion={selectedItems.region}
                showRegionEditModal={modalStates.regionEdit}
                setShowRegionEditModal={(show) => toggleModal('regionEdit', show)}
                setSelectedRegion={(region) => selectItem('region', region)}
            />

            {/* Campaign Edit Modal */}
            <CampaignEditModal
                selectedCampaign={selectedItems.campaign}
                campaigns={campaigns}
                setCampaigns={setCampaigns}
                showCampaignEditModal={modalStates.campaignEdit}
                setShowCampaignEditModal={(show) => toggleModal('campaignEdit', show)}
                setSelectedCampaign={(campaign) => selectItem('campaign', campaign)}
            />

            {/* Referral Stats Modal */}
            <ReferralStatsModal
                selectedReferralLink={selectedItems.referralLink}
                showReferralStatsModal={modalStates.referralStats}
                setShowReferralStatsModal={(show) => toggleModal('referralStats', show)}
                setSelectedReferralLink={(link) => selectItem('referralLink', link)}
            />

            {/* Thread View Modal */}
            <ThreadViewModal
                selectedFilm={selectedFilm}
                filmId={filmId}
                showThreadViewModal={modalStates.threadView}
                setShowThreadViewModal={(show) => toggleModal('threadView', show)}
                handleCopyToClipboard={handleCopyToClipboard}
            />

            {/* Referrers Modal */}
            <ReferrersModal
                showReferrersModal={modalStates.referrers}
                setShowReferrersModal={(show) => toggleModal('referrers', show)}
            />

            {/* Referral Link Modal */}
            <ReferralLinkModal
                showReferralLinkModal={modalStates.referralLink}
                setShowReferralLinkModal={(show) => toggleModal('referralLink', show)}
            />

            {/* Trailer Edit Modal */}
            <TrailerEditModal
                selectedTrailer={selectedItems.trailer}
                trailers={trailers}
                setTrailers={setTrailers}
                showTrailerEditModal={modalStates.trailerEdit}
                setShowTrailerEditModal={(show) => toggleModal('trailerEdit', show)}
                setSelectedTrailer={(trailer) => selectItem('trailer', trailer)}
            />

            {/* Press Kit Modal */}
            <PressKitModal
                pressKitSection={selectedItems.pressKitSection}
                showPressKitModal={modalStates.pressKit}
                setShowPressKitModal={(show) => toggleModal('pressKit', show)}
                handleDownloadPressKit={handleDownloadPressKit}
            />

            {/* Campaign Creator Modal */}
            <CampaignCreatorModal
                showCampaignCreator={modalStates.campaignCreator}
                setShowCampaignCreator={(show) => toggleModal('campaignCreator', show)}
            />
        </>
    );
};

// Optional: Export a hook for using modal context
export const useModals = () => {
    const [modalManager] = useState(null);
    return modalManager;
};

export default ModalManager;