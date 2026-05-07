


/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://codewave-api-i461.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => {

        // 🔥 Check API response
        console.log("API DATA:", data);

        // 🔥 Store API data
        setProblems([...data]);

        setLoading(false);
      })
      .catch((err) => {

        // 🔥 Error check
        console.log("ERROR:", err);

        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        color: "white"
      }}
    >
      <h1
        style={{
          fontSize: "55px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}
      >
        Problems
      </h1>

      {/* 🔥 Total problems count 
      <p
        style={{
          marginBottom: "30px",
          color: "#94a3b8"
        }}
      >
        Total Problems: {problems.length}
      </p>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        problems.map((p, index) => (
          <div
            key={index}
            onClick={() => navigate("/problem", { state: p })}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {/* 🔥 Question Title 
            <h2>{p.Title}</h2>

            {/* 🔥 Difficulty 
            <p
              style={{
                color:
                  p.Difficulty === "Easy"
                    ? "#22c55e"
                    : p.Difficulty === "Medium"
                    ? "#eab308"
                    : "#ef4444",
                fontWeight: "bold"
              }}
            >
              {p.Difficulty}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
useEffect(() => {

  axios
    .get("https://codewave-api-i461.onrender.com/questions/")
    .then((res) => {

      console.log("API DATA:", res.data);

      setProblems(res.data);

      setLoading(false);
    })

    .catch((err) => {

      console.log("FULL ERROR:", err);

      alert("API Error");

      setLoading(false);
    });

    }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        color: "white"
      }}
    >
      <h1
        style={{
          fontSize: "55px",
          fontWeight: "bold"
        }}
      >
        Problems
      </h1>

      <p>Total Problems: {problems.length}</p>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        problems.map((p, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>{p.Title}</h2>

            <p>{p.Difficulty}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;