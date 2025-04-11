import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_C7g5bR690qxlZQZU8P2ErcSvZEws1kw",
  authDomain: "speakspace8.firebaseapp.com",
  projectId: "speakspace8",
  storageBucket: "speakspace8.firebasestorage.app",
  messagingSenderId: "876728232285",
  appId: "1:876728232285:web:fea3fd49a8a47e7e1060b4",
  measurementId: "G-NYPVLQ3W9Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
