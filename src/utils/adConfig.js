// src/utils/adConfig.js
/**
 * Generate a VAST ad tag URL for testing
 * @returns {string} - Google IMA SDK test VAST tag URL
 */
export const getTestVastTagUrl = () => {
  return 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';
};

/**
 * Generate ad tag URL based on user's premium status
 * @param {boolean} isPremium - Whether the user has premium status
 * @param {string} videoId - ID of the video being played
 * @returns {string|null} - Ad tag URL or null if user is premium
 */
export const getAdTagUrl = (isPremium, videoId = 'default-video') => {
  if (isPremium) {
    return null; // No ads for premium users
  }
  
  // In production, you would generate a proper ad tag URL here
  // For testing, using Google's test ad tag
  return `https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=${Date.now()}`;
};