export const API_BASE_URL = "https://localhost";

/**
 * @typedef {import("@types/molecules").Content} Content
 */

/**
 * Get all contents
 *
 * @returns { Promise<Content> } A Content promise to get a list of Content objects
 */
export function getContents() {
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

/**
 * Get a specific Content by its ID
 *
 * @param {number} id The Content ID
 * @returns { Promise<Content> } A Content promise to get a Content object
 */
export function getContentById(id) {
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
