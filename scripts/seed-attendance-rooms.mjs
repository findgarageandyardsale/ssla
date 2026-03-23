#!/usr/bin/env node
/**
 * Upload attendance rooms to Firestore collection `attendance_rooms`.
 *
 * Uses `.env` in the project root (VITE_FIREBASE_* + optional VITE_ATTENDANCE_ROOM_NAMES).
 * Same rules as the web app: Firestore security rules must allow these writes.
 *
 * Usage:
 *   npm run seed:attendance-rooms
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";
import { loadProjectEnv } from "./load-project-env.mjs";
import {
  ATTENDANCE_ROOMS_COLLECTION,
  resolveAttendanceRooms,
} from "../src/data/attendanceRoomList.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

if (!loadProjectEnv(root)) {
  console.error(`No .env or .env.local found in ${root}`);
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain:
    process.env.VITE_FIREBASE_AUTH_DOMAIN ||
    `${process.env.VITE_FIREBASE_PROJECT_ID || ""}.firebaseapp.com`,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error(`
This script needs Firebase web app config (same as the attendance dashboard).

Add these to .env or .env.local (Firebase Console → Project settings → Your apps → Web app):

  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_PROJECT_ID=...
  VITE_FIREBASE_AUTH_DOMAIN=...        (optional; defaults to PROJECT_ID.firebaseapp.com)
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  VITE_FIREBASE_APP_ID=...

Copy from .env.example and fill in real values. Your current .env only has Supabase — Firebase vars are separate.
`);
  process.exit(1);
}

const rooms = resolveAttendanceRooms(process.env.VITE_ATTENDANCE_ROOM_NAMES);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const batch = writeBatch(db);

for (const r of rooms) {
  batch.set(doc(db, ATTENDANCE_ROOMS_COLLECTION, r.id), {
    name: r.name || "",
    description: r.description || "",
  });
}

try {
  await batch.commit();
} catch (e) {
  if (e?.code === "permission-denied" || e?.message?.includes("PERMISSION_DENIED")) {
    console.error(`
Firestore rejected the write (PERMISSION_DENIED). Your rules must allow updates to "${ATTENDANCE_ROOMS_COLLECTION}".

Fix (pick one):
  1) Firebase Console → Firestore Database → Rules → paste rules from ./firestore.rules in this repo → Publish
  2) Or deploy: firebase deploy --only firestore:rules  (needs firebase-tools + firebase login)

The included firestore.rules allow read/write on attendance_* collections for development (no auth).
`);
  }
  throw e;
}

console.log(
  `OK — wrote ${rooms.length} documents to Firestore "${ATTENDANCE_ROOMS_COLLECTION}":`,
);
for (const r of rooms) {
  console.log(`  ${r.id} → ${r.name}`);
}
