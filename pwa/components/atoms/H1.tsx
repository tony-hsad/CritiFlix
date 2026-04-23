import type { H1Props } from "@/types/atoms";

function H1({ content, classname = '' }: H1Props) {
  return <h1 className={classname}>{content}</h1>;
}

export default H1;
