// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, push, remove, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATdJwu-LId_xBeUF1pDnviu1caVNcQAhs",
  authDomain: "expense-tracker-24cc4.firebaseapp.com",
  projectId: "expense-tracker-24cc4",
  storageBucket: "expense-tracker-24cc4.appspot.com",
  messagingSenderId: "1012669451999",
  appId: "1:1012669451999:web:9587fdab32e0c70328e36a",
  measurementId: "G-73KV024N4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, push, remove, set };