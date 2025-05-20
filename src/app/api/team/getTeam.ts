import { BASE_API_URL } from "../../data.ts";

interface logininterface {
  token: string;
}

export default async function getTeamInfo(info: logininterface) {
  try {
    const response = await fetch(`${BASE_API_URL}/teams/getTeam`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${info.token}`,
      },
    });

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
