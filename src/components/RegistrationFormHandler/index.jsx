import { useState } from "react";
import { RegistrationForm } from "../../pages/RegistrationPage/RegistrationForm";
import { sendRegistrationEmail } from "../../services/emailService";
import { CheckCircle, AlertCircle } from "lucide-react";

export const RegistrationFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmit = async (formData) => {
    console.log("Form submission started");
    console.log("Form data:", formData);

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Starting email submission...");

      // Send registration email
      const result = await sendRegistrationEmail(formData);
      console.log("Email result:", result);

      setSubmitStatus({
        type: "success",
        message:
          "Registration submitted successfully! A confirmation email has been sent to your email address.",
      });

      console.log("Form submitted successfully");

      // Reset status after successful submission
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        Mail,
        TestTube,
      });

      setSubmitStatus({
        type: "error",
        message:
          "There was an error submitting your registration. Please check your information and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Form */}
      <RegistrationForm
        onSubmit={handleFormSubmit}
        submitStatus={submitStatus}
        isSubmitting={isSubmitting}
      />

      {/* Status Messages */}
      {submitStatus && (
        <div className="fixed bottom-4 right-4 max-w-md z-50">
          <div
            className={`p-4 rounded-lg shadow-lg border ${submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
              }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {submitStatus.type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`text-sm font-semibold ${submitStatus.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                    }`}
                >
                  {submitStatus.type === "success" ? "Success!" : "Error"}
                </h3>
                <p
                  className={`text-sm mt-1 ${submitStatus.type === "success"
                    ? "text-green-700"
                    : "text-red-700"
                    }`}
                >
                  {submitStatus.message}
                </p>
              </div>
              <button
                onClick={() => setSubmitStatus(null)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
