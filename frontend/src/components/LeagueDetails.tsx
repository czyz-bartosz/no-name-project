import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface clubCard {
  id: string;
  name: string;
  jpgSrc: string;
}

function LeagueDetails() {
  const { id: leagueId } = useParams();
  const [teams, setTeams] = useState<clubCard[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
  const { isLoggedIn } = useAuth();

  const fetchTeams = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/teams/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedData: clubCard[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          jpgSrc: item.logoUrl,
        }));
        setTeams(mappedData);
      })
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
  };

  useEffect(() => {
    fetchTeams();
  }, [isLoggedIn]);

  const handleTeamSelection = (teamId: string) => {
    setSelectedTeams((prev) => {
      const updated = new Set(prev);

      if (updated.has(teamId)) updated.delete(teamId);
      else updated.add(teamId);
      return updated;
    });
  };

  const handleTeamsAddToLeague = async (
    leagueId: string,
    selectedArray: string[]
  ) => {
    const token = localStorage.getItem("token");

    for (const teamId of selectedArray) {
      const response = await fetch(
        `http://localhost:4000/leagues/${leagueId}/teams`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ teamId }),
        }
      );
    }
    alert("Zespoły zostały dodane do ligi!");
  };

  return (
    <>
      <div className="bg-light p-4 d-flex justify-content-between">
        <h2>Dodaj zespoły do Ligi</h2>
      </div>

      <div>
        {teams.map((team) => (
          <div
            key={team.id}
            className="col-md-11 position-relative d-flex shadow justify-content-between border border-3 align-items-center bg-light border-dark mt-5 mb-5 p-5 rounded-5 border-opacity-75 m-auto "
          >
            <img
              src={"http://localhost:4000" + team.jpgSrc}
              alt=""
              width={120}
            />
            <h2>{team.name}</h2>

            <div
              className="btn-group"
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <input
                type="checkbox"
                className="btn-check"
                id={`btncheck-${team.id}`}
                autoComplete="off"
                onChange={() => handleTeamSelection(team.id)}
                checked={selectedTeams.has(team.id)}
              />
              <label
                className="btn btn-outline-primary"
                htmlFor={`btncheck-${team.id}`}
              >
                Wybierz
              </label>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-center p-5">
          <button
            className="btn btn-primary "
            onClick={() =>
              handleTeamsAddToLeague(leagueId!, Array.from(selectedTeams))
            }
          >
            Dodaj zespoły do ligi
          </button>
        </div>
      </div>
    </>
  );
}
export default LeagueDetails;
