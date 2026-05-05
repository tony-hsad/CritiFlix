import type { Content } from "@/types/molecules";

export const API_BASE_URL = "https://localhost";

export function getContents(): Promise<Content> {
  return fetch(`${API_BASE_URL}/contents`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`An error occured while fetching contents: HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data["member"];
    })
    .catch((error) => {
      throw error;
    });
}

export function getContentById(id: number): Promise<Content> {
  return fetch(`${API_BASE_URL}/contents/${id}`)
    .then((response) => {
      if (!response.ok || response.status === 404) {
        throw new Error(
          `An error occured while fetching the content or the content doesn't exist: HTTP ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
