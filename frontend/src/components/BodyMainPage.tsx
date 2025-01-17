import React from "react";
import murawa from "../assets/murawa.jpg"; // Import tła
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
function BodyMainPage() {
  const { isLoggedIn } = useAuth();
  return (
      <div
        className="d-flex align-items-center justify-content-center text-white flex-grow-1 p-5"
        style={{
          background: `url(${murawa}) no-repeat center center/cover`,
          height: "100%"
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-4">Witamy w Generatorze Ligi</h1>
          <p className="lead mb-5">
            Zarządzaj meczami, ligami i zespołami z łatwością!
          </p>

          {/* Karty Bootstrap */}
          <div className="row g-4">
            {/* Karta 1: Przeglądaj mecze */}
            <div className="col-md-4">
              <div className="card text-center h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">Przeglądaj mecze</h5>
                  <p className="card-text">
                    Zobacz wszystkie nadchodzące i zakończone mecze.
                  </p>
                  <Link
                    to={isLoggedIn ? "/Matches" : "/login"}
                    className="btn btn-danger"
                  >
                    Przeglądaj
                  </Link>
                </div>
              </div>
            </div>

            {/* Karta 2: Utwórz ligę */}
            <div className="col-md-4">
              <div className="card text-center h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">Utwórz ligę</h5>
                  <p className="card-text">
                    Stwórz nową ligę i zarządzaj rozgrywkami.
                  </p>
                  <Link
                    to={isLoggedIn ? "/Leagues" : "/login"}
                    className="btn btn-success"
                  >
                    Utwórz
                  </Link>
                </div>
              </div>
            </div>

            {/* Karta 3: Dodaj zespoły */}
            <div className="col-md-4">
              <div className="card text-center h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">Dodaj zespoły</h5>
                  <p className="card-text">
                    Dodaj nowe zespoły do swojej ligi.
                  </p>
                  <Link
                    to={isLoggedIn ? "/Teams" : "/login"}
                    className="btn btn-warning"
                  >
                    Dodaj
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default BodyMainPage;
