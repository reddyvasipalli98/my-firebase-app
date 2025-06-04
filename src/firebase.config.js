// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAb4q-6co0at10a2WF137cjIliSAoOhfSM",
    authDomain: "react-firebase-project-dbbca.firebaseapp.com",
    projectId: "react-firebase-project-dbbca",
    storageBucket: "react-firebase-project-dbbca.appspot.com",
    messagingSenderId: "200385104416",
    appId: "1:200385104416:web:6d97bafb89cb48a1154a45",
    measurementId: "G-FCRZFGZ4ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 