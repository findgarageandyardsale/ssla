import React, { forwardRef } from "react";

export const InputField = forwardRef(({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  icon: Icon = null,
  className = "",
  error,
  ...props
}, ref) => {
  const inputClasses = `w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-opacity-20 transition-all duration-300 ${className}`;
  const inputWithIconClasses = `w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-opacity-20 transition-all duration-300 ${className}`;
  
  const borderClass = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
    : "border-gray-200 focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          className={`${Icon ? inputWithIconClasses : inputClasses} ${borderClass} bg-white hover:bg-gray-50 focus:bg-white`}
          placeholder={placeholder}
          {...props}
        />
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

InputField.displayName = "InputField";