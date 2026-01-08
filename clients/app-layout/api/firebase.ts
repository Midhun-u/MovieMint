import { envVariables } from "@/utils/envVariables"
import { initializeApp } from "firebase/app"
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: envVariables.FIREBASE_API_KEY,
  authDomain: envVariables.FIREBASE_AUTH_DOMAIN,
  projectId: envVariables.FIREBASE_PROJECT_ID,
  storageBucket: envVariables.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVariables.FIREBASE_MESSAGING_SENDER_ID,
  appId: envVariables.FIREBASE_APP_ID
};

// Initializing Firebase
initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth()