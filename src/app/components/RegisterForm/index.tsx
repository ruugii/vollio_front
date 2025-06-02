"use client";

import RegisterUser from "@/app/api/register/register";
import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useState } from "react";
import Loader from "../Loader";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onClick, setOnClick] = useState(false);

  return (
    <>
      <form className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Apellido"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          onClick={(e) => {
            setOnClick(true);
            e.preventDefault();
            console.log("Registering user:", {
              username,
              name,
              surname,
              email,
              password,
            });
            RegisterUser({
              username,
              firstName: name,
              lastName: surname,
              email,
              password,
            })
              .then((response) => {
                console.log("User registered successfully:", response);
                sessionStorage.setItem("token", response.token);
                setOnClick(false);
                location.href = "/";
              })
              .catch((error) => {
                setOnClick(false);
                console.error("Error registering user:", error);
              });
          }}
        >
          Registrarse
        </Button>
      </form>
      <Loader open={onClick} />
    </>
  );
}
