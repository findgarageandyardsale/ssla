import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { InputField, TextAreaField, SelectField } from "../../components/atoms";
import { initialTeachers, initialRooms } from "../../data/attendanceDummyData";

const generateId = () => `t${Date.now()}`;

const roomOptions = initialRooms.map((r) => ({ value: r.id, label: r.name }));

export const TeachersView = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openAdd = () => {
    setEditingTeacher(null);
    setImagePreview(null);
    reset({
      name: "",
      information: "",
      emails: "",
      roomId: "",
      username: "",
      password: "",
    });
    setModalOpen(true);
  };

  const openEdit = (teacher) => {
    setEditingTeacher(teacher);
    setImagePreview(teacher.image || null);
    reset({
      name: teacher.name,
      information: teacher.information || "",
      emails: teacher.emails,
      roomId: teacher.roomId || "",
      username: teacher.username || "",
      password: teacher.password || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTeacher(null);
    setImagePreview(null);
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      information: data.information || "",
      emails: data.emails,
      roomId: data.roomId || null,
      username: data.username || "",
      password: data.password || "",
      image: imagePreview || editingTeacher?.image || null,
    };
    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingTeacher.id ? { ...editingTeacher, ...payload } : t
        )
      );
    } else {
      setTeachers((prev) => [
        ...prev,
        {
          id: generateId(),
          ...payload,
        },
      ]);
    }
    closeModal();
  };

  const onDelete = (teacher) => {
    if (!window.confirm(`Delete teacher "${teacher.name}"?`)) return;
    setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
  };

  const getRoomName = (roomId) =>
    initialRooms.find((r) => r.id === roomId)?.name ?? "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-brand-text-color">Teachers</h2>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-[#E84B23] text-white px-4 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email(s)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Room
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm font-medium text-brand-text-color">
                  {teacher.name}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {teacher.emails || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {getRoomName(teacher.roomId)}
                </td>
                <td className="px-4 py-3">
                  {teacher.image ? (
                    <img
                      src={teacher.image}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(teacher)}
                      className="p-2 text-gray-600 hover:text-[#E84B23] hover:bg-brand-light-orange/30 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(teacher)}
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-brand-text-color">
                {editingTeacher ? "Edit Teacher" : "Add Teacher"}
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
                label="Teacher name"
                required
                placeholder="Full name"
                error={errors.name}
                {...register("name", { required: "Teacher name is required" })}
              />
              <TextAreaField
                label="Information"
                placeholder="Optional info"
                rows={2}
                {...register("information")}
              />
              <InputField
                label="Emails"
                required
                placeholder="email@example.com or comma-separated"
                error={errors.emails}
                {...register("emails", { required: "Emails are required" })}
              />
              <SelectField
                label="Room"
                required
                options={roomOptions}
                error={errors.roomId}
                {...register("roomId", { required: "Room is required" })}
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl text-sm"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                )}
              </div>
              <InputField
                label="Username (for app login)"
                placeholder="Username"
                {...register("username")}
              />
              <InputField
                label="Password (for app login)"
                type="password"
                placeholder="••••••••"
                {...register("password")}
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
                  {editingTeacher ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
