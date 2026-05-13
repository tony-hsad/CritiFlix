import type { ApiResourceBase, Collection } from "@/types/Api";

type ContentProps = ApiResourceBase & {
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

export type ContentsCollection = Collection<Content>;
