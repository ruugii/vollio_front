"use client";

import { useEffect, useState } from "react";
import MenuItem from "../MenuItem";

export default function PrivateHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      console.log("Checking login status...");
      const token = sessionStorage.getItem("token");
      console.log("Token from session storage:", token);
      console.log(!token);

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/auth/check`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Response from check login:", response);
          const data = await response.json();
          setIsLoggedIn(data.valid);
        } else {
          console.error("Error checking login:", response.statusText);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login:", error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    // Opcional: mientras se verifica, no mostrar nada o un spinner
    return null;
  }

  if (isLoggedIn) {
    return (
      <>
        <MenuItem href="/team" className="text-lg">
          Mi Equipo
        </MenuItem>
        <MenuItem href="/logout" className="text-lg">
          Cerrar Sesión
        </MenuItem>
      </>
    );
  } else {
    return (
      <>
        <MenuItem href="/login" className="text-lg">
          Iniciar Sesión
        </MenuItem>
        <MenuItem href="/register" className="text-lg">
          Registrarse
        </MenuItem>
      </>
    );
  }
}
