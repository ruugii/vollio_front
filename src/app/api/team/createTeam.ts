import { BASE_API_URL } from "@/app/data";

export default async function createTeam(
  { name }: { name: string },
  token: string
) {
  fetch(`${BASE_API_URL}/teams/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Team created successfully");
        window.location.href = "/";
      } else {
        console.error("Error creating team:", res.statusText);
        alert("Error al crear el equipo");
      }
    })
    .catch((error) => {
      console.error("Error in create team:", error);
      alert("Error al crear el equipo");
    });
}
