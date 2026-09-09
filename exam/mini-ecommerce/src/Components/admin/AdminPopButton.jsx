import React from "react";

export default function AdminPopButton({ 
  children, 
  onClick, 
  variant = "primary", // primary (yellow), danger (red), secondary (gray), success (green), info (blue)
  icon,
  className = "",
  title = "",
  type = "button",
  form
}) {
  const getBgColor = () => {
    switch(variant) {
      case 'primary': return 'bg-comic-yellow text-black';
      case 'danger': return 'bg-red-600 text-white';
      case 'secondary': return 'bg-gray-200 text-black';
      case 'success': return 'bg-green-500 text-black';
      case 'info': return 'bg-blue-400 text-black';
      case 'dark': return 'bg-black text-white';
      case 'outline': return 'bg-white text-black hover:bg-gray-100';
      default: return 'bg-comic-yellow text-black';
    }
  };

  return (
    <button 
      type={type}
      form={form}
      onClick={onClick}
      title={title}
      className={`px-4 py-2 border-[2px] border-black font-comic text-sm uppercase font-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] transition-all ${getBgColor()} ${className}`}
    >
      {icon && <i className={icon}></i>}
      {children && <span>{children}</span>}
    </button>
  );
}
