import React from "react";

/**
 * Button component
 *
 * @param {object} props component's customisable properties
 * @param {React.ReactNode} [props.children] Children of the Button component
 * @param {() => void} [props.onClick] The callback function to call
 * @param {React.ReactNode} [props.icon] Icon to add
 * @param {string} [props.classname] The classname to give for the style
 * @param {string} [props.type] The type of the button
 * @param {string} [props.variant] The variant of the button's style
 * @returns {React.ReactNode} Button HTML tag
 */
function Button({ children, onClick, icon, classname = "text-white px-4 py-2 rounded-md text-sm transition-colors cursor-pointer", type = "button", variant = "primary" }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-red-500 hover:bg-red-800",
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
