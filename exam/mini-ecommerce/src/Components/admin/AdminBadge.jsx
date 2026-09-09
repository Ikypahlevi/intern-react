import React from "react";

export default function AdminBadge({ text, variant = "default", icon, className = "" }) {
  const getStyles = () => {
    switch (variant) {
      case 'success': return 'bg-green-500 text-black';
      case 'danger': return 'bg-red-600 text-white';
      case 'warning': return 'bg-yellow-300 text-black';
      case 'info': return 'bg-blue-300 text-black';
      case 'dark': return 'bg-black text-white';
      case 'light': return 'bg-gray-100 text-black';
      case 'primary': return 'bg-comic-yellow text-black';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <span className={`px-2 py-0.5 border-[2px] border-black font-comic text-[10px] uppercase font-black shadow-[2px_2px_0px_#000] inline-flex items-center gap-1 ${getStyles()} ${className}`}>
      {icon && <i className={icon}></i>}
      {text}
    </span>
  );
}
