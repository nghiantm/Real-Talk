// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chitchat-203eb.firebaseapp.com",
  projectId: "chitchat-203eb",
  storageBucket: "chitchat-203eb.appspot.com",
  messagingSenderId: "606412073738",
  appId: "1:606412073738:web:e827bd86dce40d306aa8f3",
  measurementId: "G-N349P1MWPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Login function
export const logInWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      
    })
    .catch((err) => {
      console.log(err);
    })
}

export const registerWithEmailAndPassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {

    })
    .catch((err) => {
      console.log(err);
    })
}

export const logout = () => {
  signOut(auth);
}