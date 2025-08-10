import React, { forwardRef } from "react";

export const RadioField = forwardRef(({
  label,
  name,
  options = [],
  required = false,
  className = "",
  error,
  ...props
}, ref) => {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`space-y-2 ${className}`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200">
            <input
              ref={ref}
              type="radio"
              name={name}
              value={option.value}
              required={required}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
              {...props}
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
        </div>
      )}
    </div>
  );
});

RadioField.displayName = "RadioField";