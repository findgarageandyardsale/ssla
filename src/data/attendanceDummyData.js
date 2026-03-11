// Dummy data for attendance dashboard (UI only – no Firebase)

export const initialRooms = [
  { id: "r1", name: "Room 101", description: "Main classroom for Punjabi Language" },
  { id: "r2", name: "Room 102", description: "Gurmat studies" },
  { id: "r3", name: "Room 103", description: "Keertan practice" },
];

const teacherTemplates = [
  { name: "Teacher One", info: "Senior instructor, 10+ years experience.", email: "teacher1@school.com", roomId: "r1", username: "teacher1" },
  { name: "Teacher Two", info: "Gurmat specialist.", email: "teacher2@school.com", roomId: "r2", username: "teacher2" },
  { name: "Kaur Singh", info: "Punjabi language and literature.", email: "kaur.singh@school.com", roomId: "r1", username: "kaursingh" },
  { name: "Rajinder Kaur", info: "Keertan and Gurbani Santhya.", email: "rajinder.kaur@school.com", roomId: "r3", username: "rajinder" },
  { name: "Harpreet Singh", info: "Gurmat studies, youth programs.", email: "harpreet@school.com", roomId: "r2", username: "harpreet" },
  { name: "Manjit Kaur", info: "Gurbani Santhya specialist.", email: "manjit.kaur@school.com", roomId: "r3", username: "manjit" },
  { name: "Gurinder Singh", info: "Punjabi and Gurmat.", email: "gurinder@school.com", roomId: "r1", username: "gurinder" },
  { name: "Baljit Kaur", info: "Keertan and vocal.", email: "baljit@school.com", roomId: "r3", username: "baljit" },
  { name: "Amarjit Singh", info: "Senior Gurmat instructor.", email: "amarjit@school.com", roomId: "r2", username: "amarjit" },
  { name: "Kulwinder Kaur", info: "Language and culture.", email: "kulwinder@school.com", roomId: "r1", username: "kulwinder" },
];

export const initialTeachers = teacherTemplates.map((t, i) => ({
  id: `t${i + 1}`,
  name: t.name,
  information: t.info,
  emails: t.email,
  image: null,
  roomId: t.roomId,
  username: t.username,
  password: "••••••••",
}));

// Generate 100 dummy students
const firstNames = [
  "Amar", "Simran", "Jasleen", "Gurpreet", "Harjot", "Manpreet", "Ravinder", "Kiran", "Sukhjit", "Navneet",
  "Gagan", "Prabh", "Harman", "Jaskaran", "Arshdeep", "Anmol", "Loveleen", "Rupinder", "Baldev", "Tejinder",
  "Jaswant", "Kuldeep", "Mandeep", "Paramjit", "Rajbir", "Sarabjit", "Taranjit", "Varinder", "Yadwinder", "Zorawar",
];
const lastNames = [
  "Singh", "Kaur", "Gill", "Dhillon", "Brar", "Mann", "Sidhu", "Bajwa", "Randhawa", "Grewal",
  "Sandhu", "Bhattal", "Chahal", "Deol", "Bedi", "Cheema", "Kang", "Pannu", "Toor", "Virk",
];
const parentFirstNames = [
  "Jasbir", "Kulwant", "Surinder", "Balwinder", "Gurdev", "Hardev", "Inderjit", "Jaswinder", "Kuljit", "Lakhwinder",
  "Malkit", "Narinder", "Parkash", "Ranjit", "Sukhwinder", "Tarlochan", "Ujagar", "Varinder", "Yadwinder", "Zora",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickMany(arr, n) {
  const out = [];
  const copy = [...arr];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

const studentList = [];
for (let i = 1; i <= 100; i++) {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const parentFirst = pick(parentFirstNames);
  const parentLast = pick(lastNames);
  const roomIds = i <= 33 ? ["r1"] : i <= 66 ? ["r2"] : i <= 85 ? ["r3"] : pickMany(["r1", "r2", "r3"], 1 + (i % 2));
  if (roomIds.length === 2 && roomIds[0] === roomIds[1]) roomIds.pop();
  studentList.push({
    id: `s${i}`,
    name: `${firstName} ${lastName}`,
    number: `S${String(i).padStart(3, "0")}`,
    email: i % 4 === 0 ? "" : `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    parentName: `${parentFirst} ${parentLast}`,
    parentEmail: i % 3 === 0 ? "" : `parent.${parentFirst.toLowerCase()}@example.com`,
    parentPhone: `555-${String(1000 + i).slice(-4)}`,
    roomIds: roomIds.length ? roomIds : ["r1"],
  });
}

export const initialStudents = studentList;

// Dummy attendance records: { studentId, date (YYYY-MM-DD), status: 'present' | 'absent' }
// Generate for last 7 days; some students have 4+ consecutive absences for "inactive" section
function getDateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

const attendanceRecords = [];
for (let daysAgo = 0; daysAgo < 7; daysAgo++) {
  const date = getDateStr(daysAgo);
  for (let i = 1; i <= 100; i++) {
    const studentId = `s${i}`;
    // ~70% present most days; students 80-95 have 4+ consecutive absences (inactive)
    const isInactivePool = i >= 80 && i <= 95;
    let status;
    if (isInactivePool && daysAgo < 5) {
      status = "absent";
    } else if (isInactivePool && daysAgo >= 5) {
      status = Math.random() > 0.3 ? "absent" : "present";
    } else {
      status = Math.random() > 0.25 ? "present" : "absent";
    }
    attendanceRecords.push({ studentId, date, status });
  }
}

export const initialAttendanceRecords = attendanceRecords;
