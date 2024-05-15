import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyD41w0Ob1Nb6GT9vi_N7ugXaH_XGbzzigA",
  authDomain: "nextjs-auth-e3e4a.firebaseapp.com",
  projectId: "nextjs-auth-e3e4a",
  storageBucket: "nextjs-auth-e3e4a.appspot.com",
  messagingSenderId: "986013362049",
  appId: "1:986013362049:web:a3680d3a0932408adfea80",
    measurementId: "G-J2PT71V0BR",
  
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app) as Auth;
const database = getFirestore(app);
const provider = new GoogleAuthProvider();

export { database, auth, provider };
