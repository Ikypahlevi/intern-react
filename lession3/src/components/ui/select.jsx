import React, { forwardRef } from "react";

export const Select = forwardRef(
  ({ label, option = [], error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col mb-4">
        {label && (
          <label className="mb-1 text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full px-4 py-2 bg-white border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-shadow ${error ? "border-e-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"} ${className}`}
          {...props}
        >
          {option.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <span className="mt-1 text-sm font-medium text-red-500">{error}</span>
        )}
      </div>
    );
  },
);
