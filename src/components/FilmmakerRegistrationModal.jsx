// FilmmakerRegistrationModal.jsx - Enhanced Version
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase-config';

const FilmmakerRegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    bio: '',
    website: '',
    subdomain: '', // NEW: Add subdomain field
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [subdomainStatus, setSubdomainStatus] = useState(null); // NEW: Track subdomain availability

  const db = getFirestore();

  // NEW: Check subdomain availability
  const checkSubdomainAvailability = async (subdomain) => {
    if (!subdomain || subdomain.length < 3) {
      setSubdomainStatus(null);
      return;
    }

    try {
      setSubdomainStatus('checking');
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('subdomain', '==', subdomain));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSubdomainStatus('available');
      } else {
        setSubdomainStatus('taken');
      }
    } catch (error) {
      console.error('Error checking subdomain:', error);
      setSubdomainStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // NEW: Validate subdomain
    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Please choose a URL for your film page';
    } else if (formData.subdomain.length < 3) {
      newErrors.subdomain = 'URL must be at least 3 characters';
    } else if (subdomainStatus === 'taken') {
      newErrors.subdomain = 'This URL is already taken';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'subdomain') {
      // Clean subdomain input: lowercase, only letters, numbers, and hyphens
      const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));

      // Check availability if length is sufficient
      if (cleaned.length >= 3) {
        checkSubdomainAvailability(cleaned);
      } else {
        setSubdomainStatus(null);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setRegistrationStatus(null);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      // Store filmmaker data in Firestore - ENHANCED
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: formData.email,
        displayName: formData.fullName,
        fullName: formData.fullName, // For compatibility
        isFilmmaker: true,
        companyName: formData.companyName,
        productionCompany: formData.companyName, // Alternative field name
        bio: formData.bio,
        website: formData.website,
        subdomain: formData.subdomain, // NEW: Store subdomain
        createdAt: new Date().toISOString(),

        // NEW: Filmmaker profile structure
        filmmakerProfile: {
          isPublished: false, // Start unpublished
          heroImage: '',
          aboutText: formData.bio || '',
          films: [],
          socialLinks: {
            website: formData.website || '',
            twitter: '',
            instagram: '',
            linkedin: ''
          }
        },

        verified: false,
        subscription: {
          plan: 'free',
          status: 'active'
        }
      });

      setRegistrationStatus('success');

      // Close modal and redirect after success
      setTimeout(() => {
        onClose();
        // Redirect to your tubi-platform-3 dashboard or show success message
        alert(`Account created! Your filmmaker page will be at ${formData.subdomain}.mindi.tv`);
        // Optionally redirect to dashboard
        // window.location.href = 'http://localhost:3000'; // Your tubi-platform-3 URL
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationStatus('error');

      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak' });
      } else {
        setErrors({ general: error.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Become a Filmmaker
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Join Mindi and start distributing your films
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Success Message */}
              {registrationStatus === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800">Registration successful! Setting up your filmmaker page...</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {errors.general && (
                <motion.div
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-800">{errors.general}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="filmmaker@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* NEW: Subdomain Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Your Film Page URL *
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="text"
                      name="subdomain"
                      value={formData.subdomain}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.subdomain || subdomainStatus === 'taken' ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="your-name"
                      maxLength="30"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      .mindi.tv
                    </span>
                  </div>

                  {/* Subdomain Status */}
                  {subdomainStatus === 'checking' && (
                    <p className="mt-1 text-sm text-yellow-600">Checking availability...</p>
                  )}
                  {subdomainStatus === 'available' && (
                    <p className="mt-1 text-sm text-green-600">✓ Available!</p>
                  )}
                  {subdomainStatus === 'taken' && (
                    <p className="mt-1 text-sm text-red-600">✗ This URL is already taken</p>
                  )}
                  {errors.subdomain && (
                    <p className="mt-1 text-sm text-red-600">{errors.subdomain}</p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    This will be your unique filmmaker page URL
                  </p>
                </div>

                {/* Password Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Professional Information */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Professional Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Production Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Production Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio (Optional)
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about yourself and your work..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || subdomainStatus === 'taken'}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 ${isSubmitting || subdomainStatus === 'taken'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  whileHover={!isSubmitting && subdomainStatus !== 'taken' ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && subdomainStatus !== 'taken' ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Filmmaker Account'}
                </motion.button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilmmakerRegistrationModal;