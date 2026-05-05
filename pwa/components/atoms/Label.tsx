import React from "react";

type LabelProps = {
  children: React.ReactNode;
  classname?: string;
}

function Label({ children, classname = "flex flex-col gap-1"}: LabelProps) {
  return (
    <label className={classname}>
      {children}
    </label>
  );
}

export default Label;
