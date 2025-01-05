import Footer from "./Footer";
import NavbarMainPage from "./NavbarMainPage";

function Register() {
  return (
    <>
      <div className="bgGray mt-4 heigthLogin ">
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
              />
            </div>
            <div className="col-12">
              <label className="col-form-label">Nazwisko: </label>
              <input
                type="text"
                id="inputLogin"
                className="form-control"
                aria-describedby="loginHelpInline"
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
              />
            </div>
          </div>

          <div className="d-flex text-align-center justify-content-center mt-4">
            <button className="btn btn-primary"> Zarejstruj się</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
