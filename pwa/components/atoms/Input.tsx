import React, {ChangeEventHandler} from "react";

function Input({ onChange, type = "text", defaultValue, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} />;
}

export default Input;
