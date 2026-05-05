type ImageProps = {
  src: string;
  alt: string;
  classname?: string;
}

function Image({ src, alt, classname = ''}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${classname}`}
      width={600}
      height={400}
      loading="lazy"
    />
  );
}

export default Image;
