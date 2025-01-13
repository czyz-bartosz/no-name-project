import { FormEvent, ReactEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSetSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleSetLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/public/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: login,
          password: password,
        }),
      });

      if (response.ok) {
        navigate("/Login");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Wystąpił błąd podczas rejestracji");
      }
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił problem z połączeniem. Spróbuj ponownie później.");
    }
  };

  return (
    <>
      <div className="bgGray mt-4 heigthLogin ">
        <form onSubmit={handleRegistration}>
          <div className="container   bg-danger p-5 containerMaxWidth rounded-4">
            <div className="d-flex text-align-center justify-content-center">
              <h2 className="">Zarejstruj się</h2>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <label className="col-form-label">Imie: </label>
                <input
                  type="text"
                  id="inputLogin"
                  className="form-control"
                  aria-describedby="loginHelpInline"
                  value={name}
                  onChange={handleSetName}
                />
              </div>
              <div className="col-12">
                <label className="col-form-label">Nazwisko: </label>
                <input
                  type="text"
                  id="inputLogin"
                  className="form-control"
                  aria-describedby="loginHelpInline"
                  value={surname}
                  onChange={handleSetSurname}
                />
              </div>
              {/* Login */}
              <div className="col-12">
                <label className="col-form-label">Email: </label>
                <input
                  type="text"
                  id="inputLogin"
                  className="form-control"
                  aria-describedby="loginHelpInline"
                  value={login}
                  onChange={handleSetLogin}
                />
              </div>

              {/* Password */}
              <div className="col-12">
                <label className="col-form-label">Hasło:</label>
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  value={password}
                  onChange={handleSetPassword}
                />
              </div>
            </div>

            <div className="d-flex text-align-center justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                {" "}
                Zarejstruj się
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
