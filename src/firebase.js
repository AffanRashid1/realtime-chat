// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEXrjpla6pk6qZgGvzgwaCwnflP3M3v4w",
    authDomain: "react-app-b260d.firebaseapp.com",
    projectId: "react-app-b260d",
    storageBucket: "react-app-b260d.appspot.com",
    messagingSenderId: "799941022608",
    appId: "1:799941022608:web:9734b7231618361f501915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage()