type ImageProps = {
  src: string;
  alt: string;
  classname?: string;
}

function Image({ classname = '', ...rest }: ImageProps) {
  return (
    <img
      className={`w-full h-full object-cover ${classname}`}
      width={600}
      height={400}
      loading="lazy"
      {...rest}
    />
  );
}

export default Image;
