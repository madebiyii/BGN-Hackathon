import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC4rmNVm6YE23qHvxHBY-E5uVW5Nig5ypM",
  authDomain: "bng-spotchase.firebaseapp.com",
  projectId: "bng-spotchase",
  storageBucket: "bng-spotchase.appspot.com",
  messagingSenderId: "533411030407",
  appId: "1:533411030407:web:df749534c1cf05d4cf1f22",
  measurementId: "G-BFRPCE2YCV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
