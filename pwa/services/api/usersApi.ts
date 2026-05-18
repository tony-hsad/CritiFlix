import { ROUTES_API } from "../../routes/routes";
import type { User, UsersCollection } from "@/types/UsersApi";

export const API_BASE_URL = "https://localhost";

export function getUsers(urlParameters: URLSearchParams): Promise<UsersCollection> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  return fetch(`${API_BASE_URL}${ROUTES_API.USERS}?${urlParameters.toString()}`, {
    method: "GET",
    headers,
  })
    .then((response) => {
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

export function getUserById(id: number): Promise<User> {
  return fetch(`${API_BASE_URL}${ROUTES_API.USERS}/${id}`)
    .then((response) => {
      if (!response.ok || response.status === 404) {
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
