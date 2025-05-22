'use client'

import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input"
import { useEffect, useState } from "react";

export default function CreateMatch() {
  
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(date);
  }, [date])

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
            const response = await fetch(`http://localhost:4000/api/v1/match/create`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                location,
                date,
              }),
            });
            if (response.ok) {
              console.log("Partido creado");
              window.location.href = "/";
            } else {
              console.log("Error al crear el partido");
            }
          }}
        >
          Crear partido
        </Button>
      </form>
  )
}