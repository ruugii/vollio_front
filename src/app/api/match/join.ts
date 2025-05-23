import { BASE_API_URL } from "@/app/data";

export default async function joinMatch(token: string, id: number) {
  return fetch(`${BASE_API_URL}/match/join/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.error("Error creating match:", res);
      }
    })
    .catch((error) => {
      console.error("Error in create match:", error);
    });
}
