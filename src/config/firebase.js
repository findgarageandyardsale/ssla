import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID || ""}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let db;
let auth;
let storage;

function getFirebaseApp() {
  if (!app) {
    const hasRequired = firebaseConfig.apiKey && firebaseConfig.projectId;
    if (!hasRequired) {
      console.warn(
        "Firebase config missing. Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID (and optionally VITE_FIREBASE_APP_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID) in .env"
      );
      return null;
    }
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb() {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    db = getFirestore(firebaseApp);
  }
  return db;
}

export function getFirebaseAuth() {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export function getFirebaseStorage() {
  if (!storage) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    storage = getStorage(firebaseApp);
  }
  return storage;
}

export { firebaseConfig };
