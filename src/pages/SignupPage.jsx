// mindi-website/src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase-config';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    productionCompany: '',
    bio: '',
    website: '',
    subdomain: ''
  });

  const [subdomainStatus, setSubdomainStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'subdomain') {
      const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setFormData({ ...formData, subdomain: cleaned });

      if (cleaned.length >= 3) {
        checkSubdomainAvailability(cleaned);
      } else {
        setSubdomainStatus(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const checkSubdomainAvailability = async (subdomain) => {
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

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.subdomain) newErrors.subdomain = 'Please choose a URL for your film page';
    if (formData.subdomain.length < 3) newErrors.subdomain = 'URL must be at least 3 characters';
    if (subdomainStatus === 'taken') newErrors.subdomain = 'This URL is already taken';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        productionCompany: formData.productionCompany,
        bio: formData.bio,
        website: formData.website,
        subdomain: formData.subdomain,
        filmmakerProfile: {
          isPublished: false,
          heroImage: '',
          aboutText: formData.bio || '',
          films: [],
          socialLinks: {}
        },
        createdAt: new Date(),
        isPremium: false
      });

      // Success! Redirect to dashboard
      alert(`Account created! Your filmmaker page will be at ${formData.subdomain}.mindi.tv`);

      // Always redirect to dashboard.mindi.tv after signup
      window.location.href = 'https://dashboard.mindi.tv';

    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Become a Filmmaker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Mindi and start distributing your films
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Subdomain Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choose Your Film Page URL *
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="subdomain"
                  placeholder="your-name"
                  value={formData.subdomain}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  .mindi.tv
                </span>
              </div>

              {subdomainStatus === 'checking' && (
                <p className="text-yellow-600 text-sm mt-1">Checking availability...</p>
              )}
              {subdomainStatus === 'available' && (
                <p className="text-green-600 text-sm mt-1">✓ Available!</p>
              )}
              {subdomainStatus === 'taken' && (
                <p className="text-red-500 text-sm mt-1">✗ Already taken</p>
              )}
              {errors.subdomain && <p className="text-red-500 text-sm mt-1">{errors.subdomain}</p>}
            </div>

            {/* Professional Info */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Production Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="productionCompany"
                    value={formData.productionCompany}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself and your work..."
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || subdomainStatus === 'taken'}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Filmmaker Account'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;