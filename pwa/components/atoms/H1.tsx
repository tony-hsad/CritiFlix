import React from "react";

type H1Props = {
  content: string;
  className?: string;

}

function H1({ content, className = '' }: H1Props) {
  return (
    <h1 className={className}>
      {content}
    </h1>
  );

}

export default H1;
