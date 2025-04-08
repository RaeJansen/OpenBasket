// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnU8aatoRtA0NKDAFaW5A7s8F5Iih7Dlg",
  authDomain: "openbasket-leaderboard-580cb.firebaseapp.com",
  projectId: "openbasket-leaderboard-580cb",
  storageBucket: "openbasket-leaderboard-580cb.firebasestorage.app",
  messagingSenderId: "35984053615",
  appId: "1:35984053615:web:5321b19786f435ef10049a",
  measurementId: "G-JBBRM5WPGY",
};

// Initialize Firebase only if not initialized yet
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const db = getFirestore(app);  // Only export db once
export { collection, addDoc, getDocs, orderBy, query };


