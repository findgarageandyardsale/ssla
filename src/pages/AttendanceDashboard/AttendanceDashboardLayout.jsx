import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { attendanceSignOut } from "../../services/attendanceAuthService";

const navItems = [
  { to: "/attendance/rooms", label: "Rooms" },
  { to: "/attendance/teachers", label: "Teachers" },
  { to: "/attendance/students", label: "Students" },
  { to: "/attendance/attendance", label: "Attendance" },
];

export const AttendanceDashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await attendanceSignOut();
    navigate("/attendance/login", { replace: true });
  };

  return (
    <div className="min-h-[70vh]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4 pt-6 pb-2">
            <h1 className="text-xl font-semibold text-brand-text-color">
              Attendance Dashboard
            </h1>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E84B23] px-3 py-2 rounded-lg border border-gray-200 hover:border-[#E84B23]/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
          <nav className="flex gap-1 -mb-px" aria-label="Tabs">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                    isActive
                      ? "border-[#E84B23] text-[#E84B23] bg-brand-light-orange/30"
                      : "border-transparent text-brand-light-text-color hover:text-brand-text-color hover:border-gray-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </div>
    </div>
  );
};
