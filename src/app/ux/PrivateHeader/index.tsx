"use client";

import { useEffect, useState } from "react";
import MenuItem from "../MenuItem";
import getTeam from "@/app/api/team/haveTeam";
import checkAuth from "@/app/api/auth/checkAuth";

export default function PrivateHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>("");
  const [haveTeam, setHaveTeam] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in");
      getTeam({ token })
        .then((response) => {
          console.log("Response from getTeam:", response.isInTeam);
          if (response.isInTeam) {
            setHaveTeam(true);
            setIsAdmin(response.isAdmin);
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

      checkAuth(token)
        .then((response) => {
          console.log("Response from check login:", response);
          if (response) {
            setIsLoggedIn(response.valid);
          } else {
            setIsLoggedIn(false);
          }
        })
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
          <>
          <MenuItem href="/team" className="text-lg">
            Mi Equipo
          </MenuItem>
          {isAdmin && (
            <MenuItem href="/match" className="text-lg">
              Crear Partido
            </MenuItem>
          )}
          </>
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
