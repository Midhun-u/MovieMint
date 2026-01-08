'use server'

import { envVariables } from "@/utils/envVariables"
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: envVariables.FIREBASE_API_KEY,
  authDomain: envVariables.FIREBASE_AUTH_DOMAIN,
  projectId: envVariables.FIREBASE_PROJECT_ID,
  storageBucket: envVariables.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVariables.FIREBASE_MESSAGING_SENDER_ID,
  appId: envVariables.FIREBASE_APP_ID
};

// Initializing Firebase
const app = initializeApp(firebaseConfig)

export const googleProvider = new GoogleAuthProvider()
export const firebaseAuth = getAuth(app)