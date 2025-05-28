// src/firebase-config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDw5I3uHdyWpAYA31rHltw1cfA--gguHs",
  authDomain: "mindi-6650c.firebaseapp.com",
  projectId: "mindi-6650c",
  storageBucket: "mindi-6650c.firebasestorage.app",
  messagingSenderId: "346222667543",
  appId: "1:346222667543:web:7808e95be15d6355d6f952",
  measurementId: "G-E91KF6ZHRX"
};

// Initialize Firebase (prevent duplicate apps)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use existing app
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Functions with region
const functions = getFunctions(app, 'us-central1'); // Specify the region here

// Connect to emulators in development environment
// Check if we're in development and emulators should be used
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const useEmulators = isDevelopment && false; // Set to true if you want to use emulators

if (useEmulators) {
  // Using localhost for emulator connections
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  console.log('Using Firebase emulators');
}

// Firebase Functions API
export const createPaymentIntent = httpsCallable(functions, 'createPayment'); // Updated to point to new function
export const createPayment = httpsCallable(functions, 'createPayment'); // Added new export

// Track analytics events
export const trackEvent = (eventName, eventData) => {
  if (analytics) {
    try {
      import('firebase/analytics').then(({ logEvent }) => {
        logEvent(analytics, eventName, eventData);
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};

export { auth, db, storage, analytics, functions };