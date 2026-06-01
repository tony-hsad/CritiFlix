import type { Content, ContentsCollection } from "@/types/molecules";
import type { APIPlatformListResponse } from "./client";
import { ContentClient } from "./client";

export const API_BASE_URL = "https://localhost";

export function getContents(urlParameters: URLSearchParams): Promise<APIPlatformListResponse<ContentsCollection>> {
  return new ContentClient().getList(urlParameters);
}

export function getContentById(id: number): Promise<APIPlatformListResponse<Content>> {
  return new ContentClient().getItem(id);
}

export function createContent(contentData: Content): Promise<APIPlatformListResponse<Content>> {
  return new ContentClient().create(JSON.stringify(contentData));
}
