import { default as NextLink } from "next/link";

type LinkProps = {
  to: string;
  target?: string;
  classname?: string;
  content?: string;
}

function Link({ to, target = '_blank', classname = '', content = '' }: LinkProps) {
  return <NextLink className={classname} href={to} target={target}>{content}</NextLink>;
}

export default Link;
