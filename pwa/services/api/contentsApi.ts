import type { Content, ContentsCollection } from "@/types/molecules";
import type { APIPlatformListResponse } from "./client";
import { ContentClient } from "./client";

export function getContents(urlParameters: URLSearchParams): Promise<APIPlatformListResponse<Content>> {
  return new ContentClient().getList(urlParameters);
}

export function getContentById(id: string): Promise<Content> {
  return new ContentClient().getItem(id);
}

export function createContent(contentData: Content): Promise<Content> {
  return new ContentClient().create(contentData);
}
