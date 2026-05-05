import { LazyLoadImage } from "react-lazy-load-image-component";

type ImageProps = {
  src: string;
  alt: string;
  classname?: string;
}

function Image({ src, alt, classname = ''}: ImageProps) {
  return (
    <LazyLoadImage
      className={`w-full h-full object-cover ${classname}`}
      src={src}
      width={600}
      height={400}
      alt={alt}
    />
  );
}

export default Image;
