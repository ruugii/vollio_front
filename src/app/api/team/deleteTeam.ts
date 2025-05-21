import { BASE_API_URL } from "../../data.ts";

export default async function deleteTeam(token: string) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/teams/deleteTeam`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in register API:", error);
    throw new Error("Failed to register");
  }
}
