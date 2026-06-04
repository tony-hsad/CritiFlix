import React from "react";

type LabelProps = {
  className?: string;
}

function Label({ children, className = "flex flex-col gap-1"}: React.PropsWithChildren<LabelProps>) {
  return (
    <label className={className}>
      {children}
    </label>
  );
}

export default Label;
