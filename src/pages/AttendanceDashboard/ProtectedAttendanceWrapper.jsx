import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { subscribeAttendanceAuth } from "../../services/attendanceAuthService";
import { AttendanceDashboardLayout } from "./AttendanceDashboardLayout";

export const ProtectedAttendanceWrapper = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => subscribeAttendanceAuth((u) => setUser(u ?? null)), []);

  if (user === undefined) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-brand-light-text-color text-sm">
        Checking session…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/attendance/login" replace />;
  }

  return <AttendanceDashboardLayout />;
};
