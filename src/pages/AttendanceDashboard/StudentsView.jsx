import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, Eye, FileDown } from "lucide-react";
import { InputField, SelectField } from "../../components/atoms";
import { getStudentDisplayName } from "../../utils/studentDisplayName";
import {
  exportStudentsToPdf,
  exportStudentsToCsv,
  STUDENT_EXPORT_COLUMNS,
  DEFAULT_STUDENT_EXPORT_COLUMN_IDS,
  getOrderedExportColumns,
} from "../../utils/studentExport";
import { fetchRooms, fetchStudents, setStudent, deleteStudent } from "../../services/attendanceFirestoreService";

const PAGE_SIZES = [10, 20, 50];
const generateId = () => `s${Date.now()}`;

export const StudentsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedExportColumnIds, setSelectedExportColumnIds] = useState(() => [
    ...DEFAULT_STUDENT_EXPORT_COLUMN_IDS,
  ]);

  const roomOptions = useMemo(() => rooms.map((r) => ({ value: r.id, label: r.name })), [rooms]);
  const roomOptionsWithNone = useMemo(
    () => [{ value: "", label: "None" }, ...roomOptions],
    [roomOptions]
  );

  const load = async () => {
    setLoading(true);
    setError(null);
    const [roomsRes, studentsRes] = await Promise.all([fetchRooms(), fetchStudents()]);
    if (roomsRes.success) setRooms(roomsRes.data);
    if (studentsRes.success) setStudents(studentsRes.data);
    let err = null;
    if (!roomsRes.success && roomsRes.error) err = roomsRes.error;
    if (!studentsRes.success && studentsRes.error) err = err || studentsRes.error;
    setError(err);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [parentSearch, setParentSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const filteredStudents = useMemo(() => {
    let list = [...students];
    const search = searchText.trim().toLowerCase();
    if (search) {
      list = list.filter((s) => {
        const name = getStudentDisplayName(s).toLowerCase();
        const email = (s.email || "").toLowerCase();
        return name.includes(search) || email.includes(search) ||
          (s.firstName && s.firstName.toLowerCase().includes(search)) ||
          (s.lastName && s.lastName.toLowerCase().includes(search));
      });
    }
    if (roomFilter) {
      list = list.filter((s) => s.roomIds && s.roomIds.includes(roomFilter));
    }
    const parentSearchLower = parentSearch.trim().toLowerCase();
    if (parentSearchLower) {
      list = list.filter(
        (s) =>
          (s.fathersName && s.fathersName.toLowerCase().includes(parentSearchLower)) ||
          (s.mothersName && s.mothersName.toLowerCase().includes(parentSearchLower)) ||
          (s.homePhone && s.homePhone.includes(parentSearch)) ||
          (s.cell1 && s.cell1.includes(parentSearch)) ||
          (s.cell2 && s.cell2.includes(parentSearch))
      );
    }
    return list;
  }, [students, searchText, roomFilter, parentSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page, pageSize]);

  const defaultStudentForm = {
    firstName: "", middleName: "", lastName: "",
    dateOfBirth: "", fathersName: "", mothersName: "",
    address: "", city: "", state: "", zip: "",
    homePhone: "", cell1: "", cell2: "", email: "",
    emergencyPhone: "",
    room1: "", room2: "",
  };

  const openAdd = () => {
    setEditingStudent(null);
    reset(defaultStudentForm);
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    reset({
      firstName: student.firstName ?? "",
      middleName: student.middleName ?? "",
      lastName: student.lastName ?? "",
      dateOfBirth: student.dateOfBirth ?? "",
      fathersName: student.fathersName ?? "",
      mothersName: student.mothersName ?? "",
      address: student.address ?? "",
      city: student.city ?? "",
      state: student.state ?? "",
      zip: student.zip ?? "",
      homePhone: student.homePhone ?? "",
      cell1: student.cell1 ?? "",
      cell2: student.cell2 ?? "",
      email: student.email ?? "",
      emergencyPhone: student.emergencyPhone ?? "",
      room1: student.roomIds?.[0] || "",
      room2: student.roomIds?.[1] || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingStudent(null);
  };

  const goToDetail = (student) => {
    navigate(`/attendance/students/${student.id}`);
  };

  const onSubmit = async (data) => {
    const roomIds = [data.room1].filter(Boolean);
    if (data.room2) roomIds.push(data.room2);
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName || "",
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth || "",
      fathersName: data.fathersName || "",
      mothersName: data.mothersName || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zip: data.zip || "",
      homePhone: data.homePhone || "",
      cell1: data.cell1 || "",
      cell2: data.cell2 || "",
      email: data.email || "",
      emergencyPhone: data.emergencyPhone || "",
      roomIds,
    };
    if (editingStudent) {
      const res = await setStudent(editingStudent.id, payload);
      if (res.success) {
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? { ...editingStudent, ...payload } : s))
        );
        closeModal();
      } else setError(res.error);
    } else {
      const id = generateId();
      const res = await setStudent(id, payload);
      if (res.success) {
        setStudents((prev) => [...prev, { id, ...payload }]);
        closeModal();
      } else setError(res.error);
    }
  };

  const onDelete = async (student) => {
    if (!window.confirm(`Delete student "${getStudentDisplayName(student)}"?`)) return;
    const res = await deleteStudent(student.id);
    if (res.success) setStudents((prev) => prev.filter((s) => s.id !== student.id));
    else setError(res.error);
  };

  const getRoomNames = (roomIds) => {
    if (!roomIds?.length) return "—";
    return roomIds
      .map((id) => rooms.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "—";
  };

  const toggleExportColumn = (id) => {
    setSelectedExportColumnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllExportColumns = () =>
    setSelectedExportColumnIds([...DEFAULT_STUDENT_EXPORT_COLUMN_IDS]);
  const clearExportColumns = () => setSelectedExportColumnIds([]);

  const handleExportPdf = () => {
    if (!getOrderedExportColumns(selectedExportColumnIds).length) {
      window.alert("Select at least one column to export.");
      return;
    }
    exportStudentsToPdf(filteredStudents, rooms, selectedExportColumnIds);
    setExportModalOpen(false);
  };

  const handleExportCsv = () => {
    if (!getOrderedExportColumns(selectedExportColumnIds).length) {
      window.alert("Select at least one column to export.");
      return;
    }
    exportStudentsToCsv(filteredStudents, rooms, selectedExportColumnIds);
    setExportModalOpen(false);
  };

  // Open edit modal when returning from detail page with openEditId
  useEffect(() => {
    const openEditId = location.state?.openEditId;
    if (openEditId) {
      const student = students.find((s) => s.id === openEditId);
      if (student) openEdit(student);
      navigate("/attendance/students", { replace: true, state: {} });
    }
  }, [location.state?.openEditId]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-brand-text-color">Students</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <FileDown className="w-4 h-4" />
            Export PDF / Excel
          </button>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-[#E84B23] text-white px-4 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
      )}
      {loading ? (
        <div className="py-8 text-center text-brand-light-text-color">Loading students...</div>
      ) : (
      <>
      {/* Filters */}
      <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Search student</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              placeholder="Name or email..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Room</label>
            <select
              value={roomFilter}
              onChange={(e) => {
                setRoomFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23] bg-white"
            >
              <option value="">All rooms</option>
              {roomOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Search parent / phone</label>
            <input
              type="text"
              value={parentSearch}
              onChange={(e) => {
                setParentSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Father, mother, or phone..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E84B23]/30 focus:border-[#E84B23]"
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{filteredStudents.length} student(s) found</span>
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="px-2 py-1 border border-gray-200 rounded text-sm bg-white"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span>per page</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Father / Mother
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Room(s)
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStudents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-brand-light-text-color">
                  {students.length === 0
                    ? "No students yet. Add students with the button above."
                    : "No students match your filters."}
                </td>
              </tr>
            )}
            {paginatedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => goToDetail(student)}
                    className="text-sm font-medium text-[#E84B23] hover:underline text-left"
                  >
                    {getStudentDisplayName(student)}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {student.email || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  <div>
                    {student.fathersName && <span className="block">{student.fathersName}</span>}
                    {student.mothersName && <span className="block text-gray-600">{student.mothersName}</span>}
                    {!student.fathersName && !student.mothersName && "—"}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {[student.homePhone, student.cell1, student.cell2].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {getRoomNames(student.roomIds)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => goToDetail(student)}
                      className="p-2 text-gray-600 hover:text-[#E84B23] hover:bg-brand-light-orange/30 rounded-lg transition-colors"
                      aria-label="View detail"
                      title="View detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(student)}
                      className="p-2 text-gray-600 hover:text-[#E84B23] hover:bg-brand-light-orange/30 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(student)}
                      className="p-2 text-gray-600 hover:text-brand-error hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-brand-light-text-color">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      </>
      )}
      {exportModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
              <div>
                <h3 className="text-lg font-semibold text-brand-text-color">Export students</h3>
                <p className="text-xs text-brand-light-text-color mt-1">
                  Choose columns, then download PDF or Excel (CSV). Uses the same filtered list as the table (
                  {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 flex gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={selectAllExportColumns}
                className="text-xs font-medium text-[#E84B23] hover:underline"
              >
                Select all
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={clearExportColumns}
                className="text-xs font-medium text-gray-600 hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="px-6 pb-4 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {STUDENT_EXPORT_COLUMNS.map((col) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-2 text-sm text-brand-text-color cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExportColumnIds.includes(col.id)}
                      onChange={() => toggleExportColumn(col.id)}
                      className="rounded border-gray-300 text-[#E84B23] focus:ring-[#E84B23]"
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExportPdf}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium text-sm"
              >
                <FileDown className="w-4 h-4" />
                Download PDF
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#217346] text-white rounded-lg hover:bg-[#1a5c38] font-medium text-sm"
              >
                <FileDown className="w-4 h-4" />
                Download Excel (CSV)
              </button>
            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-lg font-semibold text-brand-text-color">
                {editingStudent ? "Edit Student" : "Add Student"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <InputField label="First Name" required placeholder="First" error={errors.firstName} {...register("firstName", { required: "First name is required" })} />
                <InputField label="Middle Name" placeholder="Middle" {...register("middleName")} />
                <InputField label="Last Name" required placeholder="Last" error={errors.lastName} {...register("lastName", { required: "Last name is required" })} />
              </div>
              <InputField label="Date of birth" type="date" {...register("dateOfBirth")} className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <InputField label="Fathers Name" placeholder="Full name" {...register("fathersName")} />
                <InputField label="Mothers Name" placeholder="Full name" {...register("mothersName")} />
              </div>
              <InputField label="Address" placeholder="Street address" {...register("address")} className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <InputField label="City" placeholder="City" {...register("city")} />
                <InputField label="State" placeholder="State" {...register("state")} />
                <InputField label="ZIP" placeholder="ZIP" {...register("zip")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <InputField label="Home Phone" placeholder="555-0000" {...register("homePhone")} />
                <InputField label="Cell 1" placeholder="555-0000" {...register("cell1")} />
                <InputField label="Cell 2" placeholder="555-0000" {...register("cell2")} />
              </div>
              <InputField label="Email" type="email" placeholder="student@example.com" {...register("email")} className="mb-4" />
              <InputField label="Emergency phone" placeholder="Optional" {...register("emergencyPhone")} className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Room 1" required options={roomOptions} error={errors.room1} {...register("room1", { required: "Room 1 is required" })} />
                <SelectField label="Room 2 (optional)" options={roomOptionsWithNone} {...register("room2")} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#E84B23] text-white rounded-lg hover:bg-[#d13d1a] font-medium">{editingStudent ? "Save" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
