import React from "react";

type DivProps = {
  children: React.ReactNode,
  classname?: string,
}

function Div({ children, classname = '' }: DivProps) {
  return (
    <div className={classname}>
      {children}
    </div>
  );
}

export default Div;
