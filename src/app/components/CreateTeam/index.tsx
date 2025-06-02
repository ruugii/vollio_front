"use client";

import createTeam from "@/app/api/team/createTeam";
import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useState } from "react";
import Loader from "../Loader";

export default function CreateTeam() {
  const [name, setName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  return (
    <>
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
            setIsCreating(true);
            e.preventDefault();
            console.log("Creating team with name:", name);
            createTeam(
              {
                name,
              },
              sessionStorage.getItem("token") ?? ""
            ).then((e) => {
              setIsCreating(false);
            });
          }}
        >
          Crear equipo
        </Button>
      </form>
      <Loader open={isCreating} />
    </>
  );
}
