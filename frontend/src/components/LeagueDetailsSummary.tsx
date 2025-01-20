import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useParams } from "react-router-dom";
import TeamVsTeamCard from "./TeamVsTeamCard";

interface leagueTable {
  teamId: string;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

export interface team {
  id: string;
  name: string;
  logoUrl: string;
}

interface leagueName {
  name: string;
}

interface scheduleMatch {
  homeTeamId: string;
  awayTeamId: string;
  startDatetime: string;
}

function LeagueDetailsSummary() {
  const { id: leagueId } = useParams();
  const [leagueTable, setLeagueTable] = useState<leagueTable[]>([]);
  const [teams, setTeams] = useState<team[]>([]);
  const [leagueName, setLeagueName] = useState("");
  const [scheduleMatch, setScheduleMatch] = useState<scheduleMatch[]>([]);
  const [generateButton, setGenerateButton] = useState(false);

  const handleGenerateButtonChange = () => {
    setGenerateButton((prev) => !prev);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/public/leagues/${leagueId}/table`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappeddata: leagueTable[] = data.map((col: any) => ({
          teamId: col.id,
          teamName: col.teamName,
          wins: col.wins,
          draws: col.draws,
          losses: col.losses,
          points: col.points,
        }));
        setLeagueTable(mappeddata);
      });

    fetch(`http://localhost:4000/public/leagues/${leagueId}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedData2: team[] = data.map((teamOne: any) => ({
          id: teamOne.id,
          name: teamOne.name,
          logoUrl: teamOne.logoUrl,
        }));
        setTeams(mappedData2);
      });

    fetch(`http://localhost:4000/public/leagues/${leagueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLeagueName(data.name);
      });
  }, [leagueId]);

  const generate = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/leagues/${leagueId}/matches/generate`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("generowanie pomyślnie");
          handleGenerateButtonChange();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/public/leagues/${leagueId}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappeddata4: scheduleMatch[] = data.map((col: any) => ({
          homeTeamId: col.homeTeamId,
          awayTeamId: col.awayTeamId,
          startDatetime: col.startDatetime,
        }));
        setScheduleMatch(mappeddata4);
      });
  }, [generateButton]);

  useEffect(() => {
    fetch(`http://localhost:4000/public/leagues/${leagueId}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappeddata4: scheduleMatch[] = data.map((col: any) => ({
          homeTeamId: col.homeTeamId,
          awayTeamId: col.awayTeamId,
          startDatetime: col.startDatetime,
        }));
        setScheduleMatch(mappeddata4);
      });
  }, []);

  return (
    <>
      <div className="text-dark bg-light p-3 mb-2">
        <h1>Liga {leagueName} </h1>
        <h3>Tabela</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">teamId</th>
            <th scope="col">teamName</th>
            <th scope="col">wins</th>
            <th scope="col">draws</th>
            <th scope="col">losses</th>
            <th scope="col">points</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((team, index) => (
            <tr key={team.teamId}>
              <th scope="row">{index + 1}</th>
              <td>{team.teamName}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-white bg-dark p-3">
        <h1>Zespoły w lidze</h1>
      </div>
      {teams.map((teamOne) => (
        <div className="col-md-11 position-relative d-flex shadow justify-content-between border border-3 align-items-center bg-light border-dark mt-3 mb-2 p-5 rounded-5 border-opacity-75 m-auto ">
          <h2>{teamOne.name}</h2>
          <img
            src={"http://localhost:4000" + teamOne.logoUrl}
            alt=""
            width={100}
          />
        </div>
      ))}
      <div className="text-white bg-dark p-3 d-flex justify-content-between mb-5 ">
        <h1>Terminarz</h1>
        <button onClick={generate} className="btn btn-primary">
          Generuj Terminarz
        </button>
      </div>
      {
        <div>
          {scheduleMatch.map((match, index) => (
            <TeamVsTeamCard
              teams={teams}
              homeTeamId={match.homeTeamId}
              awayTeamId={match.awayTeamId}
              startDatetime={match.startDatetime}
            ></TeamVsTeamCard>
          ))}
        </div>
      }
    </>
  );
}
export default LeagueDetailsSummary;
