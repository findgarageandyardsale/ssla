import React, { forwardRef } from "react";

export const CheckboxField = forwardRef(({
  label,
  name,
  value,
  required = false,
  className = "",
  error,
  options = [],
  ...props
}, ref) => {
  const checkboxClasses = `w-4 h-4 text-blue-600 border-2 rounded focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 ${className}`;

  const borderClass = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

  // If options are provided, render multiple checkboxes
  if (options.length > 0) {
    return (
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group/option">
              <input
                ref={ref}
                type="checkbox"
                name={name}
                value={option.value}
                checked={Array.isArray(value) ? value.includes(option.value) : false}
                className={`${checkboxClasses} ${borderClass}`}
                {...props}
              />
              <span className="text-gray-700 font-medium group-hover/option:text-blue-600 transition-colors">
                {option.label}
              </span>
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
  }

  // Single checkbox
  return (
    <div className="group">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          className={`${checkboxClasses} ${borderClass}`}
          {...props}
        />
        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
        </div>
      )}
    </div>
  );
});

CheckboxField.displayName = "CheckboxField"; 