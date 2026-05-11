import React, { useState } from "react";

import "./Login.css";

import { useNavigate } from "react-router-dom";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import bg from "../bg.jpg";

function Login() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  /* LOGIN FUNCTION */

  const handleLogin =
    () => {

      // EMPTY CHECK

      if (
        email.trim() === "" ||
        password.trim() === ""
      ) {

        alert(
          "Please enter email and password"
        );

        return;
      }

      // GET USER FROM LOCAL STORAGE

      const savedUser =

        JSON.parse(

          localStorage.getItem(
            "codewaveUser"
          )
        );

      // IF USER DOESN'T EXIST

      if (!savedUser) {

        alert(
          "No account found. Please signup first."
        );

        return;
      }

      // CHECK EMAIL & PASSWORD

      if (

        email ===
          savedUser.email &&

        password ===
          savedUser.password

      ) {

        alert(
          "Login Successful"
        );

        // 🔥 OVERVIEW PAGE OPEN

        navigate(
          "/overview"
        );

      } else {

        alert(
          "Invalid Email or Password"
        );
      }
    };

  return (

    <div

      className="container"

      style={{

        backgroundImage:
          `url(${bg})`,

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",

        backgroundRepeat:
          "no-repeat",

        minHeight:
          "100vh"
      }}
    >

      <div className="right">

        {/* TITLE */}

        <h1 className="title">

          Welcome{" "}

          <span className="blueText">

            back

          </span>

          !

        </h1>

        <p className="subtitle">

          Log in to your account

        </p>

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

        />

        {/* PASSWORD */}

        <div className="passwordBox">

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

          />

          <span

            className="eyeIcon"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

          >

            {showPassword
              ? <FaEyeSlash />
              : <FaEye />
            }

          </span>

        </div>

        {/* OPTIONS */}

        <div className="options">

          <label className="leftOption">

            <input type="checkbox" />

            Remember me

          </label>

          <span className="forgot">

            Forgot Password?

          </span>

        </div>

        {/* LOGIN BUTTON */}

        <button

          className="loginBtn"

          onClick={handleLogin}

        >

          Log In

        </button>

        {/* SOCIAL LOGIN */}

        <p className="or">

          Or continue with

        </p>

        <div className="socials">

          <div className="icon">

            <FcGoogle />

          </div>

          <div className="icon">

            <FaGithub color="#ffffff" />

          </div>

          <div className="icon linkedin">

            <FaLinkedinIn color="#ffffff" />

          </div>

        </div>

        {/* SIGNUP */}

        <p className="signup">

          No account?{" "}

          <span
            onClick={() =>
              navigate("/signup")
            }
          >

            Create account →

          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;
