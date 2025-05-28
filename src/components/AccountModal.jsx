import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AccountModal = ({ isOpen, onClose, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { signup } = useAuth();

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    // Reset errors
    setServerError('');
    let newErrors = { email: '', password: '' };
    let isValid = true;

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);

    // Only proceed if validation passes
    if (isValid) {
      setLoading(true);
      try {
        await signup(email, password);
        if (typeof onCreateAccount === 'function') {
          onCreateAccount(email);
        }
        onClose();
      } catch (error) {
        console.error("Error creating account:", error);
        // Handle different Firebase errors
        if (error.code === 'auth/email-already-in-use') {
          setServerError('This email is already in use');
        } else {
          setServerError('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4 text-gray-900">Create Account</h2>

        {serverError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {serverError}
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-1 text-sm text-black"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-1 text-sm text-black"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-[#0e1e38] text-white py-2 rounded font-semibold hover:bg-[#13294b] transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default AccountModal;