import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { getStudentDisplayName } from "../../utils/studentDisplayName";
import { fetchStudentById, fetchRooms } from "../../services/attendanceFirestoreService";

export const StudentDetailPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const [roomsRes, stRes] = await Promise.all([fetchRooms(), fetchStudentById(studentId)]);
      if (cancelled) return;
      if (roomsRes.success) setRooms(roomsRes.data);
      if (!stRes.success) {
        setError(stRes.error || "Could not load student");
        setStudent(null);
      } else if (!stRes.data) {
        setError(null);
        setStudent(null);
      } else {
        setStudent(stRes.data);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const getRoomNames = (roomIds) => {
    if (!roomIds?.length) return "—";
    return (
      roomIds
        .map((id) => rooms.find((r) => r.id === id)?.name)
        .filter(Boolean)
        .join(", ") || "—"
    );
  };

  if (loading) {
    return (
      <div className="py-8">
        <button
          type="button"
          onClick={() => navigate("/attendance/students")}
          className="inline-flex items-center gap-2 text-brand-text-color hover:text-[#E84B23] font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </button>
        <p className="text-brand-light-text-color">Loading student…</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="py-8">
        <button
          type="button"
          onClick={() => navigate("/attendance/students")}
          className="inline-flex items-center gap-2 text-brand-text-color hover:text-[#E84B23] font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </button>
        <p className="text-brand-light-text-color">{error || "Student not found."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("/attendance/students")}
        className="inline-flex items-center gap-2 text-brand-text-color hover:text-[#E84B23] font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </button>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand-text-color">{getStudentDisplayName(student)}</h2>
          <button
            type="button"
            onClick={() =>
              navigate("/attendance/students", { state: { openEditId: student.id } })
            }
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E84B23] text-[#E84B23] rounded-lg hover:bg-[#E84B23] hover:text-white transition-colors font-medium"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Name & contact</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><dt className="text-xs font-medium text-gray-500">First Name</dt><dd className="text-brand-text-color">{student.firstName || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Middle Name</dt><dd className="text-brand-text-color">{student.middleName || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Last Name</dt><dd className="text-brand-text-color">{student.lastName || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Date of birth</dt><dd className="text-brand-light-text-color">{student.dateOfBirth || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Email</dt><dd className="text-brand-light-text-color">{student.email || "—"}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs font-medium text-gray-500">Room(s)</dt><dd className="text-brand-light-text-color">{getRoomNames(student.roomIds)}</dd></div>
            </dl>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Parents</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><dt className="text-xs font-medium text-gray-500">Fathers Name</dt><dd className="text-brand-text-color">{student.fathersName || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Mothers Name</dt><dd className="text-brand-text-color">{student.mothersName || "—"}</dd></div>
            </dl>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Address</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><dt className="text-xs font-medium text-gray-500">Address</dt><dd className="text-brand-text-color">{student.address || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">City</dt><dd className="text-brand-light-text-color">{student.city || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">State</dt><dd className="text-brand-light-text-color">{student.state || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">ZIP</dt><dd className="text-brand-light-text-color">{student.zip || "—"}</dd></div>
            </dl>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Phones</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div><dt className="text-xs font-medium text-gray-500">Home Phone</dt><dd className="text-brand-light-text-color">{student.homePhone || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Cell 1</dt><dd className="text-brand-light-text-color">{student.cell1 || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Cell 2</dt><dd className="text-brand-light-text-color">{student.cell2 || "—"}</dd></div>
              <div><dt className="text-xs font-medium text-gray-500">Emergency</dt><dd className="text-brand-light-text-color">{student.emergencyPhone || "—"}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};
