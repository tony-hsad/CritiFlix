import React from "react";

function Input({ onChange, type = "text", defaultValue, ...rest}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}

export default Input;
