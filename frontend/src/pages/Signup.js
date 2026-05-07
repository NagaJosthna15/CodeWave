/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSignup = () => {
    if (!email || !password || !rePassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account Created Successfully 🎉");
  };

  return (
    <div className="container">

      <div className="right">

        <h1 className="title">
          Create Account
        </h1>

        <p className="subtitle">
          Sign up to get started
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Comfirm Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <button className="loginBtn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="signup">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login →
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bg from "../bg.jpg";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = () => {

    if (!email || !username || !password || !rePassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account Created Successfully 🎉");
  };

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

      <div className="right">

        <h1 className="title">
          Create Account
        </h1>

        <p className="subtitle">
          Sign up to get started
        </p>

        {/* EMAIL */}
        <input
          className="inputBox"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* USERNAME */}
        <input
          className="inputBox"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="passwordBox">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eyeIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="passwordBox">

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />

          <span
            className="eyeIcon"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        {/* BUTTON */}
        <button
          className="loginBtn"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* LOGIN */}
        <p className="signup">

          Already have an account?{" "}

          <span onClick={() => navigate("/")}>
            Login →
          </span>

        </p>

      </div>

    </div>
  );
}

export default Signup;