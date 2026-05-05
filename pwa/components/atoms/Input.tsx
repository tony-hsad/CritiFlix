import React from "react";

type InputProps = {
  onChange?: () => void;
  type?: string;
  classname?: string;
  value: string;
  placeholder?: string;
  name?: string;
  required: boolean;
}

function Input({ onChange, type = "text", classname = "", value, ...rest }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      className={classname}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
