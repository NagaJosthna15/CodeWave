import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const savedUser = JSON.parse(
    localStorage.getItem("codewaveUser")
  );

const [languageStats, setLanguageStats] = useState({
  c: 0,
  cpp: 0,
  java: 0,
  python: 0,
  javascript: 0,
});



useEffect(() => {
  fetch("https://codewave-api-i461.onrender.com/profile-stats")
    .then((res) => res.json())
    .then((data) => {
      setLanguageStats({
        c: data.c || 0,
        cpp: data.cpp || 0,
        java: data.java || 0,
        python: data.python || 0,
        javascript: data.javascript || 0,
      });
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="profilePage">

      <div className="leftSection">

        <div className="profileCard">

          <div className="profileTop">

            <div className="profileCircle">
              {savedUser?.username?.charAt(0).toUpperCase()}
            </div>

            <h1>{savedUser?.username}</h1>

            <p>{savedUser?.email}</p>

          </div>

          <div className="profileStats">

            <div className="profileBox">
              <h2>0</h2>
              <span>Problems Solved</span>
            </div>

            <div className="profileBox">
              <h2>12</h2>
              <span>Day Streak</span>
            </div>

          </div>

        </div>

        <div className="languagesCard">

  <h2>💻 Languages</h2>

  <div className="languageItem">
    <span>💠 C</span>
    <b>{languageStats.c} Solved</b>
  </div>

  <div className="languageItem">
    <span>⚡ C++</span>
    <b>{languageStats.cpp} Solved</b>
  </div>

  <div className="languageItem">
    <span>☕ Java</span>
    <b>{languageStats.java} Solved</b>
  </div>

  <div className="languageItem">
    <span>🐍 Python</span>
    <b>{languageStats.python} Solved</b>
  </div>

  <div className="languageItem">
    <span>🟨 JavaScript</span>
    <b>{languageStats.javascript} Solved</b>
  </div>

</div>

      </div>

      <div className="solvedProblems">
        <div className="solvedHeader">
          <h2>Solved Problems</h2>
            <button
              className="backBtn"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
           </button>
        </div>

        <div className="emptySolved">

          <div className="emptyIcon">📋</div>

          <h3>No problems solved yet.</h3>

          <p>
            Start solving problems and track your progress here!
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;