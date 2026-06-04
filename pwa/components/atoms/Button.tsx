import React, {ButtonHTMLAttributes} from "react";
import {IconProps, default as Icon} from "./Icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: IconProps;
  classname?: string;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variants;
}

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700",
  secondary: "bg-red-500 hover:bg-red-800",
  green: "bg-green-600 hover:bg-green-800",
};

function Button({ children, onClick, icon, classname = "text-white px-4 py-2 rounded-md text-sm transition-colors cursor-pointer", type = "button", variant = "primary" }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${classname} ${variants[variant]} flex items-center`}
      onClick={onClick}
    >
      {icon && <span className="w-4 h-4 pr-5">{<Icon {...icon} />}</span>}
      {children}
    </button>
  );
}

export default Button;
