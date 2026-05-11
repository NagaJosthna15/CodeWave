import React, { useEffect, useState } from "react";

import "./Overview.css";

import { useNavigate } from "react-router-dom";

function Overview() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const [totalProblems, setTotalProblems] = useState(0);

  const [easyCount, setEasyCount] = useState(0);

  const [mediumCount, setMediumCount] = useState(0);

  const [hardCount, setHardCount] = useState(0);

  useEffect(() => {

    const fetchCounts = async () => {

      try {

        const totalRes = await fetch(
          "https://codewave-api-i461.onrender.com/questions"
        );

        const easyRes = await fetch(
          "https://codewave-api-i461.onrender.com/questions?difficulty=easy"
        );

        const mediumRes = await fetch(
          "https://codewave-api-i461.onrender.com/questions?difficulty=medium"
        );

        const hardRes = await fetch(
          "https://codewave-api-i461.onrender.com/questions?difficulty=hard"
        );

        const totalData = await totalRes.json();

        const easyData = await easyRes.json();

        const mediumData = await mediumRes.json();

        const hardData = await hardRes.json();

        const totalQuestions = Array.isArray(totalData)
          ? totalData
          : totalData.questions || [];

        const easyQuestions = Array.isArray(easyData)
          ? easyData
          : easyData.questions || [];

        const mediumQuestions = Array.isArray(mediumData)
          ? mediumData
          : mediumData.questions || [];

        const hardQuestions = Array.isArray(hardData)
          ? hardData
          : hardData.questions || [];

        setTotalProblems(totalQuestions.length);

        setEasyCount(easyQuestions.length);

        setMediumCount(mediumQuestions.length);

        setHardCount(hardQuestions.length);

      } catch (error) {

        console.log("API Error:", error);
      }
    };

    fetchCounts();

  }, []);

  useEffect(() => {

    const savedUser = JSON.parse(
      localStorage.getItem("codewaveUser")
    );

    if (
      savedUser &&
      savedUser.username
    ) {

      setUsername(savedUser.username);
    }

  }, []);

  const handleLogout = () => {

    setShowMenu(false);

    localStorage.removeItem("codewaveUser");

    navigate("/login");
  };

  return (

    <div className="dashPage">

      {/* ================= NAVBAR ================= */}

      <nav className="dashNav">

        <h2
          className="dashLogo"
          onClick={() => navigate("/overview")}
          style={{ cursor: "pointer" }}
        >

          Code<span>Wave</span>

        </h2>

        <div className="dashLinks">

          <button className="active">

            Overview

          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >

            Problems

          </button>

        </div>

        {/* PROFILE */}

        <div className="profileWrapper">

          <div

            className="dashProfile"

            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            <span className="profileName">

              {username || "User"}

            </span>

            <span className="arrow">

              ▾

            </span>

          </div>

          {showMenu && (

            <div className="profileMenu">

              <div className="menuUser">

                ⭐ {username || "User"}

              </div>

              <p
                onClick={() =>
                  navigate("/profile")
                }
              >

                My Profile

              </p>

              <p
                onClick={() =>
                  navigate("/editprofile")
                }
              >

                Edit Profile

              </p>

              <hr />

              <button
                onClick={handleLogout}
              >

                LOGOUT

              </button>

            </div>

          )}

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <div className="dashHero">

        <div>

          <h1>

            Welcome back, {username || "Coder"}! 👋

          </h1>

          <p>

            Keep coding, keep improving. You’ve got this! 🚀

          </p>

        </div>

        <div className="streakCard">

          <h2>🔥 12</h2>

          <p>Current Streak</p>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="statsGrid">

        <div className="statCard purple">

          <div className="statIcon">↪</div>

          <p>Total Solved</p>

          <h2>

            0 <span>/ {totalProblems}</span>

          </h2>

          <small>All Problems</small>

        </div>

        <div className="statCard green">

          <div className="statIcon">♻</div>

          <p>Easy</p>

          <h2>

            0 <span>/ {easyCount}</span>

          </h2>

          <small>Solved</small>

        </div>

        <div className="statCard yellow">

          <div className="statIcon">⚡</div>

          <p>Medium</p>

          <h2>

            0 <span>/ {mediumCount}</span>

          </h2>

          <small>Solved</small>

        </div>

        <div className="statCard red">

          <div className="statIcon">☠</div>

          <p>Hard</p>

          <h2>

            0 <span>/ {hardCount}</span>

          </h2>

          <small>Solved</small>

        </div>

      </div>

      {/* ================= MIDDLE GRID ================= */}

      <div className="middleGrid">

        {/* PROGRESS */}

        <div className="panel progressPanel">

          <h3>Progress by Difficulty</h3>

          <div className="progressRow">

            <span>Easy</span>

            <div className="bar">

              <div className="fill easyFill"></div>

            </div>

            <b>60%</b>

          </div>

          <div className="progressRow">

            <span>Medium</span>

            <div className="bar">

              <div className="fill mediumFill"></div>

            </div>

            <b>40%</b>

          </div>

          <div className="progressRow">

            <span>Hard</span>

            <div className="bar">

              <div className="fill hardFill"></div>

            </div>

            <b>20%</b>

          </div>

        </div>

        {/* CALENDAR */}

        <div className="panel calendarPanel">

          <h3>Streak Calendar</h3>

          <div className="days">

            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>

          </div>

          <div className="dotGrid">

            {Array.from({ length: 35 }).map((_, i) => (

              <span
                key={i}
                className={
                  i % 3 === 0
                    ? "hotDot"
                    : ""
                }
              ></span>

            ))}

          </div>

        </div>

        {/* ACTIVITY */}

        <div className="panel activityPanel">

          <h3>Recent Activity</h3>

          {[
            ["Two Sum", "Easy", "Solved"],
            ["Valid Parentheses", "Easy", "Solved"],
            ["Merge k Sorted Lists", "Hard", "Solved"],
            ["Remove Nth Node", "Medium", "Attempted"],
            ["Nth-and-Gates", "Medium", "Attempted"],
          ].map((item, index) => (

            <div
              className="activity"
              key={index}
            >

              <span>{item[0]}</span>

              <b className={item[1].toLowerCase()}>

                {item[1]}

              </b>

              <em>

                {item[2]} ✓

              </em>

            </div>

          ))}

        </div>

      </div>

      {/* ================= BOTTOM GRID ================= */}

      <div className="bottomGrid">

        <div className="panel continuePanel">

          <h3>Continue Solving</h3>

          <div className="solveCard">

            <h4>Maximum Subarray</h4>

            <p>Medium</p>

            <span>62% Completed</span>

            <div className="smallBar">

              <div
                style={{
                  width: "62%"
                }}
              ></div>

            </div>

          </div>

          <div className="solveCard">

            <h4>

              Binary Tree Level Order...

            </h4>

            <p>Easy</p>

            <span>45% Completed</span>

            <div className="smallBar">

              <div
                style={{
                  width: "45%"
                }}
              ></div>

            </div>

          </div>

          <div className="solveCard">

            <h4>Word Ladder</h4>

            <p>Hard</p>

            <span>Not Started</span>

            <div className="smallBar">

              <div
                style={{
                  width: "8%"
                }}
              ></div>

            </div>

          </div>

        </div>

        {/* BADGES */}

        <div className="panel badgesPanel">

          <h3>Badges</h3>

          <div className="badges">

            <div>

              <span>💎</span>

              <b>7</b>

              <p>Days Streak</p>

            </div>

            <div>

              <span>🔷</span>

              <b>50</b>

              <p>Problems</p>

            </div>

            <div>

              <span>💜</span>

              <b>100</b>

              <p>Problems</p>

            </div>

            <div>

              <span>🏆</span>

              <b>Early Bird</b>

              <p>Solver</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Overview;