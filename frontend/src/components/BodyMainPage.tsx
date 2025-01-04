import React from "react";
import murawa from "../assets/murawa.jpg"; // Import tła

function BodyMainPage() {
  return (
    <div
      className="background-image d-flex align-items-center justify-content-center text-white"
      style={{
        background: `url(${murawa}) no-repeat center center/cover`,
        height: "100vh",
        width: "100%",
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
                <a href="#" className="btn btn-primary">
                  Przeglądaj
                </a>
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
                <a href="#" className="btn btn-success">
                  Utwórz
                </a>
              </div>
            </div>
          </div>

          {/* Karta 3: Dodaj zespoły */}
          <div className="col-md-4">
            <div className="card text-center h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">Dodaj zespoły</h5>
                <p className="card-text">Dodaj nowe zespoły do swojej ligi.</p>
                <a href="#" className="btn btn-warning">
                  Dodaj
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyMainPage;
