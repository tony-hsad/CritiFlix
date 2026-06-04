import React from "react";

type ChipProps = {
  className?: string;
}

function Chip({ children,  className = "" }: React.PropsWithChildren<ChipProps>) {
  return (
    <span className={`${className} rounded-full border text-xs font-bold px-2 py-0.5`}>
      {children}
    </span>
  );
}

export default Chip;
