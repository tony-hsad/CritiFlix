type LinkProps = {
  to: string;
  target?: string;
  classname?: string;
  content?: string;
}

function Link({ to, target = '_blank', classname = '', content = '' }: LinkProps) {
  return <a className={classname} href={to} target={target}>{content}</a>;
}

export default Link;
