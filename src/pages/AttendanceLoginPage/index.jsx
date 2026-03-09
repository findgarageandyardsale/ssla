import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/atoms";
import { useState } from "react";

const ATTENDANCE_AUTH_KEY = "attendance_super_admin";

export const AttendanceLoginPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setSubmitError("");
    // Mock auth: any non-empty email/password is accepted
    localStorage.setItem(ATTENDANCE_AUTH_KEY, "true");
    navigate("/attendance", { replace: true });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-brand-text-color mb-2">
          Attendance Dashboard
        </h1>
        <p className="text-brand-light-text-color text-sm mb-6">
          Super admin login (mock – any credentials work)
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            required
            placeholder="admin@school.com"
            error={errors.email}
            {...register("email", { required: "Email is required" })}
          />
          <InputField
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            error={errors.password}
            {...register("password", { required: "Password is required" })}
          />
          {submitError && (
            <p className="text-sm text-brand-error">{submitError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#E84B23] text-white px-6 py-3 rounded-lg hover:bg-[#d13d1a] transition-colors duration-200 font-semibold"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
