"use client";

import getNextMatch from "@/app/api/match/getNextMatch";
import joinMatch from "@/app/api/match/join";
import H2_component from "@/app/Text/H2_component";
import H3_component from "@/app/Text/H3_component";
import Text from "@/app/Text/Text";
import Button from "@/app/ux/Button";
import { useEffect, useState } from "react";

export default function NextMatch() {
  const [token, setToken] = useState<string>("");
  const [nextMatch, setNextMatch] = useState<any>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    console.log("Token:", token);
    if (token === "") return;
    getNextMatch(token)
      .then((data) => {
        console.log("Response from getNextMatch:", data);
        setNextMatch(data.match);
      })
      .catch((error) => {
        console.error("Error fetching next match:", error);
      });
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <H2_component className="mb-4">PROXIMO PARTIDO</H2_component>
      <div className="flex flex-row gap-4 flex-wrap">
        {nextMatch &&
          nextMatch.map((match: any) => (
            <div
              key={match?.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 w-full sm:w-1/2 lg:w-1/3"
            >
              <H3_component className="text-xl font-bold mb-2">
                SITIO: {match?.location}
              </H3_component>
              <Text className="text-gray-700 mb-2">
                Hora: {new Date(match?.date).toLocaleString()}
              </Text>
              <Text className="text-gray-700 mb-2">
                Equipo organizador:
                <br />
                Nombre:{" "}
                {match.team.team1
                  ? match.team.team1
                  : match.team.team2
                  ? match.team.team2
                  : ""}
                <br />
                ELO: {match.team.elo ? match.team.elo : ""}
              </Text>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  joinMatch(token, match?.id)
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                APUNTARSE
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
