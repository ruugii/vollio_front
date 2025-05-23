import { BASE_API_URL } from "@/app/data";

export default async function createMatch(
  token: string,
  { location, date }: { location: string; date: Date | string }
) {
  try {
    const dateString = typeof date === "string" ? date : date.toISOString(); // Asegura UTC en formato ISO

    console.log("Creating match with token:", token);
    console.log("Match details:", { location, date: dateString });

    const response = await fetch(`${BASE_API_URL}/match/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        date: dateString,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error creating match:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating match:", error);
  }
}
