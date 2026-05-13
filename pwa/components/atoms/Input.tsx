import React from "react";

type InputProps = {
  onChange?: () => void;
  type?: string;
  classname?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  required: boolean;
}

function Input({ onChange, type = "text", classname = "", defaultValue, ...rest }: InputProps) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className={classname}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
