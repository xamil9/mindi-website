// src/components/FilmmakerDashboard/utils/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            // Add authentication token if available
            ...(localStorage.getItem('authToken') && {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            })
        }
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

// Film API endpoints
export const filmAPI = {
    // Get film details
    getFilm: (filmId) => apiRequest(`/films/${filmId}`),

    // Update film information
    updateFilm: (filmId, data) => apiRequest(`/films/${filmId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    // Upload film poster
    uploadPoster: async (filmId, file) => {
        const formData = new FormData();
        formData.append('poster', file);

        return apiRequest(`/films/${filmId}/poster`, {
            method: 'POST',
            headers: {
                // Don't set Content-Type, let browser set it with boundary
            },
            body: formData
        });
    },

    // Delete film
    deleteFilm: (filmId) => apiRequest(`/films/${filmId}`, {
        method: 'DELETE'
    })
};

// Annotations API
export const annotationsAPI = {
    // Get all annotations for a film
    getAnnotations: (filmId) => apiRequest(`/films/${filmId}/annotations`),

    // Create new annotation
    createAnnotation: (filmId, annotation) => apiRequest(`/films/${filmId}/annotations`, {
        method: 'POST',
        body: JSON.stringify(annotation)
    }),

    // Update annotation
    updateAnnotation: (filmId, annotationId, data) => apiRequest(
        `/films/${filmId}/annotations/${annotationId}`,
        {
            method: 'PUT',
            body: JSON.stringify(data)
        }
    ),

    // Delete annotation
    deleteAnnotation: (filmId, annotationId) => apiRequest(
        `/films/${filmId}/annotations/${annotationId}`,
        { method: 'DELETE' }
    ),

    // Add reply to annotation
    addReply: (filmId, annotationId, reply) => apiRequest(
        `/films/${filmId}/annotations/${annotationId}/replies`,
        {
            method: 'POST',
            body: JSON.stringify(reply)
        }
    )
};

// Pricing API
export const pricingAPI = {
    // Get pricing tiers
    getPricingTiers: (filmId) => apiRequest(`/films/${filmId}/pricing`),

    // Create pricing tier
    createPricingTier: (filmId, tier) => apiRequest(`/films/${filmId}/pricing`, {
        method: 'POST',
        body: JSON.stringify(tier)
    }),

    // Update pricing tier
    updatePricingTier: (filmId, tierId, data) => apiRequest(
        `/films/${filmId}/pricing/${tierId}`,
        {
            method: 'PUT',
            body: JSON.stringify(data)
        }
    ),

    // Delete pricing tier
    deletePricingTier: (filmId, tierId) => apiRequest(
        `/films/${filmId}/pricing/${tierId}`,
        { method: 'DELETE' }
    )
};

// Analytics API
export const analyticsAPI = {
    // Get film analytics
    getAnalytics: (filmId, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/films/${filmId}/analytics${queryString ? `?${queryString}` : ''}`);
    },

    // Get insights
    getInsights: (filmId) => apiRequest(`/films/${filmId}/insights`),

    // Get creator support data
    getCreatorSupport: (filmId) => apiRequest(`/films/${filmId}/creator-support`),

    // Get referral data
    getReferralData: (filmId) => apiRequest(`/films/${filmId}/referrals`)
};

// Export API
export const exportAPI = {
    // Create export package
    createExport: (filmId, exportType, options) => apiRequest(`/films/${filmId}/exports`, {
        method: 'POST',
        body: JSON.stringify({ type: exportType, options })
    }),

    // Get export status
    getExportStatus: (filmId, exportId) => apiRequest(
        `/films/${filmId}/exports/${exportId}`
    ),

    // Download export
    downloadExport: (filmId, exportId) => {
        // This would typically return a download URL or initiate download
        return `${API_BASE_URL}/films/${filmId}/exports/${exportId}/download`;
    }
};

// Campaign API
export const campaignAPI = {
    // Get campaigns
    getCampaigns: (filmId) => apiRequest(`/films/${filmId}/campaigns`),

    // Create campaign
    createCampaign: (filmId, campaign) => apiRequest(`/films/${filmId}/campaigns`, {
        method: 'POST',
        body: JSON.stringify(campaign)
    }),

    // Update campaign
    updateCampaign: (filmId, campaignId, data) => apiRequest(
        `/films/${filmId}/campaigns/${campaignId}`,
        {
            method: 'PUT',
            body: JSON.stringify(data)
        }
    ),

    // Delete campaign
    deleteCampaign: (filmId, campaignId) => apiRequest(
        `/films/${filmId}/campaigns/${campaignId}`,
        { method: 'DELETE' }
    )
};

// Settings API
export const settingsAPI = {
    // Get film settings
    getSettings: (filmId) => apiRequest(`/films/${filmId}/settings`),

    // Update film settings
    updateSettings: (filmId, settings) => apiRequest(`/films/${filmId}/settings`, {
        method: 'PUT',
        body: JSON.stringify(settings)
    })
};

// Upload utilities
export const uploadUtils = {
    // Upload with progress tracking
    uploadWithProgress: async (url, file, onProgress) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('file', file);

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress(percentComplete);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });

            xhr.open('POST', url);

            // Add auth token if available
            const token = localStorage.getItem('authToken');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            xhr.send(formData);
        });
    }
};

// Error handling wrapper
export const apiErrorHandler = (error) => {
    console.error('API Error:', error);

    // You can add custom error handling here
    // For example, redirect to login on 401, show notification on 500, etc.

    throw error;
};

export default {
    filmAPI,
    annotationsAPI,
    pricingAPI,
    analyticsAPI,
    exportAPI,
    campaignAPI,
    settingsAPI,
    uploadUtils,
    apiErrorHandler
};