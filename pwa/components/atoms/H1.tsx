type H1Props = {
  content: string,
  classname?: string,
}

function H1({ content, classname = '' }: H1Props) {
  return <h1 className={classname}>{content}</h1>;
}

export default H1;
