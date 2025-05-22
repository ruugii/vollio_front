export default async function createMatch(
  token: string,
  { location, date }: { location: string; date: Date }
) {
  try {
    return await fetch(`http://localhost:4000/api/v1/match/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        date,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error creating match:", res.statusText);
          alert("Error al crear el partido");
        }
      })
      .catch((error) => {
        console.error("Error in create match:", error);
        alert("Error al crear el partido");
      });
  } catch (error) {
    console.error("Error creating match:", error);
    alert("Error al crear el partido");
  }
}
