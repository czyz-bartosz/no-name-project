import { useEffect, useState } from "react";
import TeamDisplayCard from "./TeamDisplayCard";
import { useAuth } from "./AuthContext";

interface clubCard {
  id: string;
  name: string;
  jpgSrc: string;
}

interface TeamDisplayProps {
  refreshTrigger: boolean;
}

function TeamDisplay({ refreshTrigger }: TeamDisplayProps) {
  const [teamCard, setTeamCard] = useState<clubCard[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) setTeamCard([]);
    const token = localStorage.getItem("token");
    console.log("isLoggedIn zmienił się na:", isLoggedIn);
    fetch("http://localhost:4000/teams/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Przekształć dane z API, aby pasowały do interfejsu
        const mappedData: clubCard[] = data.map((item: any) => ({
          id: item.id,
          name: item.name, // Pobierz właściwość "name"
          jpgSrc: item.logoUrl, // Zamień "logoUrl" na "jpgSrc"
        }));
        setTeamCard(mappedData); // Ustaw stan z przekształconymi danymi
      })
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
  }, [isLoggedIn, refreshTrigger]);

  const handleRemoveTeam = (teamId: string) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/teams/${teamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setTeamCard((prev) => prev.filter((team) => team.id !== teamId));
        }
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania zespołu", error);
      });
  };

  return (
    <>
      {teamCard.map((team) => (
        <TeamDisplayCard
          id={team.id}
          key={team.name}
          nameOfClub={team.name}
          logoUrl={team.jpgSrc}
          onRemove={() => handleRemoveTeam(team.id)}
        ></TeamDisplayCard>
      ))}
    </>
  );
}
export default TeamDisplay;
