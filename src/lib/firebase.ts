import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAsavU65Nz_gppfeA8iiFeo4QoVGwROXY0",
  authDomain: "worthit-ai-38315.firebaseapp.com",
  projectId: "worthit-ai-38315",
  storageBucket: "worthit-ai-38315.firebasestorage.app",
  messagingSenderId: "695806060393",
  appId: "1:695806060393:web:a126c8f20e2abcb7b43ff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

// Export database
export { db };