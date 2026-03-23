import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "../config/firebase";
import {
  ATTENDANCE_RECORDS_COLLECTION,
  ATTENDANCE_ROOMS_COLLECTION,
  ATTENDANCE_STUDENTS_COLLECTION,
} from "../data/attendanceRoomList.js";
import { DEFAULT_ATTENDANCE_ROOMS } from "../data/attendanceRooms";

const COLLECTIONS = {
  ROOMS: ATTENDANCE_ROOMS_COLLECTION,
  TEACHERS: "attendance_teachers",
  STUDENTS: ATTENDANCE_STUDENTS_COLLECTION,
  RECORDS: ATTENDANCE_RECORDS_COLLECTION,
};

/** Firestore collection id for rooms / classes (Room No. 2, 3, 4, …) */
export const FIRESTORE_ATTENDANCE_ROOMS_COLLECTION = COLLECTIONS.ROOMS;

function getCol(name) {
  const db = getDb();
  if (!db) return null;
  return collection(db, name);
}

// --- Rooms ---
export async function fetchRooms() {
  const col = getCol(COLLECTIONS.ROOMS);
  if (!col) return { success: false, data: [], error: "Firebase not configured" };
  try {
    const snap = await getDocs(col);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { success: true, data };
  } catch (e) {
    return { success: false, data: [], error: e.message };
  }
}

export async function createRoom(id, { name, description }) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    await setDoc(doc(db, COLLECTIONS.ROOMS, id), { name: name || "", description: description || "" });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function updateRoom(id, { name, description }) {
  return createRoom(id, { name, description });
}

export async function deleteRoom(id) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    await deleteDoc(doc(db, COLLECTIONS.ROOMS, id));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Upsert the default room list into Firestore `attendance_rooms` only.
 * Does not change teachers, students, or attendance. Safe to run multiple times.
 */
export async function seedAttendanceRooms(rooms = DEFAULT_ATTENDANCE_ROOMS) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return { success: false, error: "No rooms to write" };
  }
  try {
    const batch = writeBatch(db);
    rooms.forEach((r) => {
      batch.set(doc(db, COLLECTIONS.ROOMS, r.id), {
        name: r.name || "",
        description: r.description || "",
      });
    });
    await batch.commit();
    return { success: true, count: rooms.length, collection: COLLECTIONS.ROOMS };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// --- Teachers ---
export async function fetchTeachers() {
  const col = getCol(COLLECTIONS.TEACHERS);
  if (!col) return { success: false, data: [], error: "Firebase not configured" };
  try {
    const snap = await getDocs(col);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { success: true, data };
  } catch (e) {
    return { success: false, data: [], error: e.message };
  }
}

export async function setTeacher(id, payload) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    const docData = {
      name: payload.name ?? "",
      information: payload.information ?? "",
      email: payload.email ?? "",
      image: payload.image ?? null,
      roomId: payload.roomId ?? null,
      password: payload.password ?? "",
    };
    await setDoc(doc(db, COLLECTIONS.TEACHERS, id), docData);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function deleteTeacher(id) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    await deleteDoc(doc(db, COLLECTIONS.TEACHERS, id));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// --- Students ---
export async function fetchStudents() {
  const col = getCol(COLLECTIONS.STUDENTS);
  if (!col) return { success: false, data: [], error: "Firebase not configured" };
  try {
    const snap = await getDocs(col);
    const data = snap.docs.map((d) => {
      const o = { id: d.id, ...d.data() };
      if (o.roomIds && !Array.isArray(o.roomIds)) o.roomIds = [];
      return o;
    });
    return { success: true, data };
  } catch (e) {
    return { success: false, data: [], error: e.message };
  }
}

export async function setStudent(id, payload) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    const roomIds = Array.isArray(payload.roomIds) ? payload.roomIds : [];
    const docData = {
      firstName: payload.firstName ?? "",
      middleName: payload.middleName ?? "",
      lastName: payload.lastName ?? "",
      dateOfBirth: payload.dateOfBirth ?? "",
      fathersName: payload.fathersName ?? "",
      mothersName: payload.mothersName ?? "",
      address: payload.address ?? "",
      city: payload.city ?? "",
      state: payload.state ?? "",
      zip: payload.zip ?? "",
      homePhone: payload.homePhone ?? "",
      cell1: payload.cell1 ?? "",
      cell2: payload.cell2 ?? "",
      email: payload.email ?? "",
      emergencyPhone: payload.emergencyPhone ?? "",
      roomIds,
    };
    await setDoc(doc(db, COLLECTIONS.STUDENTS, id), docData);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function deleteStudent(id) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    await deleteDoc(doc(db, COLLECTIONS.STUDENTS, id));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function fetchStudentById(id) {
  const db = getDb();
  if (!db) return { success: false, data: null, error: "Firebase not configured" };
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.STUDENTS, id));
    if (!snap.exists()) return { success: true, data: null };
    const o = { id: snap.id, ...snap.data() };
    if (o.roomIds && !Array.isArray(o.roomIds)) o.roomIds = [];
    return { success: true, data: o };
  } catch (e) {
    return { success: false, data: null, error: e.message };
  }
}

// --- Attendance records ---
function recordDocId(studentId, date) {
  return `${studentId}_${date}`;
}

export async function fetchAttendanceRecords(dateFrom, dateTo) {
  const col = getCol(COLLECTIONS.RECORDS);
  if (!col) return { success: false, data: [], error: "Firebase not configured" };
  try {
    const q = query(
      collection(getDb(), COLLECTIONS.RECORDS),
      where("date", ">=", dateFrom),
      where("date", "<=", dateTo)
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { success: true, data };
  } catch (e) {
    return { success: false, data: [], error: e.message };
  }
}

/** Fetch all records (e.g. for last N days). If no range, fetch last 31 days. */
export async function fetchAttendanceRecordsRange(daysBack = 31) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysBack);
  const dateFrom = start.toISOString().slice(0, 10);
  const dateTo = end.toISOString().slice(0, 10);
  return fetchAttendanceRecords(dateFrom, dateTo);
}

export async function setAttendanceRecord(studentId, date, status) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    const id = recordDocId(studentId, date);
    await setDoc(doc(db, COLLECTIONS.RECORDS, id), { studentId, date, status });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function setAttendanceRecordsBatch(records) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  try {
    const batch = writeBatch(db);
    records.forEach(({ studentId, date, status }) => {
      const id = recordDocId(studentId, date);
      batch.set(doc(db, COLLECTIONS.RECORDS, id), { studentId, date, status });
    });
    await batch.commit();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Bulk seed Firestore (rooms, teachers, students, attendance records).
 * Safe to run multiple times (overwrites). Prefer CLI/import scripts for production data.
 */
export async function seedAttendanceData(payload) {
  const db = getDb();
  if (!db) return { success: false, error: "Firebase not configured" };
  const { rooms = [], teachers = [], students = [], attendanceRecords = [] } = payload;
  const BATCH_SIZE = 500;
  try {
    const allOps = [];
    rooms.forEach((r) => allOps.push({ type: "room", data: r }));
    teachers.forEach((t) => allOps.push({ type: "teacher", data: t }));
    students.forEach((s) => allOps.push({ type: "student", data: s }));
    attendanceRecords.forEach((r) => allOps.push({ type: "record", data: r }));
    for (let i = 0; i < allOps.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      const chunk = allOps.slice(i, i + BATCH_SIZE);
      chunk.forEach((op) => {
        if (op.type === "room") {
          batch.set(doc(db, COLLECTIONS.ROOMS, op.data.id), { name: op.data.name || "", description: op.data.description || "" });
        } else if (op.type === "teacher") {
          const t = op.data;
          batch.set(doc(db, COLLECTIONS.TEACHERS, t.id), {
            name: t.name ?? "", information: t.information ?? "", email: t.email ?? "",
            image: t.image ?? null, roomId: t.roomId ?? null, password: t.password ?? "",
          });
        } else if (op.type === "student") {
          const s = op.data;
          const roomIds = Array.isArray(s.roomIds) ? s.roomIds : [];
          if (s.firstName != null) {
            batch.set(doc(db, COLLECTIONS.STUDENTS, s.id), {
              firstName: s.firstName ?? "", middleName: s.middleName ?? "", lastName: s.lastName ?? "",
              dateOfBirth: s.dateOfBirth ?? "", fathersName: s.fathersName ?? "", mothersName: s.mothersName ?? "",
              address: s.address ?? "", city: s.city ?? "", state: s.state ?? "", zip: s.zip ?? "",
              homePhone: s.homePhone ?? "", cell1: s.cell1 ?? "", cell2: s.cell2 ?? "", email: s.email ?? "",
              emergencyPhone: s.emergencyPhone ?? "",
              roomIds,
            });
          } else {
            const parts = (s.name || "").split(" ");
            const firstName = parts[0] ?? "";
            const lastName = parts.slice(1).join(" ") ?? "";
            batch.set(doc(db, COLLECTIONS.STUDENTS, s.id), {
              firstName, middleName: "", lastName,
              dateOfBirth: "", fathersName: s.parentName ?? "", mothersName: "",
              address: "", city: "", state: "", zip: "",
              homePhone: s.parentPhone ?? "", cell1: "", cell2: "", email: s.email ?? "",
              roomIds,
            });
          }
        } else {
          const r = op.data;
          const id = recordDocId(r.studentId, r.date);
          batch.set(doc(db, COLLECTIONS.RECORDS, id), { studentId: r.studentId, date: r.date, status: r.status });
        }
      });
      await batch.commit();
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
