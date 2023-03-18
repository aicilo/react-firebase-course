import { initializeApp } from "firebase/app";
import { GithubAuthProvider } from "firebase/auth"; //for github
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//getAuth > firebase registered email
//GoogleAuthProvider > //for gmail
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJOOEvQempfvuvcefWlQipVzKIiOGjK8s",
  authDomain: "fir-frontend-bbf95.firebaseapp.com",
  projectId: "fir-frontend-bbf95",
  storageBucket: "fir-frontend-bbf95.appspot.com",
  messagingSenderId: "725868628106",
  appId: "1:725868628106:web:c2f5c7c7de7a655d610573",
  measurementId: "G-17P32YFHD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
