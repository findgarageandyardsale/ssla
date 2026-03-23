import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth, getFirebaseConfigurationHint } from "../config/firebase";

/** Map Firebase Auth error codes to short messages for the login form */
export function mapAttendanceAuthError(code) {
  const map = {
    "auth/invalid-email": "Invalid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found for this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Sign-in failed. Check your email and password.";
}

/**
 * Sign in with Firebase Authentication (Email/Password).
 * User must exist in Firebase Console → Authentication.
 */
export async function attendanceSignIn(email, password) {
  const auth = getFirebaseAuth();
  if (!auth) {
    const msg =
      getFirebaseConfigurationHint() ||
      "Firebase is not configured. Add VITE_FIREBASE_* to .env and restart npm run dev.";
    const err = new Error(msg);
    err.code = "app/no-firebase";
    throw err;
  }
  await signInWithEmailAndPassword(auth, String(email).trim(), password);
}

export async function attendanceSignOut() {
  const auth = getFirebaseAuth();
  if (auth) await signOut(auth);
}

/**
 * Subscribe to auth state (session restore on refresh).
 * @param {(user: import('firebase/auth').User | null) => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeAttendanceAuth(callback) {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
