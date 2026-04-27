export type ContentProps = {
  "@id": string;
  "@type": string;
  id: number;
  title: string;
  description?: string | null;
  releaseDate?: string | null;
  entrances?: number | null;
  poster?: string | null;
  minimalAge?: number | null;
  type?: string | null;
};

export type Content = {
  content: ContentProps;
};
