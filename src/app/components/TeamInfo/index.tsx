"use client";

import getTeamInfo from "@/app/api/team/getTeam";
import Team from "@/app/ux/Team";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function TeamInfo() {
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [elo, setElo] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    console.log("Checking login status...");
    console.log("Token from sessionStorage:", sessionStorage.getItem("token"));
    setToken(sessionStorage.getItem("token") ?? "");
    console.log("token:", token);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (token !== "") {
        getTeamInfo({ token })
          .then((response) => {
            console.log("Response from getTeamInfo:", response);
            setData(response.data);
            setElo(response.elo)
            setIsAdmin(response.isAdmin);
            if (response.isInTeam) {
              console.log("User is in a team");
            } else {
              console.log("User is not in a team");
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching team data:", error);
            setIsLoading(false);
          });
      }
    };

    getData();
  }, [token]);

  return (
    <>
      <Loader open={isLoading} />
      <Team team={data} isAdmin={isAdmin} elo={elo} />
    </>
  );
}
