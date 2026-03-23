import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getStudentDisplayName } from "./studentDisplayName";

function getRoomNames(roomIds, rooms) {
  if (!roomIds?.length) return "—";
  return (
    roomIds
      .map((id) => rooms.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "—"
  );
}

/**
 * All exportable columns (order = default column order in PDF/CSV).
 * `getValue(student, rooms)` returns the cell string.
 */
export const STUDENT_EXPORT_COLUMNS = [
  { id: "studentId", label: "Student ID", getValue: (s) => s.id || "" },
  { id: "name", label: "Full name", getValue: (s) => getStudentDisplayName(s) },
  { id: "firstName", label: "First name", getValue: (s) => s.firstName || "" },
  { id: "middleName", label: "Middle name", getValue: (s) => s.middleName || "" },
  { id: "lastName", label: "Last name", getValue: (s) => s.lastName || "" },
  { id: "dateOfBirth", label: "DOB", getValue: (s) => s.dateOfBirth || "" },
  { id: "email", label: "Email", getValue: (s) => s.email || "" },
  { id: "fathersName", label: "Father's name", getValue: (s) => s.fathersName || "" },
  { id: "mothersName", label: "Mother's name", getValue: (s) => s.mothersName || "" },
  { id: "address", label: "Address", getValue: (s) => s.address || "" },
  { id: "city", label: "City", getValue: (s) => s.city || "" },
  { id: "state", label: "State", getValue: (s) => s.state || "" },
  { id: "zip", label: "ZIP", getValue: (s) => s.zip || "" },
  { id: "homePhone", label: "Home phone", getValue: (s) => s.homePhone || "" },
  { id: "cell1", label: "Cell 1", getValue: (s) => s.cell1 || "" },
  { id: "cell2", label: "Cell 2", getValue: (s) => s.cell2 || "" },
  { id: "emergencyPhone", label: "Emergency phone", getValue: (s) => s.emergencyPhone || "" },
  { id: "rooms", label: "Room(s)", getValue: (s, rooms) => getRoomNames(s.roomIds, rooms) },
];

export const DEFAULT_STUDENT_EXPORT_COLUMN_IDS = STUDENT_EXPORT_COLUMNS.map((c) => c.id);

/** Resolve selected column defs in canonical order */
export function getOrderedExportColumns(selectedColumnIds) {
  const set = new Set(selectedColumnIds);
  return STUDENT_EXPORT_COLUMNS.filter((c) => set.has(c.id));
}

export function exportStudentsToPdf(students, rooms, selectedColumnIds) {
  const cols = getOrderedExportColumns(
    selectedColumnIds?.length ? selectedColumnIds : DEFAULT_STUDENT_EXPORT_COLUMN_IDS
  );
  if (!cols.length) return false;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const title = "Students List";
  const generatedAt = new Date().toLocaleString();

  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${generatedAt} · ${students.length} student(s)`, 14, 22);

  const headers = cols.map((c) => c.label);
  const rows = students.map((s) => cols.map((c) => String(c.getValue(s, rooms) ?? "")));

  const fontSize = cols.length > 10 ? 5 : cols.length > 7 ? 6 : 7;

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 28,
    theme: "grid",
    headStyles: { fillColor: [232, 75, 35], fontSize: Math.min(8, fontSize + 1) },
    bodyStyles: { fontSize },
    margin: { left: 14 },
  });

  doc.save(`students-${new Date().toISOString().slice(0, 10)}.pdf`);
  return true;
}

function escapeCsvCell(value) {
  const s = String(value ?? "");
  if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function exportStudentsToCsv(students, rooms, selectedColumnIds) {
  const cols = getOrderedExportColumns(
    selectedColumnIds?.length ? selectedColumnIds : DEFAULT_STUDENT_EXPORT_COLUMN_IDS
  );
  if (!cols.length) return false;

  const headers = cols.map((c) => c.label);
  const headerRow = headers.map(escapeCsvCell).join(",");
  const dataRows = students.map((s) =>
    cols
      .map((c) => escapeCsvCell(c.getValue(s, rooms)))
      .join(",")
  );
  const csv = [headerRow, ...dataRows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `students-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}
