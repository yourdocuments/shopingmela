// ============================================================
// MILON MELA
// Firebase Configuration
// Step: 9.1.22
// ============================================================

// Firebase Core
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

// Firebase Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

// Cloud Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Firebase Storage
import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";

// Firebase Analytics
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";


// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyA8Ixnp_UKTQoLQ1PW8vk6Uz5eUplDF8ag",
  authDomain: "milonmelay.firebaseapp.com",
  projectId: "milonmelay",
  storageBucket: "milonmelay.firebasestorage.app",
  messagingSenderId: "1047973064469",
  appId: "1:1047973064469:web:8cfa4ad0ec123df8d4431c",
  measurementId: "G-6N9HYS9GKN"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);


// ============================================================
// INITIALIZE FIREBASE SERVICES
// ============================================================

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app);

// Analytics
let analytics = null;

try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn(
    "Firebase Analytics could not be initialized:",
    error
  );
}


// ============================================================
// GLOBAL EXPORT
// ============================================================

// অন্য JavaScript module থেকে ব্যবহার করার জন্য export
export {
  app,
  auth,
  db,
  storage,
  analytics
};


// ============================================================
// CONNECTION TEST
// ============================================================

console.log("======================================");
console.log("Milon Mela Firebase Connected");
console.log("======================================");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Authentication: Ready");
console.log("Firestore: Ready");
console.log("Storage: Ready");
console.log("Analytics:", analytics ? "Ready" : "Not available");
console.log("======================================");
