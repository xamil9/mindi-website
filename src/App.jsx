// mindi-website/src/App.jsx - Complete version with all features
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';

// Pages
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import EnhancedFilmPage from "./components/EnhancedFilmPage";

// Firebase
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function App() {
  const [routeType, setRouteType] = useState('checking'); // 'checking', 'main', 'dashboard', 'filmmaker'
  const [subdomain, setSubdomain] = useState('');
  const [filmmakerData, setFilmmakerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState('checking'); // 'checking', 'loggedIn', 'loggedOut'
  const [user, setUser] = useState(null);

  const db = getFirestore();

  // Authentication monitoring
  useEffect(() => {
    let mounted = true;
    let authHandled = false;

    console.log('🔍 Starting auth check on dashboard');
    console.log('🔍 Current URL:', window.location.href);

    // Check for token in URL (from login redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    console.log('🔍 Token from URL:', tokenFromUrl ? 'Found' : 'Not found');

    // Check localStorage
    const storedToken = localStorage.getItem('firebaseAuthToken');
    const storedUser = localStorage.getItem('firebaseUser');
    console.log('🔍 Stored token:', storedToken ? 'Found' : 'Not found');
    console.log('🔍 Stored user:', storedUser ? 'Found' : 'Not found');

    // Handle token from URL
    if (tokenFromUrl) {
      console.log('🔍 Found token in URL, storing locally');
      localStorage.setItem('firebaseAuthToken', tokenFromUrl);

      // Decode the JWT token to get user info
      try {
        const payload = JSON.parse(atob(tokenFromUrl.split('.')[1]));
        console.log('🔍 Decoded token payload:', payload);

        const userData = {
          uid: payload.user_id || payload.sub,
          email: payload.email,
          displayName: payload.name
        };

        localStorage.setItem('firebaseUser', JSON.stringify(userData));
        console.log('🔍 Stored user data from token:', userData);

        // Set auth state immediately
        setUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          getIdToken: async () => tokenFromUrl
        });
        setAuthState('loggedIn');
        authHandled = true;

      } catch (error) {
        console.error('🔍 Error decoding token:', error);
      }

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // Handle stored token (no token in URL but token exists in storage)
    else if (storedToken) {
      console.log('🔍 No token in URL, but found stored token - decoding it');
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        console.log('🔍 Decoded stored token payload:', payload);

        const userData = {
          uid: payload.user_id || payload.sub,
          email: payload.email,
          displayName: payload.name
        };

        localStorage.setItem('firebaseUser', JSON.stringify(userData));
        console.log('🔍 Updated stored user data:', userData);

        // Set auth state immediately
        setUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          getIdToken: async () => storedToken
        });
        setAuthState('loggedIn');
        authHandled = true;

      } catch (error) {
        console.error('🔍 Error decoding stored token:', error);
        // Clear invalid token
        localStorage.removeItem('firebaseAuthToken');
        localStorage.removeItem('firebaseUser');
        setAuthState('loggedOut');
        authHandled = true;
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!mounted || authHandled) return;

      console.log('🔍 Auth state changed:', currentUser ? 'LOGGED IN' : 'LOGGED OUT');
      console.log('🔍 User email:', currentUser?.email || 'None');

      if (currentUser) {
        setUser(currentUser);
        setAuthState('loggedIn');
      } else {
        console.log('🔍 No Firebase auth and no stored token');
        setUser(null);
        setAuthState('loggedOut');
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Hostname detection and routing
  useEffect(() => {
    const hostname = window.location.hostname;
    console.log('Current hostname:', hostname);

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Development mode
      setRouteType('main');
      setLoading(false);
    } else if (hostname === 'dashboard.mindi.tv') {
      // Dashboard subdomain
      console.log('Dashboard detected!');
      setRouteType('dashboard');
      setLoading(false);
    } else {
      const parts = hostname.split('.');

      if (parts.length >= 3) {
        const potentialSubdomain = parts[0];

        if (potentialSubdomain !== 'www' && potentialSubdomain !== 'dashboard' && parts[1] === 'mindi' && parts[2] === 'tv') {
          setSubdomain(potentialSubdomain);
          setRouteType('filmmaker');
          console.log('Detected filmmaker subdomain:', potentialSubdomain);
          fetchFilmmakerData(potentialSubdomain);
        } else {
          setRouteType('main');
          setLoading(false);
        }
      } else if (hostname === 'mindi.tv' || hostname === 'www.mindi.tv') {
        setRouteType('main');
        setLoading(false);
      } else {
        setRouteType('main');
        setLoading(false);
      }
    }
  }, []);

  // For development testing - filmmaker parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testFilmmaker = urlParams.get('filmmaker');
    if (testFilmmaker && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      setSubdomain(testFilmmaker);
      setRouteType('filmmaker');
      fetchFilmmakerData(testFilmmaker);
      console.log('Test filmmaker mode activated:', testFilmmaker);
    }
  }, []);

  const fetchFilmmakerData = async (subdomainToFetch) => {
    try {
      setLoading(true);

      // Query Firestore for user with matching subdomain
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('subdomain', '==', subdomainToFetch));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Check if filmmaker page is published
        if (userData.filmmakerProfile?.isPublished) {
          setFilmmakerData({
            id: userDoc.id,
            ...userData
          });
        } else {
          // Page not published yet
          setFilmmakerData(null);
        }
      } else {
        // Filmmaker not found
        setFilmmakerData(null);
      }
    } catch (error) {
      console.error('Error fetching filmmaker:', error);
      setFilmmakerData(null);
    } finally {
      setLoading(false);
    }
  };

  // Loading state - show while checking route type OR auth state
  if (loading || routeType === 'checking') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔄</div>
          <div>Loading...</div>
          <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
            Route: {routeType} | Auth: {authState}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard subdomain - protected route
  if (routeType === 'dashboard') {
    console.log('🔍 Dashboard route - Auth state:', authState, 'User:', user?.email);

    // Still checking authentication
    if (authState === 'checking') {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔄</div>
            <div>Checking authentication...</div>
          </div>
        </div>
      );
    }

    // Not logged in - show login prompt
    if (authState === 'loggedOut' || !user) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
            <h1>Authentication Required</h1>
            <p>You need to be logged in to access the dashboard.</p>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
              Debug: Auth state = {authState}, User = {user ? 'exists' : 'null'}
            </div>
            <div style={{ marginTop: '20px' }}>
              <a
                href="https://mindi.tv/login"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  margin: '5px'
                }}
              >
                Login
              </a>
              <a
                href="https://mindi.tv/signup"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  margin: '5px'
                }}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Logged in - show dashboard (no Router wrapper needed for dashboard)
    console.log('🔍 Showing dashboard for user:', user.email);
    return <DashboardPage />;
  }

  // Filmmaker subdomain
  if (routeType === 'filmmaker') {
    return filmmakerData ? (
      <FilmmakerSubdomainPage
        filmmaker={filmmakerData}
        subdomain={subdomain}
      />
    ) : (
      <FilmmakerNotFound subdomain={subdomain} />
    );
  }

  // Main site routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard route for localhost development */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Development route to test filmmaker pages */}
        <Route path="/test-filmmaker/:subdomain" element={
          <div>Test filmmaker page for {window.location.pathname.split('/')[2]}</div>
        } />

        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600 mb-4">Page not found</p>
              <a href="/" className="text-blue-600 hover:underline">← Back to Mindi.tv</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

// Component to display filmmaker's page using your existing EnhancedFilmPage
const FilmmakerSubdomainPage = ({ filmmaker, subdomain }) => {
  // Create a mock film object based on filmmaker data
  // This maps your Firebase filmmaker data to the format your EnhancedFilmPage expects
  const filmId = filmmaker.films?.[0] || `${subdomain}-film`;

  return (
    <div>
      {/* Header with filmmaker branding */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4">
            {filmmaker.filmmakerProfile?.heroImage && (
              <img
                src={filmmaker.filmmakerProfile.heroImage}
                alt={filmmaker.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{filmmaker.fullName}</h1>
              {filmmaker.productionCompany && (
                <p className="text-blue-100">{filmmaker.productionCompany}</p>
              )}
              <p className="text-sm text-blue-100">{subdomain}.mindi.tv</p>
            </div>
          </div>
          {filmmaker.bio && (
            <p className="mt-4 text-blue-100 max-w-2xl">{filmmaker.bio}</p>
          )}
        </div>
      </div>

      {/* Use your existing EnhancedFilmPage component */}
      <EnhancedFilmPage
        filmId={filmId}
        initialTab="about"
        // Pass filmmaker data as current user if they own this film
        currentUser={{
          uid: filmmaker.id,
          displayName: filmmaker.fullName,
          email: filmmaker.email,
          isFilmmaker: true,
          films: filmmaker.films || [filmId]
        }}
        // Enable dashboard access for film owners
        onDashboardClick={(filmId) => {
          if (window.location.hostname === 'localhost') {
            window.location.href = '/dashboard';
          } else {
            window.location.href = 'https://dashboard.mindi.tv';
          }
        }}
      />

      {/* Footer with back to main site */}
      <div className="bg-gray-100 py-6 text-center">
        <p className="text-gray-600">
          Powered by <a href="https://mindi.tv" className="text-blue-600 hover:underline">Mindi.tv</a>
        </p>
      </div>
    </div>
  );
};

// Component for when filmmaker not found
const FilmmakerNotFound = ({ subdomain }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Filmmaker Not Found</h1>
      <p className="text-gray-600 mb-4">
        The filmmaker page "{subdomain}.mindi.tv" doesn't exist or hasn't been published yet.
      </p>
      <a href="https://mindi.tv" className="text-blue-600 hover:underline">
        ← Back to Mindi.tv
      </a>
    </div>
  </div>
);

export default App;