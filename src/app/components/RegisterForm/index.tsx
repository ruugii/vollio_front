"use client";

import RegisterUser from "@/app/api/register/register";
import { useState } from "react";

export default function RegisterForm() {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-vollio-accent text-white p-2 rounded hover:bg-vollio-dark transition duration-200"
        onClick={(e) => {
          e.preventDefault();
          console.log("Registering user:", { username, name, surname, email, password });
          RegisterUser({
            username,
            firstName: name,
            lastName: surname,
            email,
            password
          })
            .then((response) => {
              console.log("User registered successfully:", response);
              sessionStorage.setItem("token", response.token);
              location.href = "/";
            })
            .catch((error) => {
              console.error("Error registering user:", error);
            });
        }}
      >
        Registrarse
      </button>
    </form>
  );
}
