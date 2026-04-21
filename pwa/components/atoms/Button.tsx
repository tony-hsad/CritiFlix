import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ children, variant = "primary", onClick, type = "button" }: ButtonProps) {
  const base = "text-white px-4 py-2 rounded-md text-sm transition-colors";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-red-500 hover:bg-red-800",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
