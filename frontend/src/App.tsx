import "./custom.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Stylowanie
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BodyMainPage from "./components/BodyMainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import Teams from "./components/Teams";
import Leagues from "./components/Leagues";
import LeagueDetails from "./components/LeagueDetails";
import LeagueDetailsSummary from "./components/LeagueDetailsSummary";
import Layout from "./components/Layout";
import RefereePage from "./components/referee/RefereePage";
import UpdateMatchPage from "./components/referee/UpdateMatchPage";
import Matches from "./components/Matches";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>  
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route index element={<BodyMainPage></BodyMainPage>}></Route>
              <Route path="/Teams" element={<Teams></Teams>}></Route>
              <Route path="/Leagues" element={<Leagues></Leagues>}></Route>
              <Route
                path="/LeagueDetails/:id"
                element={<LeagueDetails></LeagueDetails>}
              ></Route>
              <Route
                path="/LeagueDetailsSummary/:id/table"
                element={<LeagueDetailsSummary></LeagueDetailsSummary>}
              ></Route>
              <Route path="/RefereePanel" element={<RefereePage />}></Route>
              <Route path="/RefereePanel/UpdateMatch/:id" element={<UpdateMatchPage />}></Route>
              <Route path="/Matches" element={<Matches />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
