'use client'

import loginUser from "@/app/api/login/login";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="flex flex-col space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Correo electrónico"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-vollio-accent text-white p-2 rounded hover:bg-vollio-dark transition duration-200"
          onClick={(e) => {
            e.preventDefault();
            console.log("Logging in user:", { email, password });
            loginUser({
              email,
              password
            })
              .then((res) => {
                const token = res.token;
                sessionStorage.setItem("token", token);
                window.location.href = "/";
              })
              .catch((error) => {
                console.error("Error in login:", error);
                alert("Error al iniciar sesión");
              });
          } }
        >
          Iniciar Sesión
        </button>
      </form>
  )
}