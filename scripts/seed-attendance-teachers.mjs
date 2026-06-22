#!/usr/bin/env node
/**
 * Upsert SSLA teacher roster into Firestore collection `attendance_teachers`.
 *
 * Uses `.env` / `.env.local` with the same VITE_FIREBASE_* vars as the web app.
 *
 * Does NOT create Firebase Authentication users — teachers still cannot sign in until:
 *   Firebase Console → Authentication → Add user (email must match the stored email),
 *   then set password / send reset.
 *
 * Usage:
 *   npm run seed:attendance-teachers
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";
import { loadProjectEnv } from "./load-project-env.mjs";
import {
  ATTENDANCE_TEACHERS_COLLECTION,
  SSLA_TEACHERS_ROSTER,
  rosterTeacherDocId,
  rosterRowToTeacherPayload,
} from "../src/data/attendanceTeachersRoster.js";

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
  console.error("Missing VITE_FIREBASE_API_KEY or VITE_FIREBASE_PROJECT_ID in .env");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BATCH_SIZE = 500;
const rows = SSLA_TEACHERS_ROSTER;

try {
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(db);
    for (const row of chunk) {
      const id = rosterTeacherDocId(row);
      const payload = rosterRowToTeacherPayload(row);
      batch.set(doc(db, ATTENDANCE_TEACHERS_COLLECTION, id), payload);
    }
    await batch.commit();
  }
} catch (e) {
  if (e?.code === "permission-denied" || e?.message?.includes("PERMISSION_DENIED")) {
    console.error(`
Firestore rejected the write (PERMISSION_DENIED). Rules must allow "${ATTENDANCE_TEACHERS_COLLECTION}".

See ./firestore.rules and npm run seed:attendance-rooms error message for how to fix.
`);
  }
  throw e;
}

console.log(`OK — upserted ${rows.length} teachers into "${ATTENDANCE_TEACHERS_COLLECTION}".`);
console.log("");
console.log(
  "Next: Create Firebase Auth users (email/password) for each teacher email shown in Firestore,",
);
console.log("or share passwords after inviting users. Placeholder emails end with @teachers-import.pending.");
for (const row of rows) {
  const id = rosterTeacherDocId(row);
  const { email } = rosterRowToTeacherPayload(row);
  console.log(`  ${id} → ${email}`);
}
