import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";

import dashboardBg from "../dashboard_bg.png";

function Dashboard() {

  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedDifficulty,
    setSelectedDifficulty] =
    useState("All");

  // MULTIPLE TOPICS

  const [selectedTopics,
    setSelectedTopics] =
    useState([]);

  const [currentPage,
    setCurrentPage] =
    useState(1);

  // 10 QUESTIONS PER PAGE

  const questionsPerPage = 10;

  // API CALL

  useEffect(() => {

    axios
      .get(
        "https://codewave-api-i461.onrender.com/questions/"
      )

      .then((res) => {

        setProblems(res.data);

        setLoading(false);

      })

      .catch((err) => {

        console.log(err);

        setLoading(false);

      });

  }, []);

  // COUNTS

  const easyCount = problems.filter(
    (p) => p.Difficulty === "Easy"
  ).length;

  const mediumCount = problems.filter(
    (p) => p.Difficulty === "Medium"
  ).length;

  const hardCount = problems.filter(
    (p) => p.Difficulty === "Hard"
  ).length;

  // UNIQUE TOPICS

  const uniqueTopics = [

    ...new Set(

      problems

        .flatMap((p) =>

          p.Topics
            ? p.Topics.split(",")
            : []

        )

        .map((topic) =>
          topic.trim()
        )

        .filter(Boolean)

    )

  ];

  // FILTERS

  const filteredProblems =
    problems.filter((p) => {

      // SEARCH

      const matchesSearch =
        p.Title.toLowerCase().includes(
          searchTerm.toLowerCase()
        );

      // DIFFICULTY

      const matchesDifficulty =

        selectedDifficulty === "All"

          ? true

          : p.Difficulty ===
            selectedDifficulty;

      // TOPICS

      const matchesTopic =

        selectedTopics.length === 0

          ? true

          : p.Topics &&
            selectedTopics.every(
              (topic) =>

                p.Topics
                  .split(",")

                  .map((t) =>
                    t.trim()
                  )

                  .includes(topic)
            );

      return (

        matchesSearch &&
        matchesDifficulty &&
        matchesTopic

      );

    });

  // PAGINATION

  const totalPages = Math.ceil(

    filteredProblems.length /
      questionsPerPage

  );

  const startIndex =

    (currentPage - 1) *
    questionsPerPage;

  const currentQuestions =

    filteredProblems.slice(

      startIndex,

      startIndex + questionsPerPage

    );

  // TOGGLE TOPICS

  const toggleTopic = (topic) => {

    if (
      selectedTopics.includes(topic)
    ) {

      setSelectedTopics(

        selectedTopics.filter(
          (t) => t !== topic
        )

      );

    } else {

      setSelectedTopics([
        ...selectedTopics,
        topic
      ]);

    }

    setCurrentPage(1);

  };

  return (

    <div

      style={{

        minHeight: "100vh",

        backgroundImage: `
          url(${dashboardBg})
        `,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        backgroundAttachment: "fixed",

        color: "white",

        display: "flex",

        gap: "22px",

        padding: "18px",

        fontFamily: "Poppins"
      }}
    >

      {/* SIDEBAR */}

      <div

        style={{

          width: "280px",

          background:
            "rgba(7,15,40,0.78)",

          backdropFilter:
            "blur(10px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          borderRadius: "22px",

          padding: "24px",

          height: "95vh",

          overflowY: "auto"
        }}
      >

        <h1

          style={{

            marginBottom: "26px",

            fontSize: "24px"
          }}
        >
          Problems
        </h1>

        {/* ALL PROBLEMS */}

        <div

          style={{

            background: "#24195d",

            padding: "13px",

            borderRadius: "12px",

            display: "flex",

            justifyContent:
              "space-between",

            marginBottom: "18px",

            fontSize: "15px"
          }}
        >

          <span>
            All Problems
          </span>

          <span>
            {problems.length}
          </span>

        </div>

        {/* EASY */}

        <div

          style={{

            display: "flex",

            justifyContent:
              "space-between",

            marginBottom: "12px",

            color: "#22c55e",

            fontSize: "15px"
          }}
        >

          <span>Easy</span>

          <span>{easyCount}</span>

        </div>

        {/* MEDIUM */}

        <div

          style={{

            display: "flex",

            justifyContent:
              "space-between",

            marginBottom: "12px",

            color: "#eab308",

            fontSize: "15px"
          }}
        >

          <span>Medium</span>

          <span>{mediumCount}</span>

        </div>

        {/* HARD */}

        <div

          style={{

            display: "flex",

            justifyContent:
              "space-between",

            marginBottom: "32px",

            color: "#ef4444",

            fontSize: "15px"
          }}
        >

          <span>Hard</span>

          <span>{hardCount}</span>

        </div>

        {/* TOPICS */}

        <div>

          <h2

            style={{

              marginBottom: "20px",

              fontSize: "22px"
            }}
          >
            Topics
          </h2>

          {uniqueTopics.map(
            (topic, index) => (

              <div

                key={index}

                onClick={() =>
                  toggleTopic(topic)
                }

                style={{

                  display: "flex",

                  alignItems:
                    "center",

                  gap: "12px",

                  marginBottom:
                    "15px",

                  cursor: "pointer"
                }}
              >

                {/* CHECKBOX */}

                <div

                  style={{

                    width: "18px",

                    height: "18px",

                    borderRadius:
                      "4px",

                    border:
                      "2px solid white",

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    background:
                      selectedTopics.includes(
                        topic
                      )
                        ? "#22c55e"
                        : "transparent"
                  }}
                >

                  {selectedTopics.includes(
                    topic
                  ) && (

                    <span

                      style={{

                        color: "white",

                        fontSize:
                          "11px",

                        fontWeight:
                          "bold"
                      }}
                    >
                      ✓
                    </span>

                  )}

                </div>

                {/* TOPIC NAME */}

                <span

                  style={{

                    color:
                      selectedTopics.includes(
                        topic
                      )
                        ? "#22c55e"
                        : "#cbd5e1",

                    fontSize: "14px"
                  }}
                >
                  {topic}
                </span>

              </div>

            )
          )}

        </div>

        {/* COMPANIES */}

        <div

          style={{

            marginTop: "36px"
          }}
        >

          <h2

            style={{

              marginBottom: "18px",

              fontSize: "22px"
            }}
          >
            Companies
          </h2>

          <p
            style={{
              marginBottom: "12px",
              fontSize: "15px"
            }}
          >
            Amazon
          </p>

          <p
            style={{
              marginBottom: "12px",
              fontSize: "15px"
            }}
          >
            Google
          </p>

          <p
            style={{
              marginBottom: "12px",
              fontSize: "15px"
            }}
          >
            Microsoft
          </p>

          <p
            style={{
              marginBottom: "12px",
              fontSize: "15px"
            }}
          >
            Apple
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        style={{
          flex: 1
        }}
      >

        {/* TOP */}

        <div

          style={{

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "28px"
          }}
        >

          <div>

            <h1

              style={{

                fontSize: "46px",

                marginBottom: "8px"
              }}
            >
              All Problems
            </h1>

            <p

              style={{

                color: "#94a3b8",

                fontSize: "18px"
              }}
            >
              {filteredProblems.length}
              + Problems
            </p>

          </div>

          {/* SEARCH */}

          <input

            type="text"

            placeholder="Search problems..."

            value={searchTerm}

            onChange={(e) => {

              setSearchTerm(
                e.target.value
              );

              setCurrentPage(1);

            }}

            style={{

              width: "270px",

              padding: "14px",

              borderRadius: "14px",

              border: "none",

              outline: "none",

              background:
                "rgba(15,23,42,0.9)",

              color: "white",

              fontSize: "14px"
            }}
          />

        </div>

        {/* FILTER BUTTONS */}

        <div

          style={{

            display: "flex",

            gap: "12px",

            marginBottom: "24px"
          }}
        >

          {[
            "All",
            "Easy",
            "Medium",
            "Hard"
          ].map((level) => (

            <button

              key={level}

              onClick={() => {

                setSelectedDifficulty(
                  level
                );

                setCurrentPage(1);

              }}

              style={{

                padding:
                  "10px 20px",

                borderRadius: "12px",

                border: "none",

                cursor: "pointer",

                fontSize: "14px",

                color: "white",

                background:
                  selectedDifficulty ===
                  level
                    ? level === "Easy"
                      ? "#22c55e"
                      : level ===
                        "Medium"
                      ? "#eab308"
                      : level ===
                        "Hard"
                      ? "#ef4444"
                      : "#7c3aed"
                    : "rgba(15,23,42,0.9)"
              }}
            >
              {level}
            </button>

          ))}

        </div>

        {/* QUESTIONS */}

        {loading ? (

          <p>Loading...</p>

        ) : filteredProblems.length ===
          0 ? (

          <div

            style={{

              marginTop: "60px",

              textAlign: "center",

              fontSize: "22px",

              color: "#94a3b8",

              fontWeight: "600"
            }}
          >
            Search Not Found 🚫
          </div>

        ) : (

          currentQuestions.map(
            (p, index) => (

              <div

                key={index}

                style={{

                  background:
                    "rgba(255,255,255,0.05)",

                  backdropFilter:
                    "blur(8px)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  padding:
                    "14px 20px",

                  marginBottom: "14px",

                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center"
                }}
              >

                {/* TITLE */}

                <h2

                  style={{

                    fontSize: "17px",

                    fontWeight: "600"
                  }}
                >
                  {p.Title}
                </h2>

                {/* RIGHT */}

                <div

                  style={{

                    display: "flex",

                    alignItems:
                      "center",

                    gap: "12px"
                  }}
                >

                  {/* DIFFICULTY */}

                  <span

                    style={{

                      padding:
                        "5px 12px",

                      borderRadius:
                        "18px",

                      fontSize: "11px",

                      fontWeight:
                        "bold",

                      background:
                        p.Difficulty ===
                        "Easy"
                          ? "rgba(34,197,94,0.2)"
                          : p.Difficulty ===
                            "Medium"
                          ? "rgba(234,179,8,0.2)"
                          : "rgba(239,68,68,0.2)",

                      color:
                        p.Difficulty ===
                        "Easy"
                          ? "#22c55e"
                          : p.Difficulty ===
                            "Medium"
                          ? "#eab308"
                          : "#ef4444"
                    }}
                  >
                    {p.Difficulty}
                  </span>

                  {/* ARROW */}

                  <button

                    onClick={() =>
                      navigate(
                        "/problem",
                        {
                          state: p
                        }
                      )
                    }

                    style={{

                      width: "38px",

                      height: "38px",

                      borderRadius:
                        "50%",

                      border: "none",

                      cursor: "pointer",

                      background:
                        "linear-gradient(135deg,#9333ea,#3b82f6)",

                      color: "white"
                    }}
                  >

                    <FaArrowRight />

                  </button>

                </div>

              </div>

            )
          )

        )}

        {/* PAGINATION */}

        <div

          style={{

            display: "flex",

            justifyContent:
              "center",

            alignItems: "center",

            flexWrap: "wrap",

            gap: "12px",

            marginTop: "35px",

            marginBottom: "30px"
          }}
        >

          {[...Array(totalPages)].map(
            (_, index) => (

              <button

                key={index}

                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }

                style={{

                  width: "42px",

                  height: "42px",

                  borderRadius:
                    "12px",

                  border: "none",

                  cursor: "pointer",

                  fontWeight:
                    "bold",

                  fontSize: "15px",

                  color: "white",

                  transition:
                    "0.3s ease",

                  background:
                    currentPage ===
                    index + 1
                      ? "linear-gradient(135deg,#9333ea,#3b82f6)"
                      : "rgba(15,23,42,0.9)",

                  boxShadow:
                    currentPage ===
                    index + 1
                      ? "0 0 15px rgba(147,51,234,0.6)"
                      : "none"
                }}
              >
                {index + 1}
              </button>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;