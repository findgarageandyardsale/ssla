import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Home/components/Footer";


export const ErrorPage = () => {
  const error = useRouteError();

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        message: "Sorry, the page you're looking for doesn't exist.",
        icon: "🔍",
      };
    }
    return {
      title: "Oops! Something went wrong",
      message: "An unexpected error occurred. Please try again later.",
      icon: "⚠️",
    };
  };

  const errorContent = getErrorMessage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <div className="text-6xl mb-8">{errorContent.icon}</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {errorContent.title}
          </h1>

          <p className="text-lg text-gray-600 mb-8">{errorContent.message}</p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>

            <div className="text-gray-500 mt-4">
              Error Code: {error?.status || "Unknown"}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};


