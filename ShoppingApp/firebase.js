// firebase.js (at project root)
import { initializeApp } from 'firebase/app';
import { getFirestore }   from 'firebase/firestore';
import { getAuth,           signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey:           "AIzaSyCKtiv6C_NTpfkTx2OxpcFUHVTfFr86VcE",
  authDomain:       "shopping-list-demo-fa4da.firebaseapp.com",
  projectId:        "shopping-list-demo-fa4da",
  storageBucket:    "shopping-list-demo-fa4da.firebasestorage.app",
  messagingSenderId:"360379045180",
  appId:            "1:360379045180:web:a75fe3ba96942bc174fa39"
};

// initialize the app
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// OPTIONAL: add this log so you can confirm it runs when Metro starts
console.log('🔥 firebase.js loaded, db is:', db);
