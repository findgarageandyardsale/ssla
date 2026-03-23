import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputField } from "../../components/atoms";
import {
  attendanceSignIn,
  mapAttendanceAuthError,
  subscribeAttendanceAuth,
} from "../../services/attendanceAuthService";
import { getFirebaseConfigurationHint, isFirebaseConfigured } from "../../config/firebase";

export const AttendanceLoginPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);
  const configHint = getFirebaseConfigurationHint();
  const firebaseReady = isFirebaseConfigured();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    return subscribeAttendanceAuth((user) => {
      if (user) navigate("/attendance", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setBusy(true);
    try {
      await attendanceSignIn(data.email, data.password);
      navigate("/attendance", { replace: true });
    } catch (e) {
      const code = e?.code || "";
      if (code === "app/no-firebase") {
        setSubmitError(e.message);
      } else {
        setSubmitError(mapAttendanceAuthError(code));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-brand-text-color mb-2">
          Attendance Dashboard
        </h1>
        <p className="text-brand-light-text-color text-sm mb-6">
          Sign in with the email and password from Firebase Authentication.
        </p>
        {!firebaseReady && configHint && (
          <div
            className="mb-4 p-3 rounded-lg bg-amber-50 text-amber-900 text-sm border border-amber-200"
            role="alert"
          >
            {configHint}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email}
            {...register("email", { required: "Email is required" })}
          />
          <InputField
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password}
            {...register("password", { required: "Password is required" })}
          />
          {submitError && (
            <p className="text-sm text-brand-error">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#E84B23] text-white px-6 py-3 rounded-lg hover:bg-[#d13d1a] transition-colors duration-200 font-semibold disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};
