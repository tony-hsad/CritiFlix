import type { LogoProps } from "@/types/atoms";

function Logo({ content, classname = '' }: LogoProps) {
  return (
    <span className={classname}>
      {content}
    </span>
  );
}

export default Logo;
