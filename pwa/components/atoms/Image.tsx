type ImageProps = {
  src: string;
  alt: string;
  className?: string;
}

function Image({ className = '', ...rest }: ImageProps) {
  return (
    <img
      className={`w-full h-full object-cover ${className}`}
      width={600}
      height={400}
      loading="lazy"
      {...rest}
    />
  );
}

export default Image;
