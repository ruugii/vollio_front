import { BASE_API_URL } from "../../data";

export default async function checkAuth(token: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("Response from check login:", response);
      const data = await response.json();
      return data
    } else {
      console.error("Error checking login:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error checking login:", error);
    return null;
  }
}
