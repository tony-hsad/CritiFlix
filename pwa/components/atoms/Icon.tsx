import React, { RefAttributes, ForwardRefExoticComponent } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  House,
  LogIn,
  LogOut,
  LoaderCircle,
  Search,
  Plus,
  ArrowLeftToLine,
  ArrowRightFromLine,
  MailPlus,
  UsersRound,
  UserPlus,
  UserMinus,
  Pencil,
  Trash2,
  LucideProps
} from "lucide-react";

type AllowedIcons = 'star' | 'like' | 'dislike' | 'login' | 'logout' | 'loading' | 'search' | 'plus' | 'arrowLeft' | 'arrowRight' | 'contact' | 'friends' | 'acceptFriend' | 'removeFriend' | 'edit' | 'delete';

type RenderableIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

function mapNameToIcon(name: AllowedIcons): RenderableIcon {
  switch (name) {
    case 'star':
      return Star;
    case 'like':
      return ThumbsUp;
    case 'dislike':
      return ThumbsDown;
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
    case 'acceptFriend':
      return UserPlus;
    case 'removeFriend':
      return UserMinus;
    case 'edit':
      return Pencil;
    case 'delete':
      return Trash2;

    default:
      return House;
  }
}

const SIZES = {
  small: 16,
  medium: 24,
  large: 32,
}

export type IconProps = {
  name: AllowedIcons;
  size?: keyof typeof SIZES;
  className?: string;
}

function Icon({ name, size, className }: IconProps) {
  const DynamicIcon = mapNameToIcon(name);
  return <DynamicIcon size={size ? SIZES[size] : SIZES.small} className={className} />;
}

export default Icon;

export type IconType = typeof Icon;
