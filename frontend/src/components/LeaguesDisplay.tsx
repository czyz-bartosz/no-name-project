import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import LeaguesDisplayCard from "./LeaguesDisplayCard";
import { useNavigate } from "react-router-dom";

interface LeagueCard {
  id: string;
  name: string;
}

interface refreshAPIleagues {
  refreshtrigger: boolean;
}

function LeaguesDiplay(props: refreshAPIleagues) {
  const [leaguesNames, setLeaguesNames] = useState<LeagueCard[]>([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const fetchLeagues = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/leagues/mine", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedData: LeagueCard[] = data.map((league: any) => ({
          id: league.id,
          name: league.name,
        }));
        setLeaguesNames(mappedData);
      });
  };

  useEffect(() => {
    fetchLeagues();
  }, [isLoggedIn, props.refreshtrigger]);

  const handleLeagueButtonClick = (leagueId: string) => {
    navigate(`/LeagueDetails/${leagueId}`);
  };

  const handleLeagueClick = (leagueId: string) => {
    navigate(`/LeagueDetailsSummary/${leagueId}/table`);
  };

  return (
    <>
      {" "}
      {leaguesNames.map((league) => (
        <LeaguesDisplayCard
          key={league.id}
          leagueName={league.name}
          onButtonClick={() => {
            handleLeagueButtonClick(league.id);
          }}
          onDivClick={() => {
            handleLeagueClick(league.id);
          }}
        />
      ))}
    </>
  );
}
export default LeaguesDiplay;
