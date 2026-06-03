import { default as NextLink } from "next/link";

type LinkProps = {
  to: string;
  target?: string;
  classname?: string;
} & (React.PropsWithChildren<{}> | { content: string })

function Link({ to, target = '', classname = '', children, ...rest }: React.PropsWithChildren<LinkProps>) {
  return <NextLink className={classname} href={to} target={target}>{children || ('content' in rest && rest['content'])}</NextLink>;
}

export default Link;
