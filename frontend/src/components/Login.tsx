import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate("/");
        //localStorage.setItem("token", data.token);
      } else {
        alert("Błąd logowania");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Wystąpił błąd podczas logowania.");
    }
  };

  return (
    <>
      <main className="d-flex flex-column">
        <div className="bgGray mt-5 heigthLogin">
          <div className="container bg-danger p-5 containerMaxWidth rounded-4">
            <div className="d-flex text-align-center justify-content-center">
              <h2>Zaloguj się</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="row g-3">
                {/* Email */}
                <div className="col-12">
                  <label className="col-form-label">Email: </label>
                  <input
                    type="text"
                    id="inputLogin"
                    className="form-control"
                    aria-describedby="loginHelpInline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="col-12">
                  <label className="col-form-label">Password:</label>
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex text-align-center justify-content-center mt-5">
                <button type="submit" className="btn btn-primary">
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex text-align-center justify-content-center text-black">
            <span>
              Nie masz konta{" "}
              <Link to={"/register"} className="text-white">
                Zarejestruj się
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
