"use client";

import loginUser from "@/app/api/login/login";
import Button from "@/app/ux/Button";
import Input from "@/app/ux/Input";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="flex flex-col space-y-4">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Correo electrónico"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Contraseña"
      />

      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          console.log("Logging in user:", { email, password });
          loginUser({
            email,
            password,
          })
            .then((res) => {
              const token = res.token;
              sessionStorage.setItem("token", token);
              window.location.href = "/";
            })
            .catch((error) => {
              console.error("Error in login:", error);
            });
        }}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
}
