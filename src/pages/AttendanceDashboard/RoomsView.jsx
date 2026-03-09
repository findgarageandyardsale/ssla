import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { InputField, TextAreaField } from "../../components/atoms";
import { initialRooms } from "../../data/attendanceDummyData";

const generateId = () => `r${Date.now()}`;

export const RoomsView = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openAdd = () => {
    setEditingRoom(null);
    reset({ name: "", description: "" });
    setModalOpen(true);
  };

  const openEdit = (room) => {
    setEditingRoom(room);
    reset({ name: room.name, description: room.description || "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingRoom(null);
  };

  const onSubmit = (data) => {
    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === editingRoom.id
            ? { ...r, name: data.name, description: data.description }
            : r
        )
      );
    } else {
      setRooms((prev) => [
        ...prev,
        {
          id: generateId(),
          name: data.name,
          description: data.description || "",
        },
      ]);
    }
    closeModal();
  };

  const onDelete = (room) => {
    if (!window.confirm(`Delete room "${room.name}"?`)) return;
    setRooms((prev) => prev.filter((r) => r.id !== room.id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-brand-text-color">Rooms</h2>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-[#E84B23] text-white px-4 py-2 rounded-lg hover:bg-[#d13d1a] transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Room
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
                Description
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm font-medium text-brand-text-color">
                  {room.name}
                </td>
                <td className="px-4 py-3 text-sm text-brand-light-text-color">
                  {room.description || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(room)}
                      className="p-2 text-gray-600 hover:text-[#E84B23] hover:bg-brand-light-orange/30 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(room)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-brand-text-color">
                {editingRoom ? "Edit Room" : "Add Room"}
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
                label="Name"
                required
                placeholder="Room name"
                error={errors.name}
                {...register("name", { required: "Name is required" })}
              />
              <TextAreaField
                label="Description"
                placeholder="Optional description"
                rows={3}
                {...register("description")}
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
                  {editingRoom ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
