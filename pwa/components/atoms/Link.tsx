type LinkProps = {
  to: string;
  target?: string;
  classname?: string;
  content?: string;
}

function Link({ to, target = '', className = '', children, ...rest }: React.PropsWithChildren<LinkProps>) {
  return <NextLink className={className} href={to} target={target}>{children || ('content' in rest && rest['content'])}</NextLink>;
}

export default Link;
