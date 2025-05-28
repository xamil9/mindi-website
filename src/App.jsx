// mindi-website/src/App.jsx - Updated with Dashboard Route
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage"; // New dashboard page
import ProtectedRoute from "./components/ProtectedRoute"; // Updated protected route

// Import your existing EnhancedFilmPage from tubi-platform-3
import EnhancedFilmPage from "./components/EnhancedFilmPage";

// Import Firebase for filmmaker data lookup
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function App() {
  const [routeType, setRouteType] = useState('main');
  const [subdomain, setSubdomain] = useState('');
  const [filmmakerData, setFilmmakerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const hostname = window.location.hostname;
    console.log('Current hostname:', hostname);

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Development mode
      setRouteType('main');
      setLoading(false);
    } else {
      const parts = hostname.split('.');

      // Handle dashboard.mindi.tv
      if (hostname === 'dashboard.mindi.tv') {
        setRouteType('dashboard');
        setLoading(false);
        return;
      }

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

  // For development testing - you can visit localhost:5173?filmmaker=testname
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      {routeType === 'dashboard' ? (
        // Dashboard subdomain - show protected dashboard
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ) : routeType === 'filmmaker' ? (
        // Filmmaker subdomain - show their film page
        filmmakerData ? (
          <FilmmakerSubdomainPage
            filmmaker={filmmakerData}
            subdomain={subdomain}
          />
        ) : (
          <FilmmakerNotFound subdomain={subdomain} />
        )
      ) : (
        // Main site routes
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
      )}
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
          // Redirect to dashboard.mindi.tv
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