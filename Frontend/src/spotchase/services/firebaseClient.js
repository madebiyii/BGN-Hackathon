import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "spotlove-6e05c.firebaseapp.com",
  databaseURL:
    "https://spotlove-6e05c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spotlove-6e05c",
  storageBucket: "spotlove-6e05c.appspot.com",
  messagingSenderId: "511602126386",
  appId: "1:511602126386:web:13fb53365341629ecb162b",
  measurementId: "G-ZMZ8LR37XZ",
};

const app = initializeApp(firebaseConfig);
export const rdb = getDatabase(app);
