import { ROUTES_API } from "../../routes/routes";
import type { User } from "@/types/UsersApi";

export const API_BASE_URL = "https://localhost";

export function login(email: string, password: string): Promise<string> {
  return fetch(`${API_BASE_URL}/api${ROUTES_API.LOGIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("jwt_token", data.token);
      return data.token;
    })
    .catch((error) => {
      throw error;
    });
}

export function logout() {
  localStorage.removeItem("jwt_token");
}

export function getMe(): Promise<User> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}/api${ROUTES_API.ME}`, {
    method: "GET",
    headers,
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

export function register(userData: User): Promise<User> {
  const headers = {
    "Content-Type": "application/ld+json",
  };

  return fetch(`${API_BASE_URL}/api${ROUTES_API.REGISTER}`, {
    method: "POST",
    headers,
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}
