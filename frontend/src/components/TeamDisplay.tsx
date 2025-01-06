import { useEffect, useState } from "react";
import TeamDisplayCard from "./TeamDisplayCard";

interface clubCard {
  name: string;
  jpgSrc: string;
}

function TeamDisplay() {
  const [teamCard, setTeamCard] = useState<clubCard[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/public/teams")
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
  }, []);

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
