// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

// Create context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Add this
  const [loading, setLoading] = useState(true);

  // Sign up function - UPDATED
  async function signup(email, password, isFilmmaker = false) {
    try {
      console.log(`Creating user with email: ${email}`);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user.uid);

      // Create a user document with filmmaker fields
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        isPremium: false,
        isFilmmaker: isFilmmaker,  // Add this
        films: [],                  // Add this - array of film IDs they own
        displayName: email.split('@')[0], // Add a display name
        createdAt: new Date().toISOString(),
      });

      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    console.log(`Logging in user: ${email}`);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logout() {
    console.log("Logging out user");
    return signOut(auth);
  }

  // Get user profile - UPDATED
  async function getUserProfile() {
    if (!currentUser) {
      console.log("No current user, can't get profile");
      return null;
    }

    console.log(`Getting profile for user: ${currentUser.uid}`);
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Merge auth data with Firestore data
      return {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email,
        ...docSnap.data()
      };
    } else {
      console.log("No user profile found");
      return null;
    }
  }

  // Update premium status
  async function updatePremiumStatus(status) {
    if (!currentUser) {
      console.log("No current user, can't update premium status");
      return null;
    }

    console.log(`Updating premium status to ${status} for user: ${currentUser.uid}`);
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, { isPremium: status }, { merge: true });
    return getUserProfile();
  }

  // Listen for auth state changes - UPDATED
  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? user.email : "No user");
      setCurrentUser(user);

      if (user) {
        // Fetch the full profile from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email,
            ...docSnap.data()
          };
          setUserProfile(profile);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Create value object with all functions and state - UPDATED
  const value = {
    currentUser: userProfile || currentUser, // Use profile if available
    signup,
    login,
    logout,
    getUserProfile,
    updatePremiumStatus
  };

  // Provide the value to children
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}