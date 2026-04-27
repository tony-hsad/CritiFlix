import type { DivProps } from "@/types/atoms";

function Div({ children, classname = '' }: DivProps) {
  return (
    <div className={classname}>
      {children}
    </div>
  );
}

export default Div;
