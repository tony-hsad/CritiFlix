import type { Content } from "@/types/molecules";
import { ROUTES_API } from "../../routes/routes";
import { logout } from "./authApi";

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

export function createContent(contentData: Content): Promise<Content> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/ld+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}/api${ROUTES_API.CREATE}`, {
    method: "POST",
    headers,
    body: JSON.stringify(contentData),
  })
    .then((response) => {
      const isUserUnauthorized = response.status === 401;
      if (isUserUnauthorized) {
        logout();
      }

      if (!response.ok) {
        throw response.status;
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
