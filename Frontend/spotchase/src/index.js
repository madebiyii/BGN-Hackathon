import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyC4rmNVm6YE23qHvxHBY-E5uVW5Nig5ypM",
  authDomain: "bng-spotchase.firebaseapp.com",
  projectId: "bng-spotchase",
  storageBucket: "bng-spotchase.appspot.com",
  messagingSenderId: "533411030407",
  appId: "1:533411030407:web:df749534c1cf05d4cf1f22",
  measurementId: "G-BFRPCE2YCV"
};

const cong = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(cong);
export const firebase_google_auth_provider = new GoogleAuthProvider();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
