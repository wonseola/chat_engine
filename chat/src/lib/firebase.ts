import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-1251b.firebaseapp.com",
    projectId: "reactchat-1251b",
    storageBucket: "reactchat-1251b.appspot.com",
    messagingSenderId: "127206543319",
    appId: "1:127206543319:web:7a218e10c2c3e4ad358592"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();