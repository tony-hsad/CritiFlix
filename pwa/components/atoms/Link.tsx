import { default as NextLink } from "next/link";

type LinkProps = {
  to: string;
  target?: string;
  className?: string;
} & (React.PropsWithChildren<{}> | { content: string })

function Link({ to, target = '', className = '', children, ...rest }: React.PropsWithChildren<LinkProps>) {
  return <NextLink className={className} href={to} target={target}>{children || ('content' in rest && rest['content'])}</NextLink>;
}

export default Link;
