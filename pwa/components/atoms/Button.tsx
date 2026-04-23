import type { ButtonProps } from "@/types/atoms";

function Button({ children, classname = "text-white px-4 py-2 rounded-md text-sm transition-colors", type = "button", variant = "primary", onClick }: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-red-500 hover:bg-red-800",
  };

  return (
    <button
      type={type}
      className={`${classname} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
