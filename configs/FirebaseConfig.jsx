// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjrk2O6zHm_vKwG7ltqp7nAYVNRwHZyXI",
  authDomain: "react-native-projects-cec60.firebaseapp.com",
  projectId: "react-native-projects-cec60",
  storageBucket: "react-native-projects-cec60.appspot.com",
  messagingSenderId: "913986629890",
  appId: "1:913986629890:web:b6d4e385d61caa7abbd21b",
  measurementId: "G-Y27638TG7F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);