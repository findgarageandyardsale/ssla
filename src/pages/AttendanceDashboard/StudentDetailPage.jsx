import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { initialStudents, initialRooms } from "../../data/attendanceDummyData";

export const StudentDetailPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const students = location.state?.students ?? initialStudents;
  const student = students.find((s) => s.id === studentId);

  const getRoomNames = (roomIds) => {
    if (!roomIds?.length) return "—";
    return roomIds
      .map((id) => initialRooms.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "—";
  };

  if (!student) {
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
        <p className="text-brand-light-text-color">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("/attendance/students", { state: { students } })}
        className="inline-flex items-center gap-2 text-brand-text-color hover:text-[#E84B23] font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </button>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand-text-color">{student.name}</h2>
          <button
            type="button"
            onClick={() => navigate("/attendance/students", { state: { students, openEditId: student.id } })}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E84B23] text-[#E84B23] rounded-lg hover:bg-[#E84B23] hover:text-white transition-colors font-medium"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Student details
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <dt className="text-xs font-medium text-gray-500">Number</dt>
                <dd className="text-brand-text-color font-medium">{student.number}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">Email</dt>
                <dd className="text-brand-light-text-color">{student.email || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-gray-500">Room(s)</dt>
                <dd className="text-brand-light-text-color">{getRoomNames(student.roomIds)}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Parent / Guardian
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <dt className="text-xs font-medium text-gray-500">Name</dt>
                <dd className="text-brand-text-color font-medium">{student.parentName || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">Email</dt>
                <dd className="text-brand-light-text-color">{student.parentEmail || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500">Phone</dt>
                <dd className="text-brand-light-text-color">{student.parentPhone || "—"}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};
