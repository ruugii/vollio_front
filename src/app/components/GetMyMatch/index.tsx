"use client";

import getMyMatch from "@/app/api/match/getMyMatch";
import H2_component from "@/app/Text/H2_component";
import H3_component from "@/app/Text/H3_component";
import Text from "@/app/Text/Text";
import { useEffect, useState } from "react";

export default function GetMyMatch() {
  const [match, setMatch] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    getMyMatch(token)
      .then((res) => {
        if (res) {
          setMatch(res.match);
        }
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, [token]);
  return (
    <div className="container mx-auto px-4 py-8">
      <H2_component className="mb-4">MIS PARTIDOS</H2_component>
      <div className="flex flex-row gap-4 flex-wrap">
        {match &&
          match.map((match: any) => (
            <div
              key={match?._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 w-full sm:w-1/2 lg:w-1/3"
            >
              <H3_component className="text-xl font-bold mb-2">
                SITIO: {match?.location}
              </H3_component>
              <Text className="text-gray-700 mb-2">
                Hora: {new Date(match?.date).toLocaleString()}
              </Text>
              <Text className="text-gray-700 mb-2">
                Equipo rival:{" "}
                {match?.team_2 ? match?.team_2 : "No hay rival por el momento"}
              </Text>
            </div>
          ))}
      </div>
    </div>
  );
}
