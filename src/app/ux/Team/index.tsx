import deleteTeam from "@/app/api/team/deleteTeam";
import exitFromTeam from "@/app/api/team/exitFromTeam";
import getName from "@/app/functions/elo/getName";
import H2_component from "@/app/Text/H2_component";
import H3_component from "@/app/Text/H3_component";
import H4_component from "@/app/Text/H4_component";
import Text from "@/app/Text/Text";
import { useEffect, useState } from "react";

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

export default function Team({
  team,
  isAdmin,
}: {
  team: TeamInteface[];
  isAdmin: boolean;
}) {
  const [teamData, setTeamData] = useState<TeamInteface[]>(team);

  useEffect(() => {
    setTeamData(team);
  }, [team]);

  useEffect(() => {
    console.log("Team data updated:", teamData);
  }, [teamData]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "" | "deleteUser" | "exitTeam" | "deleteTeam"
  >("");
  const [selectedPlayer, setSelectedPlayer] = useState<Member | null>(null);

  return (
    <>
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
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
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
                  exitFromTeam({
                    token: sessionStorage.getItem("token") ?? "",
                    exitUserId: ``,
                  })
                    .then((response) => {
                      console.log("Response from exitFromTeam:", response);
                      document.location.href = "/create-team";
                      setModalOpen(false);
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
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
                  deleteTeam(sessionStorage.getItem("token") ?? "")
                    .then((response) => {
                      console.log("Response from exitFromTeam:", response);
                      document.location.href = "/create-team";
                      setModalOpen(false);
                    })
                    .catch((error) => {
                      console.error("Error in exitFromTeam:", error);
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
              <H3_component>
                Elo: {t.elo ? `${t.elo} - ${getName(t.elo)}` : ""}
              </H3_component>
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
