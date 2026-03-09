import { Navigate, Outlet } from "react-router-dom";
import { AttendanceDashboardLayout } from "./AttendanceDashboardLayout";

const ATTENDANCE_AUTH_KEY = "attendance_super_admin";

export const isAttendanceAuthenticated = () =>
  localStorage.getItem(ATTENDANCE_AUTH_KEY) === "true";

export const ProtectedAttendanceWrapper = () => {
  if (!isAttendanceAuthenticated()) {
    return <Navigate to="/attendance/login" replace />;
  }
  return <AttendanceDashboardLayout />;
};
