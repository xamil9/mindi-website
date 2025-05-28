// src/components/FilmmakerDashboard/hooks/useModals.js
import { useState } from 'react';

export const useModals = () => {
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showCommentaryModal, setShowCommentaryModal] = useState(false);
  const [showHotspotModal, setShowHotspotModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCampaignCreatorModal, setShowCampaignCreatorModal] = useState(false);
  const [showSupportersModal, setShowSupportersModal] = useState(false);
  const [showReferrersModal, setShowReferrersModal] = useState(false);
  const [showReferralLinkModal, setShowReferralLinkModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTrailerEditModal, setShowTrailerEditModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showPressKitModal, setShowPressKitModal] = useState(false);
  const [pressKitSection, setPressKitSection] = useState('');
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showAudioPreviewModal, setShowAudioPreviewModal] = useState(false);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState(null);
  const [showHotspotEditModal, setShowHotspotEditModal] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showRegionEditModal, setShowRegionEditModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showCampaignEditModal, setShowCampaignEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showReferralStatsModal, setShowReferralStatsModal] = useState(false);
  const [selectedReferralLink, setSelectedReferralLink] = useState(null);
  const [showThreadViewModal, setShowThreadViewModal] = useState(false);

  return {
    // Modal visibility states
    showAnnotationModal,
    setShowAnnotationModal,
    showReplyModal,
    setShowReplyModal,
    showCommentaryModal,
    setShowCommentaryModal,
    showHotspotModal,
    setShowHotspotModal,
    showRegionModal,
    setShowRegionModal,
    showCampaignCreatorModal,
    setShowCampaignCreatorModal,
    showSupportersModal,
    setShowSupportersModal,
    showReferrersModal,
    setShowReferrersModal,
    showReferralLinkModal,
    setShowReferralLinkModal,
    showDetailModal,
    setShowDetailModal,
    showTrailerEditModal,
    setShowTrailerEditModal,
    showPressKitModal,
    setShowPressKitModal,
    showRecordingModal,
    setShowRecordingModal,
    showAudioPreviewModal,
    setShowAudioPreviewModal,
    showHotspotEditModal,
    setShowHotspotEditModal,
    showRegionEditModal,
    setShowRegionEditModal,
    showCampaignEditModal,
    setShowCampaignEditModal,
    showReferralStatsModal,
    setShowReferralStatsModal,
    showThreadViewModal,
    setShowThreadViewModal,

    // Selected items
    selectedAnnotation,
    setSelectedAnnotation,
    selectedTrailer,
    setSelectedTrailer,
    selectedAudioTrack,
    setSelectedAudioTrack,
    selectedHotspot,
    setSelectedHotspot,
    selectedRegion,
    setSelectedRegion,
    selectedCampaign,
    setSelectedCampaign,
    selectedReferralLink,
    setSelectedReferralLink,
    pressKitSection,
    setPressKitSection
  };
};