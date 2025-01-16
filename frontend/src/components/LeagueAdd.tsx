import { useState } from "react";

interface props {
  onLeagueAdded: () => void;
}

function LeagueAdd(props: props) {
  const [leagueName, setLeagueName] = useState("");

  const handleLeagueNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeagueName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeague = { name: leagueName };
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/leagues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newLeague),
    })
      .then((response) => {
        if (response.ok) {
          alert("liga dodana pomyślnie");
          props.onLeagueAdded();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <form className="bg-dark text-light p-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nazwa ligi:</label>
          <input
            type="text"
            className="form-control"
            value={leagueName}
            onChange={handleLeagueNameChange}
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ">
            Dodaj Lige
          </button>
        </div>
      </form>
    </>
  );
}
export default LeagueAdd;
