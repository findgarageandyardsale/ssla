/**
 * SSLA teacher roster (Firestore `attendance_teachers`).
 * Seeded via `npm run seed:attendance-teachers`.
 */
export const ATTENDANCE_TEACHERS_COLLECTION = "attendance_teachers";

/** @typedef {{ name: string, phone: string, email: string | null }} TeacherRosterRow */

/** @type {TeacherRosterRow[]} */
export const SSLA_TEACHERS_ROSTER = [
  { name: "Aman Ahdi", phone: "818-298-9233", email: "aman_ahdi@yahoo.co.in" },
  { name: "Angad Singh", phone: "818-606-2160", email: "angadz@yahoo.com" },
  { name: "Gurdeep Singh", phone: "818-625-6587", email: "gurdeep.singh52@gmail.com" },
  { name: "Harpreet Kaur Mander", phone: "818-448-1428", email: "hrprt818@gmail.com" },
  { name: "Inderjeet Singh Gawra", phone: "818-635-2087", email: null },
  { name: "Jasmine Gawra", phone: "818-635-2096", email: "jasminegawra@gmail.com" },
  { name: "Jasprit Kaur Bal", phone: "805-754-0395", email: null },
  { name: "Kavleen K. Chhabra", phone: "567-209-1967", email: null },
  { name: "Kulvir S. Chhabra", phone: "567-209-1967", email: null },
  { name: "Manpreet Kaur", phone: "408-813-5702", email: "kaur09@hotmail.com" },
  { name: "Manpreet Makol", phone: "818-457-3221", email: "mpmakol@gmail.com" },
  { name: "Narinder Kaur", phone: "818-943-2342", email: "narinder.kor10@gmail.com" },
  { name: "Natasha Kaur Malik", phone: "630-267-3480", email: "natasha05@gmail.com" },
  { name: "Navjot Kaur Sekhon", phone: "559-375-3274", email: null },
  { name: "Paramjit Singh", phone: "818-480-8427", email: "psmakol@gmail.com" },
  { name: "Ramandeep Singh Dhanju", phone: "818-359-2345", email: null },
  { name: "Sandeep Kaur", phone: "818-858-2324", email: null },
  { name: "Satjeet Puri", phone: "310-776-0987", email: "satjeetpuri@hotmail.com" },
  { name: "Simardeep Singh Gawra", phone: "818-257-3080", email: "simardeepsgawra@gmail.com" },
  { name: "Simran Singh Dhanoa", phone: "805-990-9626", email: "65SimranSingh@gmail.com" },
  { name: "Surinder Singh", phone: "818-262-2848", email: "singhcpa@hotmail.com" },
  { name: "Gurpreet Kaur Sumel", phone: "805-304-8467", email: null },
  { name: "Jaspal Singh Gill", phone: "310-400-9522", email: null },
  { name: "Harpreet Kaur Singh", phone: "818-284-3307", email: "harpreetksingh00@gmail.com" },
  { name: "Hasinaraj Kaur", phone: "818-220-6888", email: null },
  { name: "Brijeshray Singh", phone: "747-203-2962", email: null },
  { name: "Sandeep Singh Sekhon", phone: "559-375-3276", email: null },
  { name: "Sapana Sood", phone: "818-808-5500", email: "sapanasood927@gmail.com" },
];

/**
 * Stable Firestore document id from roster row (re-running seed updates same docs).
 * @param {TeacherRosterRow} row
 */
export function rosterTeacherDocId(row) {
  const digits = String(row.phone).replace(/\D/g, "");
  const slug = row.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `roster-${slug}-${digits}`;
}

/**
 * Login email: real email when present; otherwise unique placeholder (replace after collecting real addresses).
 * @param {TeacherRosterRow} row
 */
export function rosterTeacherLoginEmail(row) {
  if (row.email && String(row.email).trim()) return String(row.email).trim();
  return `${rosterTeacherDocId(row)}@teachers-import.pending`;
}

/**
 * Firestore payload aligned with `attendanceFirestoreService` setTeacher.
 * @param {TeacherRosterRow} row
 */
export function rosterRowToTeacherPayload(row) {
  const phone = String(row.phone).trim();
  const loginEmail = rosterTeacherLoginEmail(row);
  return {
    name: row.name.trim(),
    information: `Phone: ${phone}`,
    email: loginEmail,
    image: null,
    roomId: null,
    password: "",
  };
}
