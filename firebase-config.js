import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ixnp_UKTQoLQ1PW8vk6Uz5eUplDF8ag",
  authDomain: "milonmelay.firebaseapp.com",
  projectId: "milonmelay",
  storageBucket: "milonmelay.firebasestorage.app",
  messagingSenderId: "1047973064469",
  appId: "1:1047973064469:web:8cfa4ad0ec123df8d4431c",
  measurementId: "G-6N9HYS9GKN"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

let analytics = null;

try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn(
    "Firebase Analytics could not be initialized:",
    error
  );
}

export {
  app,
  auth,
  db,
  storage,
  analytics
};

console.log("======================================");
console.log("Milon Mela Firebase Connected");
console.log("======================================");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Authentication: Ready");
console.log("Firestore: Ready");
console.log("Storage: Ready");
console.log(
  "Analytics:",
  analytics ? "Ready" : "Not available"
);
console.log("======================================");
