"use client";

import { useEffect, useState } from "react";
import MenuItem from "../MenuItem";
import getTeam from "@/app/api/team/haveTeam";

export default function PrivateHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>("");
  const [haveTeam, setHaveTeam] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in");
      getTeam({ token })
        .then((response) => {
          console.log("Response from getTeam:", response.isInTeam);
          if (response.isInTeam) {
            setHaveTeam(true);
          } else {
            setHaveTeam(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    console.log("Checking login status...");
    console.log("Token from sessionStorage:", sessionStorage.getItem("token"));
    setToken(sessionStorage.getItem("token") ?? "");
    console.log("token:", token);
  }, []);

  useEffect(() => {
    const getData = async () => {
      console.log("token:", token);

      if (token === "") {
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
    getData();
  }, [token]);

  if (isLoggedIn === null) {
    // Opcional: mientras se verifica, no mostrar nada o un spinner
    return null;
  }

  if (isLoggedIn) {
    return (
      <>
        {haveTeam ? (
          <MenuItem href="/team" className="text-lg">
            Mi Equipo
          </MenuItem>
        ) : (
          <MenuItem href="/create-team" className="text-lg">
            Crear Equipo
          </MenuItem>
        )}
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
