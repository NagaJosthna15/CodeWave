import React, { useState } from "react";
import "./Login.css";

import { useNavigate } from "react-router-dom";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bg from "../bg.jpg";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div
      className="container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="loginBox">

        <h1 className="title">
          Welcome <span>back!</span>
        </h1>

        <p className="subtitle">
          Log in to your account
        </p>

        {/* EMAIL */}
        <input
          className="inputBox"
          type="email"
          placeholder="Email"
        />

        {/* PASSWORD */}
        <div className="passwordBox">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        {/* OPTIONS */}
        <div className="options">

          <label className="remember">

            <input type="checkbox" />

            Remember me

          </label>

          <p className="forgot">
            Forgot Password?
          </p>

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="loginBtn"
          onClick={() => navigate("/dashboard")}
        >
          Log In
        </button>

        {/* CONTINUE */}
        <p className="continue">
          Or continue with
        </p>

        {/* SOCIALS */}
        <div className="socials">

          <div className="icon">
            <FcGoogle />
          </div>

          <div className="icon">
            <FaGithub />
          </div>

          <div className="icon linkedin">
            <FaLinkedinIn />
          </div>

        </div>

        {/* SIGNUP */}
        <p className="signup">

          No account?{" "}

          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Create account →
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;