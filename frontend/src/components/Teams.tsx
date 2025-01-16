import { Badge, Row, Col } from "react-bootstrap";
import TeamDisplay from "./TeamDisplay";
import { useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import TeamAdd from "./TeamAdd";

function Teams() {
  const [addButton, setAddButton] = useState(false);

  const handleAddButtonChange = () => {
    setAddButton((prev) => !prev);
  };

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const hadleRefreshTrigger = () => {
    setRefreshTrigger((prev) => !prev);
    setAddButton((prev) => !prev);
  };

  return (
    <>
      <div className="bg-light p-4 d-flex justify-content-between">
        <h2 className="text-center">Twoje Zespoły</h2>
        <button className="btn btn-primary" onClick={handleAddButtonChange}>
          Dodaj Zespół
        </button>
      </div>
      {addButton ? <TeamAdd onTeamAdded={hadleRefreshTrigger}></TeamAdd> : null}

      <TeamDisplay refreshTrigger={refreshTrigger} />
    </>
  );
}

export default Teams;
