import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH7lQ69nzYo-oWNpMq39XO5ssrvw12GD8",
  authDomain: "hutark-1f8a5.firebaseapp.com",
  projectId: "hutark-1f8a5",
  storageBucket: "hutark-1f8a5.firebasestorage.app",
  messagingSenderId: "294415065574",
  appId: "1:294415065574:web:6f3896581c432c254db627",
  measurementId: "G-R54Z2LY869"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let analytics: Analytics | null = null;

// Initialize Firebase Analytics on client-side only
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}

export { app, analytics, firebaseConfig };
