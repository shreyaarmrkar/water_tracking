// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6SzfB6gGrYn_1tR5Um-Ov6jdnA80BfYM",
  authDomain: "health-7d891.firebaseapp.com",
  projectId: "health-7d891",
  storageBucket: "health-7d891.appspot.com",
  messagingSenderId: "176423414674",
  appId: "1:176423414674:web:f779f2e7e41805d136af4b",
  measurementId: "G-RCKNVMV9DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);