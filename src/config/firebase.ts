// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWFd4u9OLrsL4xTNJ_URFzSP5xZtYU-vg",
  authDomain: "social-media-9eb4a.firebaseapp.com",
  projectId: "social-media-9eb4a",
  storageBucket: "social-media-9eb4a.appspot.com",
  messagingSenderId: "775667186669",
  appId: "1:775667186669:web:d4f2dd6cf7af319f1085e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);