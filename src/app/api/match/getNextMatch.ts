import { BASE_API_URL } from "@/app/data";

export default async function getNextMatch(token: string) {
  return fetch(`${BASE_API_URL}/match/next`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Error creating match:", res.statusText);
      }
    })
    .then((data) => {
      console.log("Response from createMatch:", data);
      if (data.match) {
        return data;
      }
    })
    .catch((error) => {
      console.log("Error in create match:", error);
    });
}
