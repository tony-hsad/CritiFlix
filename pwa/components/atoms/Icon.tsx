import React, { RefAttributes, ForwardRefExoticComponent } from "react";
import { House, LogIn, LogOut, LoaderCircle, Search, Plus, ArrowLeftToLine, ArrowRightFromLine, MailPlus, UsersRound, LucideProps } from "lucide-react";

type AllowedIcons = 'login' | 'logout' | 'loading' | 'search' | 'plus' | 'arrowLeft' | 'arrowRight' | 'contact' | 'friends';

type RenderableIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

function mapNameToIcon(name: AllowedIcons): RenderableIcon {
  switch (name) {
    case 'login':
      return LogIn;
    case 'logout':
      return LogOut;
    case 'loading':
      return LoaderCircle;
    case 'search':
      return Search;
    case 'plus':
      return Plus;
    case 'arrowLeft':
      return ArrowLeftToLine;
    case 'arrowRight':
      return ArrowRightFromLine;
    case 'contact':
      return MailPlus;
    case 'friends':
      return UsersRound;

    default:
      return House;
  }
}

const SIZES = {
  small: 16,
  medium: 24,
  large: 32,
}

type IconProps = {
  name: AllowedIcons;
  size?: keyof typeof SIZES;
  className?: string;
}

function Icon({ name, size, className }: IconProps): React.FC<IconProps> {
  const DynamicIcon = mapNameToIcon(name);
  return <DynamicIcon size={size ? SIZES[size] : SIZES.small} className={className} />;
}

export default Icon;

export type IconType = typeof Icon;
