import React, { forwardRef } from "react";

export const FileField = forwardRef(({
  label,
  name,
  required = false,
  accept = "",
  className = "",
  error,
  ...props
}, ref) => {
  const fileClasses = `w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-opacity-20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${className}`;
  
  const borderClass = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        className={`${fileClasses} ${borderClass} bg-white hover:bg-gray-50 focus:bg-white`}
        {...props}
      />
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
        </div>
      )}
    </div>
  );
});

FileField.displayName = "FileField"; 