export const API_BASE_URL = "https://localhost";

export async function getMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/contents`);

    if (!response.ok) {
      throw new Error(`An error occured while fetching contents: HTTP ${res.status}`);
    }
    const data = await response.json();

    return data["member"];
  } catch (error) {
    throw error;
  }
}
