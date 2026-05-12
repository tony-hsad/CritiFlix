import { ROUTES_API } from "../../routes/routes";
import type { User } from "@/types/UsersApi";

export const API_BASE_URL = "https://localhost";

export function getUsers(): Promise<User> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  return fetch(`${API_BASE_URL}${ROUTES_API.USERS}`, {
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
      return data["member"];
    })
    .catch((error) => {
      throw error;
    });
}
