import { useState, useMemo } from "react";
import { initialStudents, initialRooms, initialAttendanceRecords } from "../../data/attendanceDummyData";

const CONSECUTIVE_DAYS_INACTIVE = 4;
const MAX_DAYS_IN_RANGE = 31;

function getDateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function getDatesInRange(from, to) {
  const fromD = new Date(from);
  const toD = new Date(to);
  if (fromD > toD) return [];
  const out = [];
  const cur = new Date(fromD);
  while (cur <= toD && out.length < MAX_DAYS_IN_RANGE) {
    out.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

const VIEW_MODE_ALL = "all";
const VIEW_MODE_ACTIVE = "active";
const VIEW_MODE_INACTIVE = "inactive";

export const AttendanceView = () => {
  const today = getDateStr(0);
  const [fromDate, setFromDate] = useState(getDateStr(6));
  const [toDate, setToDate] = useState(today);
  const [roomFilter, setRoomFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODE_ALL); // 'all' | 'active' | 'inactive'

  const recordsByStudentAndDate = useMemo(() => {
    const map = {};
    initialAttendanceRecords.forEach((r) => {
      if (!map[r.studentId]) map[r.studentId] = {};
      map[r.studentId][r.date] = r.status;
    });
    return map;
  }, []);

  const datesInRange = useMemo(
    () => getDatesInRange(fromDate, toDate),
    [fromDate, toDate]
  );

  const filteredStudents = useMemo(() => {
    let list = [...initialStudents];
    const search = searchText.trim().toLowerCase();
    if (search) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          (s.number && s.number.toLowerCase().includes(search))
      );
    }
    if (roomFilter) {
      list = list.filter((s) => s.roomIds && s.roomIds.includes(roomFilter));
    }
    return list;
  }, [searchText, roomFilter]);

  const getStatusForDate = (studentId, date) => {
    return recordsByStudentAndDate[studentId]?.[date] ?? null;
  };

  // Inactive = no present in 4 consecutive days ending at toDate
  const inactiveStudentIds = useMemo(() => {
    const inactive = [];
    const dates = [];
    for (let i = 0; i < CONSECUTIVE_DAYS_INACTIVE; i++) {
      const d = new Date(toDate);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().slice(0, 10));
    }
    initialStudents.forEach((s) => {
      const allAbsentOrMissing = dates.every((date) => {
        const status = recordsByStudentAndDate[s.id]?.[date];
        return status !== "present";
      });
      if (allAbsentOrMissing) inactive.push(s.id);
    });
    return inactive;
  }, [toDate, recordsByStudentAndDate]);

  const inactiveStudents = useMemo(
    () => initialStudents.filter((s) => inactiveStudentIds.includes(s.id)),
    [inactiveStudentIds]
  );

  const activeFilteredStudents = useMemo(
    () => filteredStudents.filter((s) => !inactiveStudentIds.includes(s.id)),
    [filteredStudents, inactiveStudentIds]
  );

  const inactiveFilteredStudents = useMemo(
    () => filteredStudents.filter((s) => inactiveStudentIds.includes(s.id)),
    [filteredStudents, inactiveStudentIds]
  );

  const studentsToShowInTable = useMemo(() => {
    if (viewMode === VIEW_MODE_ACTIVE) return activeFilteredStudents;
    if (viewMode === VIEW_MODE_INACTIVE) return inactiveFilteredStudents;
    return filteredStudents;
  }, [viewMode, filteredStudents, activeFilteredStudents, inactiveFilteredStudents]);

  const getRoomNames = (roomIds) => {
    if (!roomIds?.length) return "—";
    return roomIds
      .map((id) => initialRooms.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "—";
  };

  const roomOptions = initialRooms.map((r) => ({ value: r.id, label: r.name }));

  const statusBadge = (status) => {
    if (status === "present") return { label: "P", className: "bg-brand-success/15 text-brand-success" };
    if (status === "absent") return { label: "A", className: "bg-brand-error/15 text-brand-error" };
    return { label: "—", className: "bg-gray-100 text-gray-500" };
  };

  const showAttendanceTable = viewMode === VIEW_MODE_ALL || viewMode === VIEW_MODE_ACTIVE;
  const showInactiveSection = viewMode === VIEW_MODE_ALL || viewMode === VIEW_MODE_INACTIVE;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-brand-text-color">Attendance</h2>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">From date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">To date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Class / Room</label>
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23] bg-white"
            >
              <option value="">All classes</option>
              {roomOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Search</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Student name or number..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23]"
            />
          </div>
        </div>

        {/* Toggle: All | Active only | Inactive only */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="text-xs font-semibold text-gray-600">Show:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setViewMode(VIEW_MODE_ALL)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === VIEW_MODE_ALL
                  ? "bg-[#E84B23] text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setViewMode(VIEW_MODE_ACTIVE)}
              className={`px-4 py-2 text-sm font-medium border-l border-gray-200 transition-colors ${
                viewMode === VIEW_MODE_ACTIVE
                  ? "bg-brand-success text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Active only
            </button>
            <button
              type="button"
              onClick={() => setViewMode(VIEW_MODE_INACTIVE)}
              className={`px-4 py-2 text-sm font-medium border-l border-gray-200 transition-colors ${
                viewMode === VIEW_MODE_INACTIVE
                  ? "bg-amber-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Inactive only
            </button>
          </div>
          <span className="text-sm text-gray-600">
            {viewMode === VIEW_MODE_ALL && `${filteredStudents.length} student(s)`}
            {viewMode === VIEW_MODE_ACTIVE && `${activeFilteredStudents.length} active`}
            {viewMode === VIEW_MODE_INACTIVE && `${inactiveFilteredStudents.length} inactive`}
          </span>
        </div>

        {datesInRange.length >= MAX_DAYS_IN_RANGE && (
          <p className="text-xs text-amber-700">
            Date range is capped at {MAX_DAYS_IN_RANGE} days for display.
          </p>
        )}
      </div>

      {/* Attendance table for date range */}
      {showAttendanceTable && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 min-w-max">
            <h3 className="text-sm font-semibold text-brand-text-color">
              Attendance from {fromDate} to {toDate}
              {viewMode === VIEW_MODE_ACTIVE && " (active students only)"}
            </h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-[var(--tw)] bg-gray-50">Number</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                {datesInRange.map((date) => (
                  <th key={date} className="px-2 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap" title={date}>
                    {new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentsToShowInTable.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-brand-text-color whitespace-nowrap sticky left-0 bg-white z-10">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-brand-light-text-color whitespace-nowrap">{student.number}</td>
                  <td className="px-4 py-3 text-sm text-brand-light-text-color whitespace-nowrap">{getRoomNames(student.roomIds)}</td>
                  {datesInRange.map((date) => {
                    const status = getStatusForDate(student.id, date);
                    const { label, className } = statusBadge(status);
                    return (
                      <td key={date} className="px-2 py-2 text-center">
                        <span className={`inline-block w-6 h-6 leading-6 rounded text-xs font-medium ${className}`} title={`${date}: ${status || "no record"}`}>
                          {label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {studentsToShowInTable.length === 0 && (
            <div className="px-4 py-8 text-center text-brand-light-text-color text-sm">
              No students to show.
            </div>
          )}
        </div>
      )}

      {/* Inactive: no attendance for 4+ consecutive days */}
      {showInactiveSection && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-amber-50">
            <h3 className="text-sm font-semibold text-amber-800">
              Inactive — no attendance for {CONSECUTIVE_DAYS_INACTIVE}+ consecutive days (as of {toDate})
            </h3>
            <p className="text-xs text-amber-700 mt-1">
              Students who have not been marked present in the last {CONSECUTIVE_DAYS_INACTIVE} days.
            </p>
          </div>
          {inactiveFilteredStudents.length === 0 ? (
            <div className="px-4 py-6 text-center text-brand-light-text-color text-sm">
              No inactive students.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Parent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inactiveFilteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-brand-text-color">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-brand-light-text-color">{student.number}</td>
                    <td className="px-4 py-3 text-sm text-brand-light-text-color">{getRoomNames(student.roomIds)}</td>
                    <td className="px-4 py-3 text-sm text-brand-light-text-color">{student.parentName || "—"} {student.parentPhone && ` · ${student.parentPhone}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
