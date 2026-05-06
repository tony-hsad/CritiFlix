import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactNode;
  classname?: string;
  type?: "button" | "submit" | "reset";
  variant: string;
}

function Button({ children, onClick, icon, classname = "text-white px-4 py-2 rounded-md text-sm transition-colors cursor-pointer", type = "button", variant = "primary" }: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-red-500 hover:bg-red-800",
    green: "bg-green-600 hover:bg-green-800",
  };

  return (
    <button
      type={type}
      className={`${classname} ${variants[variant]} flex items-center`}
      onClick={onClick}
    >
      {icon && <span className="w-4 h-4 pr-5">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
