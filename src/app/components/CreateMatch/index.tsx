"use client";

import createMatch from "@/app/api/match/createMatch";
import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useEffect, useState } from "react";

export default function CreateMatch() {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <form className="container mx-auto h-full px-4 py-8">
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        placeholder="Donde se juega el partido"
        className="rounded-md p-2 mb-4 w-full"
      />
      <Input
        onChange={(e) => setDate(new Date(e.target.value))}
        type="datetime-local"
        placeholder="Fecha del partido"
        className="rounded-md p-2 mb-4 w-full"
      />
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const token = sessionStorage.getItem("token");
          await createMatch(token ?? "", {
            location,
            date: date,
          })
            .then((response) => {
              console.log("Response from createMatch:", response);
              if (response) {
                alert("Partido creado");
              } else {
                alert("Error al crear el partido");
              }
            })
            .catch((error) => {
              console.error("Error creating match:", error);
              alert("Error al crear el partido");
            });
        }}
      >
        Crear partido
      </Button>
    </form>
  );
}
