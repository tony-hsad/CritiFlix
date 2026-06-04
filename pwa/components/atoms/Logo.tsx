type LogoProps = {
  content: string;
  className?: string;
}

function Logo({ content, className = '' }: LogoProps) {
  return (
    <span className={className}>
      {content}
    </span>
  );
}

export default Logo;
