// src/utils/trackEvent.js
export function trackEvent(eventName, data = {}) {
  if (window.clarity) {
    window.clarity('track', eventName, data);
  } else {
    console.log(`[trackEvent] ${eventName}`, data);
  }
}
