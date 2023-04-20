// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqKBdu5xXyq964abc2abXvNknp67inXMg",
  authDomain: "water-tracking-7374b.firebaseapp.com",
  projectId: "water-tracking-7374b",
  storageBucket: "water-tracking-7374b.appspot.com",
  messagingSenderId: "562317304019",
  appId: "1:562317304019:web:66445aaad6bee905e77426",
  measurementId: "G-NH9Z9BLWT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);