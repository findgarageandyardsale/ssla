import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { InputField, SelectField } from "../../components/atoms";
import { initialStudents, initialRooms } from "../../data/attendanceDummyData";

const PAGE_SIZES = [10, 20, 50];
const generateId = () => `s${Date.now()}`;

const roomOptions = initialRooms.map((r) => ({ value: r.id, label: r.name }));
const roomOptionsWithNone = [
  { value: "", label: "None" },
  ...roomOptions,
];

export const StudentsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [students, setStudents] = useState(initialStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

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
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          (s.number && s.number.toLowerCase().includes(search)) ||
          (s.email && s.email.toLowerCase().includes(search))
      );
    }
    if (roomFilter) {
      list = list.filter((s) => s.roomIds && s.roomIds.includes(roomFilter));
    }
    const parentSearchLower = parentSearch.trim().toLowerCase();
    if (parentSearchLower) {
      list = list.filter(
        (s) =>
          (s.parentName && s.parentName.toLowerCase().includes(parentSearchLower)) ||
          (s.parentEmail && s.parentEmail.toLowerCase().includes(parentSearchLower)) ||
          (s.parentPhone && s.parentPhone.includes(parentSearch))
      );
    }
    return list;
  }, [students, searchText, roomFilter, parentSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page, pageSize]);

  const openAdd = () => {
    setEditingStudent(null);
    reset({
      name: "",
      number: "",
      email: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      room1: "",
      room2: "",
    });
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    reset({
      name: student.name,
      number: student.number,
      email: student.email || "",
      parentName: student.parentName,
      parentEmail: student.parentEmail || "",
      parentPhone: student.parentPhone,
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
    navigate(`/attendance/students/${student.id}`, { state: { students } });
  };

  const onSubmit = (data) => {
    const roomIds = [data.room1].filter(Boolean);
    if (data.room2) roomIds.push(data.room2);
    const payload = {
      name: data.name,
      number: data.number,
      email: data.email || "",
      parentName: data.parentName,
      parentEmail: data.parentEmail || "",
      parentPhone: data.parentPhone,
      roomIds,
    };
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id ? { ...editingStudent, ...payload } : s
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,
        {
          id: generateId(),
          ...payload,
        },
      ]);
    }
    closeModal();
  };

  const onDelete = (student) => {
    if (!window.confirm(`Delete student "${student.name}"?`)) return;
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  const getRoomNames = (roomIds) => {
    if (!roomIds?.length) return "—";
    return roomIds
      .map((id) => initialRooms.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "—";
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-brand-text-color">Students</h2>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-[#E84B23] text-white px-4 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

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
              placeholder="Name, number, or email..."
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
            <label className="block text-xs font-semibold text-gray-600 mb-1">Search parent</label>
            <input
              type="text"
              value={parentSearch}
              onChange={(e) => {
                setParentSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Parent name, email, or phone..."
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
                Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Parent / Guardian
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Parent phone
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
            {paginatedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => goToDetail(student)}
                    className="text-sm font-medium text-[#E84B23] hover:underline text-left"
                  >
                    {student.name}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {student.number}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  <div>
                    <span className="font-medium text-brand-text-color">{student.parentName || "—"}</span>
                    {student.parentEmail && (
                      <div className="text-xs text-gray-500">{student.parentEmail}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {student.parentPhone || "—"}
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
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
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <InputField
                label="Student name"
                required
                placeholder="Full name"
                error={errors.name}
                {...register("name", { required: "Student name is required" })}
              />
              <InputField
                label="Number"
                required
                placeholder="e.g. S001"
                error={errors.number}
                {...register("number", { required: "Number is required" })}
              />
              <InputField
                label="Email (optional)"
                type="email"
                placeholder="student@example.com"
                {...register("email")}
              />
              <InputField
                label="Parent name"
                required
                placeholder="Full name"
                error={errors.parentName}
                {...register("parentName", {
                  required: "Parent name is required",
                })}
              />
              <InputField
                label="Parent email (optional)"
                type="email"
                placeholder="parent@example.com"
                {...register("parentEmail")}
              />
              <InputField
                label="Parent phone number"
                required
                placeholder="555-0100"
                error={errors.parentPhone}
                {...register("parentPhone", {
                  required: "Parent phone number is required",
                })}
              />
              <SelectField
                label="Room 1"
                required
                options={roomOptions}
                error={errors.room1}
                {...register("room1", { required: "Room 1 is required" })}
              />
              <SelectField
                label="Room 2 (optional)"
                options={roomOptionsWithNone}
                {...register("room2")}
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E84B23] text-white rounded-lg hover:bg-[#d13d1a] font-medium"
                >
                  {editingStudent ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
