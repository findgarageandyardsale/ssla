/**
 * Room/class list for the attendance dashboard and Firestore `attendance_rooms`.
 *
 * Edit in `.env`: `VITE_ATTENDANCE_ROOM_NAMES` (comma-separated).
 * Or seed from terminal: `npm run seed:attendance-rooms`
 * Document ids: r1, r2, r3, … in order. Restart dev server after `.env` edits.
 */

import { FALLBACK_ATTENDANCE_ROOMS, roomsFromCommaSeparatedNames } from "./attendanceRoomList.js";

function roomsFromEnv() {
  return roomsFromCommaSeparatedNames(import.meta.env.VITE_ATTENDANCE_ROOM_NAMES);
}

export const DEFAULT_ATTENDANCE_ROOMS = roomsFromEnv() ?? FALLBACK_ATTENDANCE_ROOMS;

/** Same list; used across the app and for Firestore seed */
export const initialRooms = DEFAULT_ATTENDANCE_ROOMS;
