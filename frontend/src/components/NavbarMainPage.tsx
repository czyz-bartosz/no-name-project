import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
function NavbarMainPage() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark p-3 navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src="/src/assets/Logo.png" alt="logo" width={100} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active bg-danger rounded-2 me-3"
                      to="/Matches"
                    >
                      Twoje Mecze
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active bg-danger rounded-2 me-3"
                      to="/Teams"
                    >
                      Twoje Zespoły
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active bg-danger rounded-2 me-3"
                      to="/Leagues"
                    >
                      Twoje Ligi
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="btn nav-link" onClick={logout}>
                      Wyloguj
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link active bg-danger rounded-2"
                    aria-current="page"
                    to="/login"
                  >
                    Zaloguj się
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarMainPage;
