#!/usr/bin/env node
/**
 * Import students from the 2025–2026 Excel sheet into Firestore `attendance_students`.
 *
 * Maps spreadsheet "Room/Classs" (e.g. 2, 13) → `attendance_rooms` doc ids (r1 = Room No. 2, …)
 * using room names from VITE_ATTENDANCE_ROOM_NAMES / defaults in attendanceRoomList.js.
 *
 * Usage:
 *   npm run import:students-xlsx -- "/path/to/Student data 2025-2026 Session.xlsx"
 * Or set STUDENT_IMPORT_XLSX in .env.
 * If neither is set, looks for `~/Downloads/Student data 2025-2026 Session.xlsx` or
 * `./data/Student data 2025-2026 Session.xlsx` in the project.
 *
 * Doc ids: stu-2026-0001 … (from sheet serial column). Re-run overwrites same ids.
 *
 * Requires: Firestore rules allowing writes to attendance_students (see firestore.rules).
 */
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";
import { readFileSync, existsSync } from "node:fs";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";
import { loadProjectEnv } from "./load-project-env.mjs";
import {
  ATTENDANCE_STUDENTS_COLLECTION,
  buildPhysicalNumberToRoomIdMap,
  resolveAttendanceRooms,
} from "../src/data/attendanceRoomList.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

if (!loadProjectEnv(root)) {
  console.error(`No .env or .env.local in ${root}`);
  process.exit(1);
}

const DEFAULT_FILENAME = "Student data 2025-2026 Session.xlsx";
const pathCandidates = [
  process.argv[2]?.trim(),
  process.env.STUDENT_IMPORT_XLSX?.trim(),
  join(homedir(), "Downloads", DEFAULT_FILENAME),
  join(root, "data", DEFAULT_FILENAME),
].filter(Boolean);

const xlsxPath = pathCandidates.find((p) => existsSync(p)) ?? "";

if (!xlsxPath) {
  console.error(`Missing Excel file. Tried:
  - CLI argument (npm run import:students-xlsx -- "/path/to/file.xlsx")
  - STUDENT_IMPORT_XLSX in .env
  - ${join(homedir(), "Downloads", DEFAULT_FILENAME)}
  - ${join(root, "data", DEFAULT_FILENAME)}

Put the workbook in ./data/ with the name above, or pass the full path.
`);
  process.exit(1);
}

console.log(`Using file: ${xlsxPath}`);

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
  console.error("Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in .env");
  process.exit(1);
}

const rooms = resolveAttendanceRooms(process.env.VITE_ATTENDANCE_ROOM_NAMES);
const roomByPhysical = buildPhysicalNumberToRoomIdMap(rooms);

/** US-style M/D/YY or M/D/YYYY → YYYY-MM-DD */
function normalizeDob(s) {
  const t = String(s ?? "").trim();
  if (!t) return "";
  const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return t;
  let month = parseInt(m[1], 10);
  let day = parseInt(m[2], 10);
  let year = parseInt(m[3], 10);
  if (year < 100) year += year < 50 ? 2000 : 1900;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function rowToFirestoreStudent(row, index) {
  const serialRaw = row.__EMPTY ?? row.__EMPTY_1 ?? String(index + 1);
  const serial = parseInt(String(serialRaw).trim(), 10);
  const n = Number.isFinite(serial) ? serial : index + 1;

  const classRaw = String(row["Room/Classs"] ?? "").trim();
  const physical = parseInt(classRaw, 10);
  const roomId = Number.isFinite(physical) ? roomByPhysical.get(physical) : null;
  const roomIds = roomId ? [roomId] : [];

  if (classRaw && !roomId) {
    console.warn(`Row ${n}: unknown room/class "${classRaw}" — roomIds left empty`);
  }

  const firstName = String(row["First Name"] ?? "").trim();
  const lastName = String(row["Last  Name"] ?? "").trim();
  if (!firstName && !lastName) return null;

  return {
    id: `stu-2026-${String(n).padStart(4, "0")}`,
    firstName,
    middleName: String(row.__EMPTY_2 ?? "").trim(),
    lastName,
    dateOfBirth: normalizeDob(row.DOB),
    fathersName: String(row["Father's Name"] ?? "").trim(),
    mothersName: String(row["Mothers name"] ?? "").trim(),
    address: String(row.Address ?? "").trim(),
    city: String(row.City ?? "").trim(),
    state: String(row.State ?? "").trim(),
    zip: String(row.ZIP ?? "").trim(),
    homePhone: String(row["Home Phone"] ?? "").trim(),
    cell1: String(row["Cell #"] ?? "").trim(),
    cell2: String(row["2nd Cell #"] ?? "").trim(),
    email: String(row.Email ?? "").trim(),
    emergencyPhone: String(row["Emergency phone #"] ?? "").trim(),
    roomIds,
  };
}

const wb = XLSX.read(readFileSync(xlsxPath));
const sheetName = wb.SheetNames[0];
const sh = wb.Sheets[sheetName];
const rawRows = XLSX.utils.sheet_to_json(sh, { defval: "", raw: false });

const students = [];
for (let i = 0; i < rawRows.length; i++) {
  const doc = rowToFirestoreStudent(rawRows[i], i);
  if (doc) students.push(doc);
}

console.log(`Sheet "${sheetName}": ${rawRows.length} rows → ${students.length} students (skipped empty names)`);
console.log("Room map (spreadsheet number → Firestore room id):");
for (const [num, id] of [...roomByPhysical.entries()].sort((a, b) => a[0] - b[0])) {
  const name = rooms.find((r) => r.id === id)?.name ?? id;
  console.log(`  ${num} → ${id} (${name})`);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const BATCH = 500;

try {
  for (let i = 0; i < students.length; i += BATCH) {
    const batch = writeBatch(db);
    const chunk = students.slice(i, i + BATCH);
    for (const s of chunk) {
      batch.set(doc(db, ATTENDANCE_STUDENTS_COLLECTION, s.id), {
        firstName: s.firstName,
        middleName: s.middleName,
        lastName: s.lastName,
        dateOfBirth: s.dateOfBirth,
        fathersName: s.fathersName,
        mothersName: s.mothersName,
        address: s.address,
        city: s.city,
        state: s.state,
        zip: s.zip,
        homePhone: s.homePhone,
        cell1: s.cell1,
        cell2: s.cell2,
        email: s.email,
        emergencyPhone: s.emergencyPhone,
        roomIds: s.roomIds,
      });
    }
    await batch.commit();
    console.log(`Committed ${chunk.length} docs (${i + 1}–${i + chunk.length} of ${students.length})`);
  }
} catch (e) {
  if (e?.code === "permission-denied" || e?.message?.includes("PERMISSION_DENIED")) {
    console.error(`
PERMISSION_DENIED: allow writes to "${ATTENDANCE_STUDENTS_COLLECTION}" in Firestore rules.
See ./firestore.rules in this repo → publish in Firebase Console.
`);
  }
  throw e;
}

console.log(`Done. Imported into "${ATTENDANCE_STUDENTS_COLLECTION}" with ids stu-2026-NNNN.`);
