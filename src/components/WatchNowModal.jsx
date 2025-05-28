// src/components/WatchNowModal.jsx
// Updated to work with IMA SDK integration
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from './VideoPlayer';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';
import PaymentForm from './PaymentForm';
import { getAdTagUrl } from '../utils/adConfig'; // Import your existing ad config

const WatchNowModal = ({ isOpen, onClose, onCreateAccount, onSignIn }) => {
  const [step, setStep] = useState('auth');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [playerKey, setPlayerKey] = useState(Date.now());

  const { currentUser, getUserProfile, updatePremiumStatus } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  // Local analytics tracking function
  const trackEvent = (eventName, eventData) => {
    console.log('Event tracked:', eventName, eventData);
    // Replace with your actual analytics implementation
  };

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (currentUser) {
        try {
          const profile = await getUserProfile();
          console.log("User profile loaded:", profile);
          setUserProfile(profile);
          setStep(profile?.isPremium ? 'player' : 'choice');
        } catch (error) {
          console.error("Error loading profile:", error);
          setStep('choice'); // Default to choice if profile loading fails
        }
      } else {
        setStep('auth');
        setUserProfile(null);
      }
    };

    if (isOpen) {
      console.log("Modal opened, loading user data");
      loadProfile();
    }
  }, [currentUser, getUserProfile, isOpen]);

  // Handle payment success
  const handlePaymentSuccess = async (paymentIntent) => {
    console.log("Payment successful:", paymentIntent);
    setPaymentStatus('success');

    // Update user's premium status
    try {
      const updatedProfile = await updatePremiumStatus(true);
      console.log("Premium status updated:", updatedProfile);
      setUserProfile(updatedProfile);

      // Force player to remount with new premium status
      setPlayerKey(Date.now());

      // Track conversion in analytics
      trackEvent('user_upgraded_to_premium', {
        userId: currentUser?.uid,
        paymentId: paymentIntent?.id
      });

      setTimeout(() => {
        setStep('player');
      }, 1500);
    } catch (error) {
      console.error('Error updating premium status:', error);
      // Still show the video even if status update fails
      setUserProfile({ ...userProfile, isPremium: true });
      setPlayerKey(Date.now());

      setTimeout(() => {
        setStep('player');
      }, 1500);
    }
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setPaymentStatus('error');
    trackEvent('payment_error', { error: error?.message });
  };

  // Simple handlers without timeouts
  const handleWatchFree = () => {
    console.log("Watch free clicked");
    setStep('player');
  };

  const handlePayClick = () => {
    console.log("Pay clicked");
    setStep('payment');
  };

  const handleBackToChoice = () => {
    console.log("Back to choice clicked");
    setStep('choice');
  };

  if (!isOpen) return null;

  // Get the ad tag URL based on premium status
  // Use your existing adConfig utility
  const isPremium = userProfile?.isPremium || false;
  const adTagUrl = isPremium ? null : getAdTagUrl(false, 'downers-movie');

  console.log("Modal state:", {
    step,
    isPremium,
    hasAdTagUrl: !!adTagUrl
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#f6f6f6] rounded-xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        {step === 'auth' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-center text-gray-900">Watch Now</h2>
            <p className="text-center text-gray-700">Please sign in or create an account to continue</p>
            <button
              onClick={() => onSignIn?.()}
              className="w-full py-3 rounded-md bg-[#0e1e38] text-white font-semibold hover:bg-[#13294b] transition"
            >
              Sign In
            </button>
            <button
              onClick={() => onCreateAccount?.()}
              className="w-full py-3 rounded-md border border-gray-400 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Create Account
            </button>
          </div>
        )}

        {step === 'choice' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-center text-gray-900">Watch Now</h2>
            <button
              onClick={handlePayClick}
              className="w-full py-3 rounded-md bg-[#0e1e38] text-white font-semibold hover:bg-[#13294b] transition"
            >
              Pay $5 to Watch Without Ads
            </button>
            <button
              onClick={handleWatchFree}
              className="w-full py-3 rounded-md border border-gray-400 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Watch Free with Ads
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-4">
            <button onClick={handleBackToChoice} className="text-sm text-blue-600 hover:underline mb-2">← Back</button>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow">
              <img src="/downers.jpg" alt="Movie" className="w-14 h-14 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Downers</div>
                <div className="text-sm text-gray-500">Drama</div>
              </div>
              <div className="text-sm font-medium text-gray-800">$5.00</div>
            </div>

            {paymentStatus === 'success' && (
              <div className="p-2 bg-green-100 text-green-700 text-sm rounded">
                Payment successful! Redirecting to video...
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="p-2 bg-red-100 text-red-700 text-sm rounded">
                Payment failed. Please try again.
              </div>
            )}

            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={500}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </div>
        )}

        {step === 'player' && (
          <div className="space-y-4">
            {!isPremium && (
              <button onClick={handleBackToChoice} className="text-sm text-blue-600 hover:underline">← Back</button>
            )}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                key={`video-player-${playerKey}`}
                src="/full-movie.mp4"
                poster="/downers.jpg"
                adTagUrl={adTagUrl}
              />
            </div>

            {/* Premium status indicator in modal */}
            <div className="text-center text-sm">
              {isPremium ? (
                <div className="p-2 bg-green-100 text-green-700 rounded">
                  Premium Mode: Ad-Free Viewing
                </div>
              ) : (
                <div className="p-2 bg-amber-100 text-amber-700 rounded">
                  Free Mode: Watching with Ads
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchNowModal;