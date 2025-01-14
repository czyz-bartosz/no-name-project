import { useEffect, useState } from "react";
import TeamDisplayCard from "./TeamDisplayCard";
import { useAuth } from "./AuthContext";

interface clubCard {
  name: string;
  jpgSrc: string;
}

function TeamDisplay() {
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
          name: item.name, // Pobierz właściwość "name"
          jpgSrc: item.logoUrl, // Zamień "logoUrl" na "jpgSrc"
        }));
        setTeamCard(mappedData); // Ustaw stan z przekształconymi danymi
      })
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
  }, [isLoggedIn]);

  return (
    <>
      {teamCard.map((team) => (
        <TeamDisplayCard
          key={team.name}
          nameOfClub={team.name}
          logoUrl={team.jpgSrc}
        ></TeamDisplayCard>
      ))}
    </>
  );
}
export default TeamDisplay;
