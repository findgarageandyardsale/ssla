import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Get room names string for a student's roomIds
 */
function getRoomNames(roomIds, rooms) {
  if (!roomIds?.length) return "—";
  return roomIds
    .map((id) => rooms.find((r) => r.id === id)?.name)
    .filter(Boolean)
    .join(", ") || "—";
}

/**
 * Export filtered students to PDF
 * @param {Array} students - list of student objects
 * @param {Array} rooms - list of room objects { id, name }
 */
export function exportStudentsToPdf(students, rooms) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const title = "Students List";
  const generatedAt = new Date().toLocaleString();

  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${generatedAt} · ${students.length} student(s)`, 14, 22);

  const headers = ["Name", "Number", "Email", "Parent Name", "Parent Email", "Parent Phone", "Room(s)"];
  const rows = students.map((s) => [
    s.name || "",
    s.number || "",
    s.email || "",
    s.parentName || "",
    s.parentEmail || "",
    s.parentPhone || "",
    getRoomNames(s.roomIds, rooms),
  ]);

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 28,
    theme: "grid",
    headStyles: { fillColor: [232, 75, 35], fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 18 },
      2: { cellWidth: 40 },
      3: { cellWidth: 35 },
      4: { cellWidth: 40 },
      5: { cellWidth: 28 },
      6: { cellWidth: 35 },
    },
    margin: { left: 14 },
  });

  doc.save(`students-${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Escape a cell for CSV (wrap in quotes if contains comma, newline, or quote)
 */
function escapeCsvCell(value) {
  const s = String(value ?? "");
  if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/**
 * Export filtered students to CSV (opens in Excel)
 * @param {Array} students - list of student objects
 * @param {Array} rooms - list of room objects { id, name }
 */
export function exportStudentsToCsv(students, rooms) {
  const headers = ["Name", "Number", "Email", "Parent Name", "Parent Email", "Parent Phone", "Room(s)"];
  const headerRow = headers.map(escapeCsvCell).join(",");
  const dataRows = students.map((s) =>
    [
      s.name,
      s.number,
      s.email,
      s.parentName,
      s.parentEmail,
      s.parentPhone,
      getRoomNames(s.roomIds, rooms),
    ]
      .map(escapeCsvCell)
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
}
