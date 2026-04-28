import { ROUTES } from "../../routes/routes";

export const API_BASE_URL = "https://localhost";

export function login(email, password) {
  return fetch(`${API_BASE_URL}/api${ROUTES.LOGIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        // throw response.status;
        throw new Error("Email ou mot de passe incorrect");
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

export function getMe() {
  const token = localStorage.getItem("jwt_token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}/api${ROUTES.ME}`, {
    method: "GET",
    headers,
  })
    .then((response) => {
      const isUserUnauthorized = response.status === 401;
      if (isUserUnauthorized) {
        localStorage.removeItem("jwt_token");
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
