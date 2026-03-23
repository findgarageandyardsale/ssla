import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/** Read Vite env with trim and optional surrounding quotes (common in .env files). */
function trimEnv(name) {
  let v = import.meta.env[name];
  if (v == null || v === undefined) return "";
  v = String(v).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

/** True if value looks like a leftover from .env.example (not a real Firebase project). */
function looksLikeFirebasePlaceholder(value) {
  const v = String(value).trim().toLowerCase();
  if (!v) return true;
  if (v === "your-web-api-key" || v === "your-project-id") return true;
  if (v.startsWith("your-")) return true;
  return false;
}

function buildFirebaseConfig() {
  const apiKey = trimEnv("VITE_FIREBASE_API_KEY");
  const projectId = trimEnv("VITE_FIREBASE_PROJECT_ID");
  return {
    apiKey,
    projectId,
    authDomain:
      trimEnv("VITE_FIREBASE_AUTH_DOMAIN") ||
      (projectId ? `${projectId}.firebaseapp.com` : ""),
    storageBucket: trimEnv("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: trimEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: trimEnv("VITE_FIREBASE_APP_ID"),
  };
}

const firebaseConfig = buildFirebaseConfig();

export function isFirebaseConfigured() {
  const { apiKey, projectId } = firebaseConfig;
  return Boolean(
    apiKey &&
      projectId &&
      !looksLikeFirebasePlaceholder(apiKey) &&
      !looksLikeFirebasePlaceholder(projectId)
  );
}

/**
 * User-facing hint when Firebase env is missing or still has template values.
 */
export function getFirebaseConfigurationHint() {
  if (isFirebaseConfigured()) return null;
  const hasAny =
    firebaseConfig.apiKey ||
    firebaseConfig.projectId ||
    trimEnv("VITE_FIREBASE_APP_ID");
  if (!hasAny) {
    return "Firebase is not configured. Copy .env.example to .env in the project root, paste your Web app config from Firebase Console → Project settings → Your apps, then restart the dev server (npm run dev).";
  }
  if (
    looksLikeFirebasePlaceholder(firebaseConfig.apiKey) ||
    looksLikeFirebasePlaceholder(firebaseConfig.projectId)
  ) {
    return "Firebase still has placeholder values in .env (e.g. your-web-api-key). Replace them with real values from Firebase Console → Project settings, then restart npm run dev.";
  }
  return "Firebase is not configured. Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in .env, then restart the dev server.";
}

let app;
let db;
let auth;
let storage;

function getFirebaseApp() {
  if (!app) {
    if (!isFirebaseConfigured()) {
      console.warn(
        getFirebaseConfigurationHint() ||
          "Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in .env"
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
