"use client";

import createTeam from "@/app/api/team/createTeam";
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
          createTeam(
            {
              name,
            },
            sessionStorage.getItem("token") ?? ""
          );
        }}
      >
        Crear equipo
      </Button>
    </form>
  );
}
