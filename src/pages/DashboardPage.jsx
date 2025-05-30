// src/pages/DashboardPage.jsx - Full version with FilmmakerDashboard
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import FilmmakerDashboard from '../components/FilmmakerDashboard';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('🔍 DashboardPage: Starting user data load');

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('🔍 DashboardPage: Auth state changed', currentUser?.email || 'No user');

            if (currentUser) {
                setUser(currentUser);

                try {
                    console.log('🔍 DashboardPage: Loading user data from Firestore');
                    // Load user-specific data from Firestore
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        console.log('🔍 DashboardPage: User data loaded', data);
                        setUserData(data);
                    } else {
                        console.log('🔍 DashboardPage: No user document found');
                        setError('User data not found. Please contact support.');
                    }
                } catch (err) {
                    console.error('🔍 DashboardPage: Error loading user data:', err);
                    setError('Failed to load user data.');
                }
            } else {
                console.log('🔍 DashboardPage: No authenticated user');
                // Check if we have stored auth data (from cross-domain login)
                const storedToken = localStorage.getItem('firebaseAuthToken');
                const storedUser = localStorage.getItem('firebaseUser');

                if (storedToken && storedUser) {
                    try {
                        const userData = JSON.parse(storedUser);
                        console.log('🔍 DashboardPage: Using stored user data', userData);
                        setUser({
                            uid: userData.uid,
                            email: userData.email,
                            displayName: userData.displayName,
                            getIdToken: async () => storedToken
                        });

                        // Try to load Firestore data with stored UID
                        const userDocRef = doc(db, 'users', userData.uid);
                        const userDoc = await getDoc(userDocRef);

                        if (userDoc.exists()) {
                            setUserData(userDoc.data());
                        }
                    } catch (err) {
                        console.error('🔍 DashboardPage: Error with stored data:', err);
                    }
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
                        <h3 className="font-semibold mb-2">Error Loading Dashboard</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No user state
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
                    <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
                    <a
                        href="https://mindi.tv/login"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    // Success state - render the full FilmmakerDashboard
    console.log('🔍 DashboardPage: Rendering FilmmakerDashboard component');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dashboard Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                🎬 Filmmaker Dashboard
                            </h1>
                            <p className="text-sm text-gray-600">
                                Welcome back, {userData?.fullName || user?.email}
                            </p>
                            {userData?.subdomain && (
                                <p className="text-sm text-blue-600">
                                    Your page: {userData.subdomain}.mindi.tv
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {userData?.subdomain && (
                                <a
                                    href={`https://${userData.subdomain}.mindi.tv`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    View My Page
                                </a>
                            )}
                            <button
                                onClick={() => {
                                    // Clear stored auth data and sign out
                                    localStorage.removeItem('firebaseAuthToken');
                                    localStorage.removeItem('firebaseUser');
                                    auth.signOut();
                                    window.location.href = 'https://mindi.tv';
                                }}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Use your existing FilmmakerDashboard component */}
            <FilmmakerDashboard
                user={user}
                userData={userData}
                // Pass any additional props your dashboard needs
                userId={user.uid}
                filmmakerData={userData}
            />
        </div>
    );
};

export default DashboardPage;