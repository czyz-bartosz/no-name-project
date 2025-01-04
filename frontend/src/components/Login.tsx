import Footer from "./Footer";
import NavbarMainPage from "./NavbarMainPage";

function Login() {
  return (
    <>
      <NavbarMainPage></NavbarMainPage>
      <div className="bgGray mt-5 heigthLogin ">
        <div className="container   bg-danger p-5 containerMaxWidth rounded-4">
          <div className="d-flex text-align-center justify-content-center">
            <h2 className="">Zaloguj się</h2>
          </div>
          <div className="row g-3">
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
              <label className="col-form-label">Password:</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                aria-describedby="passwordHelpInline"
              />
            </div>
          </div>

          <div className="d-flex text-align-center justify-content-center mt-5">
            <button className="btn btn-primary"> Zaloguj</button>
          </div>
        </div>
        <div className="d-flex text-align-center justify-content-center text-black">
          <span>
            Nie masz konta <a className="text-white">Zarejestruj się </a>
          </span>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
