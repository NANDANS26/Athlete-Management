import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSxUJw1g6ijn0PEnP--YASZkWQmxUOlhg",
  authDomain: "athlete-2381f.firebaseapp.com",
  projectId: "athlete-2381f",
  storageBucket: "athlete-2381f.firebasestorage.app",
  messagingSenderId: "248680353340",
  appId: "1:248680353340:web:4d049ca95f20d4a198fd39",
  measurementId: "G-99B9BCR5B4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  doc,
  setDoc,
  getDoc
};
export type { User };
