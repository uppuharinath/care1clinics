// src/contexts/auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[Auth] onAuthStateChanged triggered');
      if (user) {
        const formattedUser = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime
          }
        };
        setCurrentUser(formattedUser);
        setUserLoggedIn(true);
        console.log('[Auth] User signed in:', formattedUser);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        console.log('[Auth] User signed out');
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      console.log('[Auth] Sign-out successful');
    } catch (err) {
      console.error('[Auth] Sign-out error:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('[Auth] Google sign-in successful');
    } catch (err) {
      console.error('[Auth] Google sign-in error:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    isLoading,
    error,
    signOut,
    signInWithGoogle,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? (
        children
      ) : (
        <div className="auth-loading-overlay">
          <div className="spinner"></div>
          <p>Loading authentication state...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
