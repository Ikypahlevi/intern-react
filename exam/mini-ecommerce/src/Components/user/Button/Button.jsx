export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyle = "font-comic tracking-wider uppercase border-[3px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 ease-in-out flex items-center justify-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "text-xs px-4 py-1.5",
    md: "text-sm px-6 py-2.5",
    lg: "text-lg px-8 py-3",
  };

  const variants = {
    primary: "bg-comic-yellow hover:bg-yellow-400 text-black",
    secondary: "bg-white hover:bg-gray-100 text-stone-800",
    danger: "bg-comic-red hover:bg-red-700 text-white",
    outline: "bg-transparent border-black text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
