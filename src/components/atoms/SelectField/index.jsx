import React, { forwardRef } from "react";

export const SelectField = forwardRef(({
  label,
  name,
  options = [],
  required = false,
  className = "",
  error,
  ...props
}, ref) => {
  const selectClasses = `w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-opacity-20 transition-all duration-300 bg-white hover:bg-gray-50 focus:bg-white ${className}`;
  
  const borderClass = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        ref={ref}
        name={name}
        className={`${selectClasses} ${borderClass} appearance-none bg-no-repeat bg-right pr-10`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.5em 1.5em'
        }}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="py-2">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
        </div>
      )}
    </div>
  );
});

SelectField.displayName = "SelectField";