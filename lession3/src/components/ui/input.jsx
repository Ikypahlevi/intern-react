import React, { forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col mb-4">
        {label && (
          <label className="mb-1 text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-0.5 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${icon ? "pl-10" : ""} ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="mt-1 text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  },
);
