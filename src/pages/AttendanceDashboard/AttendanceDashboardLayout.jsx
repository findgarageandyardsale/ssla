import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/attendance/rooms", label: "Rooms" },
  { to: "/attendance/teachers", label: "Teachers" },
  { to: "/attendance/students", label: "Students" },
  { to: "/attendance/attendance", label: "Attendance" },
];

export const AttendanceDashboardLayout = () => {
  return (
    <div className="min-h-[70vh]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-brand-text-color pt-6 pb-2">
            Attendance Dashboard
          </h1>
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
