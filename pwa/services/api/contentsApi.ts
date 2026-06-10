import type { Content } from "@/types/molecules";
import type { APIPlatformListResponse } from "./client";
import { ContentClient } from "./client";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original/";

export function getContents(urlParameters: URLSearchParams): Promise<APIPlatformListResponse<Content>> {
  return new ContentClient().getList(urlParameters);
}

export function getContentById(id: string): Promise<Content> {
  return new ContentClient().getItem(id);
}

type createContentProps = Omit<Content, '@context' | '@id' | '@type' | 'id' | 'createdAt'>
export function createContent(contentData: createContentProps): Promise<Content> {
  return new ContentClient().create(contentData);
}
