import { BASE_API_URL } from "@/app/data";

export default async function getMyMatch(token: string) {
  return fetch(`${BASE_API_URL}/match/get/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      console.log("Response from createMatch:", data);
      if (data.match) {
        return data;
      }
    });
}
