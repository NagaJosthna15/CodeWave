
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo1 from "../mainlogo.png";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <img src={logo1} alt="logo" />

          <h2>
            Code<span className="wave-text">Wave</span>
          </h2>
        </div>

        <div className="nav-buttons">

          {/* LOGIN BUTTON */}
          <button
            className="login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          {/* SIGNUP BUTTON */}
          <button
            className="signup"
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>

        </div>
      </nav>

      {/* HERO */}
      <div className="hero">

        <div className="left">

          <div className="badge">
            ⚡ Code. Practice. Improve.
          </div>

          <h1>
            Bored of <span>Theory?</span><br />
            Let’s Code for <span className="real">Real</span>
            <span className="rocket"> 🚀</span>
          </h1>

          <p>
            Solve real coding problems, test your logic, and improve your programming skills with CodeWave.
          </p>

          {/* GET STARTED BUTTON */}
          <button
            className="cta"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

        </div>
      </div>

    </div>
  );
}