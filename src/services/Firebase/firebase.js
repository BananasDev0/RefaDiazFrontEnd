// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
///import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCh_jKnAIbWSaaGC5eykXs8rbYEkqjjvU0',
  authDomain: 'refadiazdev.firebaseapp.com',
  projectId: 'refadiazdev',
  storageBucket: 'refadiazdev.appspot.com',
  messagingSenderId: '138087949025',
  appId: '1:138087949025:web:cca4b8a7837edba0720da0'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
///const auth = getAuth(app);