import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBohetEQXVTK6kEq8VS2yHqZJcqqCC7fj0",
  authDomain: "produtime-fa9af.firebaseapp.com",
  projectId: "produtime-fa9af",
  storageBucket: "produtime-fa9af.appspot.com",
  messagingSenderId: "545474059112",
  appId: "1:545474059112:web:040ab7ea733a75652794dd",
  measurementId: "G-45144WT77B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {}
}

export function signOut() {
  try {
    auth.signOut();
  } catch (error) {}
}
