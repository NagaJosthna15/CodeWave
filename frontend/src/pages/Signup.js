import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bg from "../bg.jpg";


function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");   // ✅ ADDED
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);   // for password
  const [showConfirm, setShowConfirm] = useState(false);     // for confirm password

  const handleSignup = () => {
  if (!email || !username || !password || !rePassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== rePassword) {
    alert("Passwords do not match");
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("codewaveUser"));

  if (savedUser && savedUser.email === email) {
    alert("You have already used this mail");
    return;
  }

  const userData = {
    email: email,
    username: username,
    password: password,
  };

  localStorage.setItem("codewaveUser", JSON.stringify(userData));

  alert("Account Created Successfully 🎉");

  navigate("/");
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

       <input
  className="inputBox"
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  className="inputBox"   // ✅ ADD THIS
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<div className="passwordBox">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Create Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

<div className="passwordBox">
  <input
    type={showConfirm ? "text" : "password"}
    placeholder="Confirm Password"
    value={rePassword}
    onChange={(e) => setRePassword(e.target.value)}
  />

  <span onClick={() => setShowConfirm(!showConfirm)}>
    {showConfirm ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

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

export default Signup;
