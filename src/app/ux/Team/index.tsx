import getName from "@/app/functions/elo/getName";
import { useEffect } from "react";

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

export default function Team({ team }: { team: TeamInteface[] }) {
  useEffect(() => {
    console.log("Team data:", team);
  }, [team]);

  return (
    <div className="flex flex-col w-full uppercase">
      <ul className=" flex flex-col gap-4">
        {team?.map((t, i) => (
          <li
            key={i + 1}
            className="flex flex-col gap-2 border-vollio-dark border-solid border-2 rounded-lg p-4"
          >
            <h2 className="text-2xl font-bold">{t?.name ?? ""}</h2>
            <h3 className="text-xl font-semibold">
              Elo: {t.elo ? getName(t.elo) : ""}
            </h3>
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold">Members:</h4>
              <ul className="list-disc list-inside">
                {t?.players?.map((member, index) => (
                  <li key={index} className=" flex flex-row justify-between">
                    <p>
                      {member?.username ?? ""} - Elo:{" "}
                      {member.elo ? getName(member.elo) : ""} - Games:{" "}
                      {member?.gamesPlayed ?? ""}
                    </p>
                    {member.isAdmin ? (
                      <span className="text-green-500 font-bold">Admin</span>
                    ) : (
                      <button className="text-red-500 font-bold" onClick={() => {
                        alert("Remove member");
                        console.log("Remove member:", member.id);
                      }}>
                        delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="bg-vollio-dark text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                alert("Leave team");
                console.log("Leave team:", t.name);
              }}
            >
              Leave team
            </button>
            <button
              className="bg-vollio-dark text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                alert("Delete team");
                console.log("Delete team:", t.name);
              }}
            >
              Delete team
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
