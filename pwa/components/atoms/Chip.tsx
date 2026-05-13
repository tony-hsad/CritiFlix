import React from "react";

type ChipProps = {
  children: React.ReactNode;
  classname?: string;
}

function Chip({ children,  classname = "" }: ChipProps) {
  return (
    <span className={`${classname} rounded-full border text-xs font-bold px-2 py-0.5`}>
      {children}
    </span>
  );
}

export default Chip;
