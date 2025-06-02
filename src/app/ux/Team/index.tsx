import deleteTeam from "@/app/api/team/deleteTeam";
import exitFromTeam from "@/app/api/team/exitFromTeam";
import Loader from "@/app/components/Loader";
import getName from "@/app/functions/elo/getName";
import H2_component from "@/app/Text/H2_component";
import H3_component from "@/app/Text/H3_component";
import H4_component from "@/app/Text/H4_component";
import Text from "@/app/Text/Text";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

interface Member {
  username: string;
  elo: number;
  gamesPlayed: number;
  isAdmin: boolean;
  id: number;
}

interface TeamInteface {
  name: string;
  elo: number;
  players: Member[];
}

interface EloInterface {
  elo: string;
  updated: Date;
}

export default function Team({
  team,
  isAdmin,
  elo,
}: {
  team: TeamInteface[];
  isAdmin: boolean;
  elo: EloInterface[];
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [teamData, setTeamData] = useState<TeamInteface[]>(team);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "" | "deleteUser" | "exitTeam" | "deleteTeam"
  >("");
  const [selectedPlayer, setSelectedPlayer] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eloGraf, setEloGraf] = useState<{ elo: number; update: Date }[]>();
  const [chart, setChart] = useState<Chart>();
  const [seeGraf, setSeeGraf] = useState<boolean>(false);

  useEffect(() => {
    setTeamData(team);
  }, [team]);

  useEffect(() => {
    console.log("Team data updated:", teamData);
  }, [teamData]);

  useEffect(() => {
    if (elo) {
      console.log(`elo: ${elo}`);
      const aux = elo.map((e) => {
        return {
          elo: parseFloat(e.elo),
          update: e.updated,
        };
      });

      setEloGraf(aux);
    }
  }, [elo]);

  useEffect(() => {
    if (!chartRef.current || !eloGraf) return;

    if (chart) chart.destroy(); // Destruye el gráfico anterior

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: eloGraf.map((data) =>
          new Date(data.update).toLocaleDateString()
        ),
        datasets: [
          {
            label: "ELO",
            data: eloGraf.map((data) => data.elo),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 100,
            },
          },
        },
      },
    });

    setChart(newChart);
  }, [eloGraf, seeGraf]);

  return (
    <>
      {seeGraf && (
        <div className=" fixed top-0 z-50 left-0 bg-vollio-50/50 h-screen w-screen">
          <div className=" text-right">
            <button
              className="py-4 px-4 bg-vollio-100"
              onClick={() => setSeeGraf(false)}
            >
              X
            </button>
          </div>
          <div className=" h-5/6 bg-vollio-100">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      )}
      <Loader open={isLoading} />
      {modalOpen && modalContent === "deleteUser" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-vollio-950/50">
          <button
            className="text-vollio-50 font-bold py-2 px-4 rounded fixed top-4 right-4 hover:cursor-pointer"
            onClick={() => setModalOpen(false)}
          >
            X
          </button>
          <div className="bg-white p-6 rounded shadow-lg max-w-1/3 max-x-1/2">
            <H2_component className=" text-center ">
              ESTAS SEGURO QUE QUIERES ELIMINAR EL USUARIO{" "}
              {selectedPlayer?.username} DEL EQUIPO{" "}
              {teamData ? teamData[0]?.name : ""}?
            </H2_component>
            <div className="flex flex-row items-center content-center justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  setIsLoading(true);
                  exitFromTeam({
                    token: sessionStorage.getItem("token") ?? "",
                    exitUserId: `${selectedPlayer?.id}`,
                  })
                    .then((response) => {
                      console.log("Response from exitFromTeam:", response);
                      setTeamData((prevData) =>
                        prevData.map((t) => ({
                          ...t,
                          players: t.players.filter(
                            (p) => p.id !== selectedPlayer?.id
                          ),
                        }))
                      );
                      setSelectedPlayer(null);
                      setModalOpen(false);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
                      setIsLoading(false);
                    });
                }}
              >
                SI
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                onClick={() => {
                  setSelectedPlayer(null);
                  setModalOpen(false);
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : modalOpen && modalContent === "exitTeam" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-vollio-950/50">
          <button
            className="text-vollio-50 font-bold py-2 px-4 rounded fixed top-4 right-4 hover:cursor-pointer"
            onClick={() => setModalOpen(false)}
          >
            X
          </button>
          <div className="bg-white p-6 rounded shadow-lg max-w-1/3 max-x-1/2">
            <H2_component className=" text-center ">
              ESTAS SEGURO QUE QUIERES SALIR DEL EQUIPO{" "}
              {teamData ? teamData[0]?.name : ""}?
            </H2_component>
            <div className="flex flex-row items-center content-center justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  setIsLoading(true);
                  exitFromTeam({
                    token: sessionStorage.getItem("token") ?? "",
                    exitUserId: ``,
                  })
                    .then((response) => {
                      console.log("Response from exitFromTeam:", response);
                      document.location.href = "/create/team";
                      setModalOpen(false);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
                      setIsLoading(false);
                    });
                }}
              >
                SI
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : modalOpen && modalContent === "deleteTeam" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-vollio-950/50">
          <button
            className="text-vollio-50 font-bold py-2 px-4 rounded fixed top-4 right-4 hover:cursor-pointer"
            onClick={() => setModalOpen(false)}
          >
            X
          </button>
          <div className="bg-white p-6 rounded shadow-lg max-w-1/3 max-x-1/2">
            <H2_component className=" text-center ">
              ESTAS SEGURO QUE QUIERES ELIMINAR EL EQUIPO{" "}
              {teamData ? teamData[0]?.name : ""}?
            </H2_component>
            <div className="flex flex-row items-center content-center justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  setIsLoading(true);
                  deleteTeam(sessionStorage.getItem("token") ?? "")
                    .then((response) => {
                      console.log("Response from exitFromTeam:", response);
                      document.location.href = "/create/team";
                      setModalOpen(false);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
                      setIsLoading(false);
                    });
                }}
              >
                SI
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col w-full uppercase text-vollio-950">
        <ul className=" flex flex-col gap-4">
          {teamData?.map((t, i) => (
            <li
              key={i + 1}
              className="flex flex-col gap-2 border-vollio-950 border-solid border-2 rounded-lg p-4"
            >
              <H2_component>{t?.name ?? ""}</H2_component>
              <div className=" flex flex-row content-center items-center justify-between">
                <H3_component>
                  Elo: {t.elo ? `${t.elo} - ${getName(t.elo)}` : ""}
                </H3_component>
                <button onClick={() => setSeeGraf(true)}>
                  Ver evolucion del elo
                </button>
              </div>
              <div className="flex flex-col">
                <H4_component>Members:</H4_component>
                <ul className=" flex flex-col gap-2">
                  {t?.players?.map((member, index) => (
                    <li
                      key={index}
                      className=" flex flex-row content-center items-center justify-between"
                    >
                      <Text>
                        {member?.username ?? ""} - Elo:{" "}
                        {member.elo ? getName(member.elo) : ""} - Games:{" "}
                        {member?.gamesPlayed ?? ""}
                      </Text>
                      {isAdmin &&
                        (member.isAdmin ? (
                          <span className="text-green-500 font-bold px-2">
                            Admin
                          </span>
                        ) : (
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded disabled:bg-vollio-200 transition duration-200 hover:cursor-pointer"
                            onClick={() => {
                              setSelectedPlayer(member);
                              setModalContent("deleteUser");
                              setModalOpen(true);
                            }}
                          >
                            DELETE
                          </button>
                        ))}
                    </li>
                  ))}
                </ul>
              </div>
              {isAdmin ? (
                <button
                  className="bg-vollio-dark text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    console.log("Delete team:", t.name);
                    setModalContent("deleteTeam");
                    setModalOpen(true);
                  }}
                >
                  Delete team
                </button>
              ) : (
                <button
                  className="bg-vollio-dark text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    console.log("Leave team:", t.name);
                    setModalContent("exitTeam");
                    setModalOpen(true);
                  }}
                >
                  Leave team
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
