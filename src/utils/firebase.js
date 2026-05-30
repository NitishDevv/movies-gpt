// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx3mJld7Be2iZh4FWYi1C05OTy6gvaQrs",
  authDomain: "moviesgpt-58866.firebaseapp.com",
  projectId: "moviesgpt-58866",
  storageBucket: "moviesgpt-58866.firebasestorage.app",
  messagingSenderId: "626683114052",
  appId: "1:626683114052:web:baf1facfedb85cdfacc211",
  measurementId: "G-6J4DXE25Q0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
