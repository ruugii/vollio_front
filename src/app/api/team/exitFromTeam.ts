import { BASE_API_URL } from "../../data.ts";

interface logininterface {
  token: string;
  exitUserId: string;
}

export default async function exitFromTeam(info: logininterface) {
  try {
    const response = await fetch(`${BASE_API_URL}/teams/exitTeam/${info.exitUserId}`, {
      method: "DELETE",
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
