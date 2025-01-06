import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarMainPage from "./components/NavbarMainPage";
import BodyMainPage from "./components/BodyMainPage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import TeamDisplay from "./components/TeamDisplay";

function App() {
  return (
    <>
      <Router>
        <NavbarMainPage />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<BodyMainPage></BodyMainPage>}></Route>
        </Routes>
        <Footer></Footer>

        <TeamDisplay></TeamDisplay>
      </Router>
    </>
  );
}

export default App;
