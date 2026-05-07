import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Problem() {
  const location = useLocation();
  const navigate = useNavigate();
  const problem = location.state;
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const testCases = [
  { id: 1, status: "Passed" },
  { id: 2, status: "Failed" },
  { id: 3, status: "Passed" }
  ];
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const[language,setLanguage]=useState("python");
  const[theme,setTheme] = useState("dark");
  const defaultCode = {
  python: 'print("Hello World")',
  python3: 'print("Hello World")',
  c: '#include<stdio.h>\nint main() {\n  printf("Hello World");\n  return 0;\n}',
  cpp: '#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello World";\n  return 0;\n}',
  "c++": '#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello World";\n  return 0;\n}',
  java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
  javascript: 'console.log("Hello World");',
  csharp: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello World");\n  }\n}',
  r: 'print("Hello World")',
  dart: 'void main() {\n  print("Hello World");\n}'
  };
  const themes = {
  dark: {
    background: "#0f172a",
    text: "white"
  },
  light: {
    background: "#ffffff",
    text: "black"
  }
};
  const runCode = () => {
    setOutput("Running...");

    setTimeout(() => {
      setOutput("10");
    }, 1000);
  };
  const toggleTheme = () => {
  setTheme(theme === "dark" ? "light" : "dark");
};
  const handleLanguageChange = (e) => {
  const lang = e.target.value;
  setLanguage(lang);
  //setCode(defaultCode[lang]);
  };
  useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
}, []);

 useEffect(() => {
  localStorage.setItem("theme", theme);
  }, [theme]);
  const handleSubmit = () => {
    setOutput("Submitting..."); setTimeout(()=>{
  const res = Math.random() > 0.5 ? "Accepted" : "Wrong Answer";
  setResult(res);

  setHistory((prev) => [
    ...prev,
    { id: prev.length + 1, status: res }
  ]);
  setActiveTab("testcases");},500);
  };
  return (
    <div
      style={{
       /* backgroundColor: "#0f172a",
        color: "white",*/
        backgroundColor: themes[theme].background,
        color: themes[theme].text, 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* 🔥 HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          fontSize: "22px",
          fontWeight: "bold",
          borderBottom: "1px solid #1e293b"
        }}
      >
        🌊 Code Wave
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 15px",
            backgroundColor: "#334155",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
      </div>

      {/* 🔥 MAIN */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* LEFT SIDE */}
        <div
          style={{
            width: "50%",
            padding: "20px",
            borderRight: "1px solid #1e293b"
          }}
        >
          <h2>{problem?.title}</h2>
          <p>Difficulty: {problem?.difficulty}</p>

          <h3>Description</h3>
          <p>This is dummy problem description...</p>
        </div>
        
        {/* RIGHT SIDE */}
        <div style={{ width: "50%", padding: "20px" }}>
          <h3>Code Editor</h3>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
          }}>

            {/* LEFT SIDE (Language) */}
            <div>
              <label style={{ marginRight: "10px" }}>Language:</label>

              <select
                value={language}
                onChange={handleLanguageChange}
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  backgroundColor: "#1e293b",
                  color: "white",
                  border: "1px solid #334155"
                }}
              >
                <option value="python">Python</option>
                <option value="python3">Python 3</option>
                <option value="c">C</option>
                <option value="cpp">CPP</option>
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="csharp">C#</option>
                <option value="r">R</option>
                <option value="dart">Dart</option>
              </select>
            </div>

            {/* RIGHT SIDE (Theme Button) */}
            <button
              onClick={toggleTheme}
              style={{
                padding: "6px 12px",
                backgroundColor: "#334155",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>

          </div>
      

          <textarea
            style={{
              width: "100%",
              height: "250px",
              backgroundColor: "#1e293b",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              fontFamily: "monospace"
            }}
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <br /><br />

          {/* 🔵 Run Button */}
          <button
            onClick={runCode}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onMouseOver={(e) => (e.target.style.background = "#2563eb")}
            onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
          >
            Run Code
          </button>
          <button
          onClick={handleSubmit}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
          {/* 🔥 TABS */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            
            <button
              onClick={() => setActiveTab("output")}
              style={{
                padding: "8px 15px",
                backgroundColor: activeTab === "output" ? "#3b82f6" : "#334155",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Output
            </button>

            <button
              onClick={() => setActiveTab("testcases")}
              style={{
                padding: "8px 15px",
                backgroundColor: activeTab === "testcases" ? "#3b82f6" : "#334155",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Test Cases
            </button>

          </div>

          {/* 🔥 TAB CONTENT */}
          <div style={{ marginTop: "15px" }}>

            {activeTab === "output" && (
              <div
                style={{
                  backgroundColor: "black",
                  color: "#00ff00",
                  padding: "10px",
                  minHeight: "60px",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                  //border: "1px solid #1e293b"
                  border: "1px solid #22c55e"   
                }}
              >
                {output}
              </div>
            )}

            {activeTab === "testcases" && (
              <div
                style={{
                  backgroundColor: "#020617",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1e293b"
                }}
              >
                {activeTab === "testcases" && (
              <div style={{ marginTop: "10px" }}>
                
                {testCases.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#1e293b",
                      padding: "12px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      border: "1px solid #334155"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#334155"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#1e293b"}
                  >
                    <span>Test Case {t.id}</span>

                    <span
                      style={{
                        color: t.status === "Passed" ? "#22c55e" : "#ef4444",
                        fontWeight: "bold"
                      }}
                    >
                      {t.status === "Passed" ? "✅ Passed" : "❌ Failed"}
                    </span>
                  </div>
                ))}

              </div>
            )}
              </div>
            )}

          </div>
          {/* 🔥 RESULT */}
        {result && (
          <div style={{ marginTop: "15px", fontWeight: "bold" }}>
            Result:{" "}
            <span style={{ color: result === "Accepted" ? "#22c55e" : "#ef4444" }}>
              {result === "Accepted" ? "✅ Accepted" : "❌ Wrong Answer"}
            </span>
          </div>
        )}
        
        {/* 🔥 HISTORY */}
        {history.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Submission History</h3>

            {history.map((h) => (
              <div
                key={h.id}
                style={{
                  padding: "8px",
                  marginTop: "5px",
                  backgroundColor: "#1e293b",
                  borderRadius: "6px",
                  border: "1px solid #334155"
                }}
              >
                Submission {h.id} →{" "}
                <span style={{ color: h.status === "Accepted" ? "#22c55e" : "#ef4444" }}>
                  {h.status === "Accepted" ? "✅ Accepted" : "❌ Wrong Answer"}
                </span>

              </div>
            ))}
          </div>
        )}
        </div>
      </div>

    </div>
  );
}

export default Problem;