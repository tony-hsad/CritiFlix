export const API_BASE_URL = "https://localhost";

export async function getContents() {
  try {
    const response = await fetch(`${API_BASE_URL}/contents`);

    if (!response.ok) {
      throw new Error(`An error occured while fetching contents: HTTP ${response.status}`);
    }
    const data = await response.json();

    return data["member"];
  } catch (error) {
    throw error;
  }
}

export async function getContentById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/contents/${id}`);

    if (!response.ok || response.status === 404) {
      throw new Error(`An error occured while fetching the content or the content doesn't exist: HTTP ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
