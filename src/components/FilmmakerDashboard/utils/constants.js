// src/components/FilmmakerDashboard/utils/constants.js

export const PRICING_TYPES = {
    RENTAL: 'rental',
    PURCHASE: 'purchase',
    SUBSCRIPTION: 'subscription',
    PAY_PER_VIEW: 'payPerView'
};

export const ANNOTATION_TYPES = {
    DIRECTOR: 'director',
    TECHNICAL: 'technical',
    TRIVIA: 'trivia',
    LOCATION: 'location'
};

export const HOTSPOT_TYPES = {
    INFO: 'info',
    PRODUCT: 'product',
    LOCATION: 'location',
    LINK: 'link'
};

export const CAMPAIGN_TYPES = {
    LIMITED_TIME: 'Limited Time Offer',
    EARLY_ACCESS: 'Early Access',
    BUNDLE_DEAL: 'Bundle Deal',
    PREMIERE_EVENT: 'Premiere Event',
    HOLIDAY_SPECIAL: 'Holiday Special'
};

export const FILM_GENRES = [
    'Drama',
    'Comedy',
    'Action',
    'Thriller',
    'Documentary',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Fantasy',
    'Mystery',
    'Animation',
    'Adventure'
];

export const VISIBILITY_OPTIONS = {
    PUBLIC: 'public',
    UNLISTED: 'unlisted',
    PRIVATE: 'private'
};

export const AGE_RESTRICTIONS = {
    NONE: 'none',
    TEEN: '13+',
    MATURE: '16+',
    ADULT: '18+'
};

export const CONTENT_WARNINGS = [
    'Violence',
    'Language',
    'Sexual Content',
    'Drug Use',
    'Flashing Lights',
    'Disturbing Images',
    'Smoking',
    'Alcohol Use'
];

export const EXPORT_TYPES = {
    FESTIVAL: 'festival',
    TECHNICAL: 'technical',
    MARKETING: 'marketing'
};

export const FESTIVAL_TYPES = [
    'Cannes Film Festival',
    'Sundance Film Festival',
    'Toronto International Film Festival',
    'Berlin International Film Festival',
    'Venice Film Festival',
    'Tribeca Film Festival',
    'SXSW Film Festival',
    'Custom Requirements'
];

export const VIDEO_EMBED_SIZES = [
    { label: '640x360 (16:9)', width: 640, height: 360 },
    { label: '854x480 (16:9)', width: 854, height: 480 },
    { label: '1280x720 (16:9)', width: 1280, height: 720 },
    { label: '1920x1080 (16:9)', width: 1920, height: 1080 },
    { label: 'Custom', width: null, height: null }
];

export const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
];

export const SOCIAL_PLATFORMS = {
    TWITTER: 'twitter',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    LINKEDIN: 'linkedin'
};

export const FILE_TYPES = {
    VIDEO: {
        accept: 'video/*',
        extensions: ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    AUDIO: {
        accept: 'audio/*',
        extensions: ['.mp3', '.wav', '.ogg', '.m4a']
    },
    IMAGE: {
        accept: 'image/*',
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    }
};

export const MAX_FILE_SIZES = {
    VIDEO: 5 * 1024 * 1024 * 1024, // 5GB
    AUDIO: 500 * 1024 * 1024, // 500MB
    IMAGE: 20 * 1024 * 1024 // 20MB
};

export const DEFAULT_SEO_DATA = {
    titleLength: 60,
    descriptionLength: 160,
    minKeywords: 3,
    maxKeywords: 10
};

export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
};

export const CHAPTER_DEFAULTS = {
    MIN_DURATION: 30, // seconds
    MAX_DURATION: 3600, // 1 hour
    DEFAULT_DURATION: 300 // 5 minutes
  };