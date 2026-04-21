type LogoProps = {
  content: string,
  classname?: string,
}

function Logo({ content, classname = '' }: LogoProps) {
  return (
    <span className={classname}>
      {content}
    </span>
  );
}

export default Logo;
