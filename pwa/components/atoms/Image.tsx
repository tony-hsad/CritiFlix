import type { ImageProps } from "@/types/atoms";

function Image({ src, alt, classname = '', loading = '' }: ImageProps) {
  return <img className={classname} src={src} alt={alt} loading={loading} />;
}


export default Image;
