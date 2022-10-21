import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    // see .env.local for apiKey
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "firechakra.firebaseapp.com",
    projectId: "firechakra",
    storageBucket: "firechakra.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };