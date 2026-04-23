import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type DivProps = {
  children: React.ReactNode,
  classname?: string,
}

export type H1Props = {
  content: string,
  classname?: string,
}

export type ImageProps = {
  src: string,
  alt: string,
  classname?: string,
  loading?: string
}

export type InputProps = {
  value?: string,
  onChange?: any,
  placeholder?: string,
  type?: string,
  classname?: string,
}

export type LinkProps = {
  to: string,
  content?: string
  target?: string,
  classname?: string,
}

export type LogoProps = {
  content: string,
  classname?: string,
}
