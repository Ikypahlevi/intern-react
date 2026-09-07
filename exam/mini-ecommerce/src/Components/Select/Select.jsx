import React, { forwardRef } from "react";

const Select = forwardRef(
  ({ label, id, error, options, className = "", wrapperClassName = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col mb-4 ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-[13px] font-bold text-black mb-1 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`w-full text-sm px-4 py-2.5 bg-yellow-50 rounded-none border-2 border-black font-bold focus:outline-none focus:bg-white focus:ring-0 shadow-[3px_3px_0px_#000] cursor-pointer transition appearance-none ${
            error ? "border-comic-red focus:border-comic-red" : "focus:border-black"
          } ${className}`}
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23000\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-comic-red font-bubble font-bold text-xs mt-1 block">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
