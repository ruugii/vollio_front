"use client";

import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useState } from "react";

export default function CreateTeam() {
  const [name, setName] = useState<string>("");
  return (
    <form className="container mx-auto h-full px-4 py-8">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Nombre del equipo"
        className="rounded-md p-2 mb-4 w-full"
      />
      <Button
        type="submit"
        className="rounded-md p-2 w-full"
        onClick={(e) => {
          e.preventDefault();
          console.log("Creating team with name:", name);
          fetch("http://localhost:4000/api/v1/teams/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name }),
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
        }}
      >
        Crear equipo
      </Button>
    </form>
  );
}
