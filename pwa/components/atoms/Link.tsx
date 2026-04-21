type LinkProps = {
  to: string,
  content?: string
  target?: string,
  classname?: string,
}

function Link({ to, target = '_blank', classname = '', content = '' }: LinkProps) {
  return <a className={classname} href={to} target={target}>{content}</a>;
}

export default Link;
