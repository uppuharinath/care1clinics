// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPuUvbBOVBOxxguY0_5qOIxorOKwzGJZ0",
  authDomain: "care1clinics-d8312.firebaseapp.com",
  projectId: "care1clinics-d8312",
  storageBucket: "care1clinics-d8312.appspot.com",
  messagingSenderId: "125767823861",
  appId: "1:125767823861:web:c5417bae44b208fb20f0bc",
  measurementId: "G-JKE33B7D4F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Initialize Firestore
const db = getFirestore(app);

export { app, auth, db }; // ✅ Export Firestore
