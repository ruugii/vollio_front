'use client';

import createMatch from "@/app/api/match/createMatch";
import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useEffect, useState } from "react";

export default function CreateMatch() {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Fecha local seleccionada:", date);
    console.log("Fecha enviada (UTC):", date.toISOString());
  }, [date]);

  return (
    <form className="container mx-auto px-4 py-8">
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        placeholder="Donde se juega el partido"
        className="rounded-md p-2 mb-4 w-full"
      />
      <Input
        type="datetime-local"
        onChange={(e) => {
          const localDate = new Date(e.target.value);
          // Convertimos a fecha UTC real ajustando el desfase horario
          const correctedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
          setDate(correctedDate);
        }}
        placeholder="Fecha del partido"
        className="rounded-md p-2 mb-4 w-full"
      />
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const token = sessionStorage.getItem("token");
          await createMatch(token ?? "", {
            location,
            date: date.toISOString(), // 👈 Enviamos fecha en formato UTC
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
