import { ROUTES } from "../../routes/routes";

export const API_BASE_URL = "https://localhost";

/**
 * @typedef {import("@types/UsersApi").User} User
 */

/**
 * Authenticates a user with their email and password
 *
 * @param {string} email The user's email identifer
 * @param {string} password The user's password
 * @returns { Promise<string> } A promise that resolves with the JWT token string
 */
export function login(email, password) {
  return fetch(`${API_BASE_URL}/api${ROUTES.LOGIN}`, {
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

/**
 * Logs out the current user by removing its JWT token from the local storage.
 *
 * @returns {void}
 */
export function logout() {
  localStorage.removeItem("jwt_token");
}

/**
 * Retrieves the currently authenticated user by taking his personnal token.
 *
 * @returns { Promise<User> } A promise that resolves to the user data object.
 */
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

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * @param {User} userData The user data javascript object.
 * @returns { Promise<User> } A promise resolving to the created user or API response.
 */
export function register(userData) {
  const headers = {
    "Content-Type": "application/ld+json",
  };

  return fetch(`${API_BASE_URL}/api${ROUTES.REGISTER}`, {
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
