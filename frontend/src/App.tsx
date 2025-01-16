import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./custom.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Stylowanie
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarMainPage from "./components/NavbarMainPage";
import BodyMainPage from "./components/BodyMainPage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import TeamDisplay from "./components/TeamDisplay";
import { AuthProvider } from "./components/AuthContext";
import Example from "./components/Example";
import Teams from "./components/Teams";
import LeaguesDiplay from "./components/LeaguesDisplay";
import LeaguesDisplayCard from "./components/LeaguesDisplayCard";
import Leagues from "./components/Leagues";
import LeagueDetails from "./components/LeagueDetails";
import LeagueDetailsSummary from "./components/LeagueDetailsSummary";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavbarMainPage />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<BodyMainPage></BodyMainPage>}></Route>
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
          </Routes>
          <Footer></Footer>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
