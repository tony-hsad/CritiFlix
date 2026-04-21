type ImageProps = {
  src: string,
  alt: string,
  classname?: string,
  loading?: string
}

function Image({ src, alt, classname = '', loading = '' }: ImageProps) {
  return <img className={classname} src={src} alt={alt} loading={loading} />;
}


export default Image;
