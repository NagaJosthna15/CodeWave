import React, {
  useState,
  useEffect
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import mainlogo from "../mainlogo.png";

function Problem() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const problem =
    location.state;

  const [questionData,
    setQuestionData] =
    useState(null);

  const [code,
    setCode] =
    useState("");

  const [output,
    setOutput] =
    useState("");

  const [history,
    setHistory] =
    useState([]);

  const [language,
    setLanguage] =
    useState("python");

  const [topTab,
    setTopTab] =
    useState("question");

  // STARTER CODES

  const starterCodes = {

    python:
`def solve():
    pass`,

    javascript:
`function solve() {

}`,

    java:
`public class Main {

    public static void main(String[] args) {

    }

}`,

    cpp:
`#include <bits/stdc++.h>
using namespace std;

int main() {

}`,

    c:
`#include <stdio.h>

int main() {

}`
  };

  // FETCH QUESTION

  useEffect(() => {

    fetch(
      "https://codewave-api-i461.onrender.com/questions"
    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        const matchedQuestion =

          data.find(
            (q) =>

              q.Title ===
              problem?.Title ||

              q.ID ===
              problem?.ID
          );

        setQuestionData(
          matchedQuestion
        );

      })

      .catch((err) =>
        console.log(err));

  }, [problem]);

  // DEFAULT CODE

  useEffect(() => {

    setCode(
      starterCodes[language]
    );

  }, [language]);

  // RUN CODE

  const runCode =
    async () => {

      setOutput(
        "Backend not connected yet"
      );

    };

  // SUBMIT

  const handleSubmit =
    async () => {

      const accepted =
        Math.random() > 0.5;

      // BACKEND CONNECT AYYAKA
      // ee values backend nundi ravali

      const submission = {

        id:
          history.length + 1,

        status:
          accepted
            ? "Accepted"
            : "Rejected",

        language:
          language,

        // backend calculated
        timeComplexity:
          "",

        // backend calculated
        spaceComplexity:
          "",

        // backend calculated
        score:
          "",

        // backend suggestions
        suggestions:
          "",

        optimized:
          accepted
      };

      setHistory((prev) => [

        submission,

        ...prev
      ]);

      setOutput(

        accepted

          ? "All Test Cases Passed ✅"

          : "Some Test Cases Failed ❌"
      );

    };

  return (

    <div

      style={{

        backgroundColor:
          "#000000",

        color:
          "white",

        minHeight:
          "100vh",

        display: "flex",

        flexDirection:
          "column"
      }}
    >

      {/* HEADER */}

      <div

        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          padding:
            "18px 28px",

          background:
            "#000000",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >

        {/* LOGO */}

        <div

          style={{

            display: "flex",

            alignItems:
              "center",

            gap: "5px"
          }}
        >

          <img

            src={mainlogo}

            alt="logo"

            style={{

              width: "78px",

              height: "78px",

              objectFit:
                "contain"
            }}
          />

          <h1

            style={{

              fontSize:
                "28px",

              fontWeight:
                "700"
            }}
          >

            Code Wave

          </h1>

        </div>

        {/* BACK */}

        <button

          onClick={() =>
            navigate(
              "/dashboard"
            )
          }

          style={{

            padding:
              "10px 18px",

            background:
              "#1e293b",

            color:
              "white",

            border:
              "none",

            borderRadius:
              "10px",

            cursor:
              "pointer",

            fontWeight:
              "600"
          }}
        >

          ← Back

        </button>

      </div>

      {/* MAIN */}

      <div

        style={{

          display: "flex",

          flex: 1
        }}
      >

        {/* LEFT SIDE */}

        <div

          style={{

            width: "50%",

            padding:
              "28px",

            overflowY:
              "auto",

            background:
              "#000000",

            borderRight:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          {/* TOP TABS */}

          <div

            style={{

              display: "flex",

              gap: "14px",

              marginBottom:
                "28px"
            }}
          >

            <button

              onClick={() =>
                setTopTab(
                  "question"
                )
              }

              style={{

                padding:
                  "10px 20px",

                border:
                  "none",

                borderRadius:
                  "10px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                background:

                  topTab ===
                  "question"

                    ? "#7c3aed"

                    : "#1e1e1e",

                color:
                  "white"
              }}
            >

              Question

            </button>

            <button

              onClick={() =>
                setTopTab(
                  "submissions"
                )
              }

              style={{

                padding:
                  "10px 20px",

                border:
                  "none",

                borderRadius:
                  "10px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                background:

                  topTab ===
                  "submissions"

                    ? "#7c3aed"

                    : "#1e1e1e",

                color:
                  "white"
              }}
            >

              Submissions

            </button>

          </div>

          {/* QUESTION */}

          {topTab ===
          "question" && (

            <>

              {/* TITLE */}

              <h1

                style={{

                  fontSize:
                    "24px",

                  fontWeight:
                    "700",

                  marginBottom:
                    "16px",

                  lineHeight:
                    "1.5"
                }}
              >

                {questionData?.ID}.
                {" "}
                {questionData?.Title}

              </h1>

              {/* DESCRIPTION */}

              <div
                style={{
                  marginBottom:
                    "35px"
                }}
              >

                <h2
                  style={{
                    marginBottom:
                      "14px"
                  }}
                >
                  Description
                </h2>

                <p

                  style={{

                    color:
                      "#cbd5e1",

                    lineHeight:
                      "2"
                  }}
                >

                  {questionData?.Description ||

                    "No description available."}

                </p>

              </div>

              {/* CONSTRAINTS */}

              <div
                style={{
                  marginBottom:
                    "35px"
                }}
              >

                <h2
                  style={{
                    marginBottom:
                      "14px"
                  }}
                >
                  Constraints
                </h2>

                <div

                  style={{

                    background:
                      "#000000",

                    padding:
                      "18px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                      "0 0 6px rgba(255,255,255,0.05)"
                  }}
                >

                  <ul

                    style={{

                      color:
                        "#cbd5e1",

                      lineHeight:
                        "2",

                      paddingLeft:
                        "18px"
                    }}
                  >

                    <li>
                      1 ≤ n ≤ 10⁵
                    </li>

                    <li>
                      Use optimized logic
                    </li>

                    <li>
                      Expected Time Complexity:
                      O(n)
                    </li>

                  </ul>

                </div>

              </div>

              {/* EXAMPLES */}

              <div
                style={{
                  marginBottom:
                    "35px"
                }}
              >

                <h2
                  style={{
                    marginBottom:
                      "14px"
                  }}
                >
                  Examples
                </h2>

                <div

                  style={{

                    background:
                      "#000000",

                    padding:
                      "18px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                      "0 0 6px rgba(255,255,255,0.05)"
                  }}
                >

                  <p>

                    <strong>
                      Input:
                    </strong>

                    nums = [1,2,3]

                  </p>

                  <p
                    style={{
                      marginTop:
                        "12px"
                    }}
                  >

                    <strong>
                      Output:
                    </strong>

                    6

                  </p>

                </div>

              </div>

              {/* EXPLANATION */}

              <div
                style={{
                  marginBottom:
                    "35px"
                }}
              >

                <h2
                  style={{
                    marginBottom:
                      "14px"
                  }}
                >
                  Explanation
                </h2>

                <div

                  style={{

                    background:
                      "#000000",

                    padding:
                      "18px",

                    borderRadius:
                      "12px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                      "0 0 6px rgba(255,255,255,0.05)",

                    color:
                      "#cbd5e1",

                    lineHeight:
                      "2"
                  }}
                >

                  {questionData?.Explanation ||

                    "No explanation available."}

                </div>

              </div>

            </>

          )}

          {/* SUBMISSIONS */}

          {topTab ===
          "submissions" && (

            <div>

              <h2
                style={{
                  marginBottom:
                    "24px"
                }}
              >
                Submission History
              </h2>

              {history.length ===
              0 ? (

                <div

                  style={{

                    color:
                      "#94a3b8"
                  }}
                >

                  No submissions yet

                </div>

              ) : (

                history.map((h, index) => (

                  <div

                    key={h.id}

                    style={{

                      background:
                        "#111111",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      borderRadius:
                        "14px",

                      padding:
                        "18px",

                      marginBottom:
                        "18px"
                    }}
                  >

                    <div

                      style={{

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center"
                      }}
                    >

                      <div

                        style={{

                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "14px"
                        }}
                      >

                        <span>

                          {index + 1}.

                        </span>

                        <span>
                          Submission
                        </span>

                        <span

                          style={{

                            color:

                              h.status ===
                              "Accepted"

                                ? "#22c55e"

                                : "#ef4444",

                            fontWeight:
                              "700"
                          }}
                        >

                          {h.status}

                        </span>

                      </div>

                      {/* VIEW RESULT */}

                      <button

                        onClick={() => {

                          alert(

`Language: ${h.language}

Time Complexity: ${h.timeComplexity}

Space Complexity: ${h.spaceComplexity}

Score: ${h.score}

Suggestions: ${h.suggestions}

Status: ${h.status}

${h.optimized ? "Optimized Code Available ✅" : ""}`
                          );

                        }}

                        style={{

                          padding:
                            "8px 16px",

                          border:
                            "none",

                          borderRadius:
                            "8px",

                          background:
                            "#7c3aed",

                          color:
                            "white",

                          cursor:
                            "pointer",

                          fontWeight:
                            "600"
                        }}
                      >

                        View Result

                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          )}

        </div>

        {/* RIGHT SIDE */}

        <div

          style={{

            width: "50%",

            padding:
              "24px",

            background:
              "#000000",

            display: "flex",

            flexDirection:
              "column"
          }}
        >

          {/* LANGUAGE */}

          <div
            style={{
              marginBottom:
                "18px"
            }}
          >

            <label
              style={{
                marginRight:
                  "10px"
              }}
            >

              Language:

            </label>

            <select

              value={language}

              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }

              style={{

                padding:
                  "10px 14px",

                borderRadius:
                  "8px",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                background:
                  "#1e1e1e",

                color:
                  "white"
              }}
            >

              <option value="python">
                Python
              </option>

              <option value="c">
                C
              </option>

              <option value="cpp">
                C++
              </option>

              <option value="java">
                Java
              </option>

              <option value="javascript">
                JavaScript
              </option>

            </select>

          </div>

          {/* CODE EDITOR */}

          <textarea

            value={code}

            onChange={(e) =>
              setCode(
                e.target.value
              )
            }

            style={{

              flex: 1,

              background:
                "#1e1e1e",

              color:
                "#e2e8f0",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius:
                "12px",

              padding:
                "18px",

              fontSize:
                "15px",

              fontFamily:
                "Consolas, monospace",

              resize:
                "none",

              outline:
                "none",

              lineHeight:
                "1.7"
            }}
          />

          {/* BUTTONS */}

          <div

            style={{

              display: "flex",

              gap: "14px",

              marginTop:
                "18px"
            }}
          >

            <button

              onClick={
                runCode
              }

              style={{

                padding:
                  "12px 22px",

                background:
                  "#3b82f6",

                  border:
                  "none",

                borderRadius:
                  "10px",

                color:
                  "white",

                cursor:
                  "pointer",

                fontWeight:
                  "600"
              }}
            >

              Run Code

            </button>

            <button

              onClick={
                handleSubmit
              }

              style={{

                padding:
                  "12px 22px",

                background:
                  "#22c55e",

                border:
                  "none",

                borderRadius:
                  "10px",

                color:
                  "white",

                cursor:
                  "pointer",

                fontWeight:
                  "600"
              }}
            >

              Submit

            </button>

          </div>

          {/* OUTPUT */}

          <div

            style={{

              marginTop:
                "18px",

              minHeight:
                "120px",

              background:
                "#111111",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius:
                "10px",

              padding:
                "16px",

              color:
                "#e2e8f0"
            }}
          >

            {output}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Problem;