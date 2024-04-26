// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7UtxbadWpM_BvMt7LSjXGSq5kBIZaA4c",
  authDomain: "wigandhandbag-1b82e.firebaseapp.com",
  projectId: "wigandhandbag-1b82e",
  storageBucket: "wigandhandbag-1b82e.appspot.com",
  messagingSenderId: "163380939792",
  appId: "1:163380939792:web:9acd540ec9bd5f201ace95",
  measurementId: "G-X726JSNTNS"
};

// Initialize Firebase
// export const analytics = getAnalytics(app);
const app  =  initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app)