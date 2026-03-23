/**
 * Shared room list parsing (works in Vite and in Node scripts).
 * Collection name must match `attendanceFirestoreService` COLLECTIONS.ROOMS.
 */
export const ATTENDANCE_ROOMS_COLLECTION = "attendance_rooms";

export const FALLBACK_ATTENDANCE_ROOMS = [
  { id: "r1", name: "Room No. 2", description: "" },
  { id: "r2", name: "Room No. 3", description: "" },
  { id: "r3", name: "Room No. 4", description: "" },
  { id: "r4", name: "Room No. 6", description: "" },
  { id: "r5", name: "Room No. 7", description: "" },
  { id: "r6", name: "Room No. 8", description: "" },
  { id: "r7", name: "Room No. 9", description: "" },
  { id: "r8", name: "Room No. 10", description: "" },
  { id: "r9", name: "Room No. 11", description: "" },
  { id: "r10", name: "Room No. 13", description: "" },
];

/**
 * @param {string | undefined} raw comma-separated display names
 * @returns {Array<{id:string,name:string,description:string}>|null}
 */
export function roomsFromCommaSeparatedNames(raw) {
  if (raw == null || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const names = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!names.length) return null;
  return names.map((name, i) => ({
    id: `r${i + 1}`,
    name,
    description: "",
  }));
}

/**
 * @param {string | undefined} envString e.g. process.env.VITE_ATTENDANCE_ROOM_NAMES
 */
export function resolveAttendanceRooms(envString) {
  return roomsFromCommaSeparatedNames(envString) ?? FALLBACK_ATTENDANCE_ROOMS;
}

/** Firestore collection for students (keep in sync with attendanceFirestoreService) */
export const ATTENDANCE_STUDENTS_COLLECTION = "attendance_students";

/** Firestore collection for daily attendance marks (keep in sync with attendanceFirestoreService) */
export const ATTENDANCE_RECORDS_COLLECTION = "attendance_records";

/**
 * Map physical class numbers from the spreadsheet (e.g. 2, 3, 13) to Firestore room doc ids (r1, r2, …).
 * Parses "Room No. N" from each room's `name`.
 * @param {Array<{id:string,name:string}>} [rooms]
 * @returns {Map<number, string>}
 */
export function buildPhysicalNumberToRoomIdMap(rooms = FALLBACK_ATTENDANCE_ROOMS) {
  const map = new Map();
  for (const r of rooms) {
    const m = r.name.match(/No\.?\s*(\d+)/i);
    if (m) map.set(Number(m[1]), r.id);
  }
  return map;
}

/**
 * @param {string|number} physicalNum e.g. 2 for Room No. 2
 * @param {Array<{id:string,name:string}>} [rooms]
 * @returns {string|null} Firestore room id or null if unknown
 */
export function roomIdForPhysicalClassNumber(physicalNum, rooms = FALLBACK_ATTENDANCE_ROOMS) {
  const n = Number(String(physicalNum).trim());
  if (!Number.isFinite(n)) return null;
  return buildPhysicalNumberToRoomIdMap(rooms).get(n) ?? null;
}
