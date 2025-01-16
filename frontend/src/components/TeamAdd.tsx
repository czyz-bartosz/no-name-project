import { useState } from "react";

interface props {
  onTeamAdded: () => void;
}

function TeamAdd(props: props) {
  const [teamName, setTeamName] = useState("");
  const [jpgSrc, setJpgSrc] = useState<string | null>(null);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };
  const handleJpgSrcSetting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setJpgSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam = { name: teamName, base64Logo: jpgSrc };
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTeam),
    })
      .then((response) => {
        if (response.ok) {
          alert("zespół dodany pomyślnie");
          props.onTeamAdded();
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
          <label className="form-label">Nazwa zespołu:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={teamName}
            onChange={handleTeamNameChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Wybierz logo (plik JPG):</label>
          <input
            type="file"
            className="form-control"
            accept="image/jpeg"
            onChange={handleJpgSrcSetting}
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ">
            Dodaj Zespół
          </button>
        </div>
      </form>
    </>
  );
}
export default TeamAdd;
