import { useState } from "react";
import LeagueAdd from "./LeagueAdd";
import LeaguesDiplay from "./LeaguesDisplay";

function Leagues() {
  const [refreshAPIleagues, setRefreshLeagues] = useState(false);

  const handleRefreshApiLeagues = () => {
    setRefreshLeagues((prev) => !prev);
  };
  const [addButton, setAddButton] = useState(false);

  const handleAddButtonChange = () => {
    setAddButton((prev) => !prev);
  };
  return (
    <>
      <div className="bg-light p-4 d-flex justify-content-between">
        <h2 className="text-center">Twoje Ligi</h2>
        <button className="btn btn-primary" onClick={handleAddButtonChange}>
          Dodaj Lige
        </button>
      </div>
      {addButton ? (
        <LeagueAdd onLeagueAdded={handleRefreshApiLeagues}></LeagueAdd>
      ) : null}

      <LeaguesDiplay refreshtrigger={refreshAPIleagues}></LeaguesDiplay>
    </>
  );
}

export default Leagues;
