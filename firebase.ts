// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ← シンプルな getAuth を使います
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVsqY5oT4Z_FsAGj9K4nITJhWHD3qEghk",
  authDomain: "cosmo-list-app.firebaseapp.com",
  projectId: "cosmo-list-app",
  storageBucket: "cosmo-list-app.appspot.com",
  messagingSenderId: "1006119656840",
  appId: "1:1006119656840:web:eb01a2473bd08ee034ae3d",
  measurementId: "G-9BETTN6DFQ"
};

const app = initializeApp(firebaseConfig);

// initializeAuthではなく、getAuthで正しく初期化します
export const auth = getAuth(app);
export const db = getFirestore(app);