import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, id, error, className = "", wrapperClassName = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col mb-4 ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-black text-slate-800 mb-1.5 uppercase tracking-wider font-bubble"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full text-sm px-4 py-2.5 bg-white rounded-lg border-2 border-black font-bold focus:outline-none focus:bg-yellow-50 focus:ring-0 shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] placeholder-slate-400 transition-all ${
            error ? "border-comic-red" : "focus:border-black"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-comic-red font-bubble font-bold text-xs mt-1 block">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
