import { team } from "./LeagueDetailsSummary";

interface scheduleMatch {
  teams: team[];
  homeTeamId: string;
  awayTeamId: string;
  startDatetime: string;
}

function TeamVsTeamCard(props: scheduleMatch) {
  const teamHome: team | undefined = props.teams.find(
    (team) => team.id === props.homeTeamId
  );
  const teamAway: team | undefined = props.teams.find(
    (team) => team.id === props.awayTeamId
  );

  return (
    <>
      <div className="d-flex justify-content-around align-items-center bg-light mb-2 p-3 ms-2 me-2 rounded-5">
        <div className="text-center">
          <img
            src={`http://localhost:4000${teamHome?.logoUrl}`}
            alt={teamHome?.name || "Home Team Logo"}
            width={100}
          />
          <h2>{teamHome?.name || "Unknown Team"}</h2>
        </div>

        <div>
          <h4>{new Date(props.startDatetime).toLocaleString()}</h4>
        </div>

        <div className="text-center">
          <img
            src={`http://localhost:4000${teamAway?.logoUrl}`}
            alt={teamAway?.name || "Away Team Logo"}
            width={100}
          />
          <h2>{teamAway?.name || "Unknown Team"}</h2>
        </div>
      </div>
    </>
  );
}

export default TeamVsTeamCard;
