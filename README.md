# 🚀 CodeWave – AI-Powered Coding Platform

CodeWave is a full-stack AI-powered coding platform designed to help students improve their programming and problem-solving skills through an interactive coding environment.

The platform provides coding practice, multi-language code execution, AI-powered assistance, complexity analysis, optimized solutions, leaderboards, and personalized learning support—all in one place.

---

# ✨ Features

## 🔐 Authentication & User Management

- User Registration
- User Login
- Google Authentication
- Profile Management
- Secure Session Handling

---

## 💻 Coding Environment

- Multi-language Code Execution
- Coding Problem Practice
- Custom Test Cases
- Runtime Error Detection
- Time Limit Exceeded (TLE) Detection
- Code Submission & Evaluation

---

## 🤖 AI-Powered Features

- AI Code Suggestions
- AI Code Optimization
- AI Code Explanation
- Interactive Coding Mentor Chatbot
- Time & Space Complexity Analysis

---

## 📊 Performance Tracking

- Leaderboard System
- User Streak Tracking
- Submission History
- Progress Dashboard
- Score Calculation

---

## 🎨 User Experience

- Modern Responsive UI
- Interactive Dashboard
- Fast Navigation
- Real-time Feedback
- Clean User Interface

---

# 🛠️ Tech Stack

## Frontend

- React.js
- JavaScript (ES6)
- HTML5
- CSS3
- React Router DOM
- React Icons
- Fetch API

---

## Backend

- Flask
- Python
- SQLite
- SQLAlchemy
- Flask JWT Authentication
---

## AI Integration

- Groq API

---

## Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## Deployment

- **Frontend:** Vercel
- **Backend:** Render

---

# 📂 Project Structure

```text
CodeWave/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── code.py
│   │   ├── chatbot.py
│   │   ├── leaderboard.py
│   │   ├── dashboard.py
│   │   └── submission.py
│   │
│   ├── utils/
│   │   ├── complexity.py
│   │   ├── scoring.py
│   │   ├── ai_suggestions.py
│   │   └── executor.py
│   │
│   ├── app.py
│   ├── models.py
│   └── requirements.txt
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/NagaJosthna15/CodeWave.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

# 🚀 Core Modules

## 🔐 Authentication Module

- User Registration
- Login System
- Google Login
- JWT Authentication

---

## 💻 Coding Module

- Run Code
- Submit Solution
- Test Case Validation
- Runtime Error Detection

---

## 🤖 AI Module

- Code Explanation
- Code Optimization
- AI Coding Mentor
- Complexity Analysis

---

## 📊 Analytics Module

- Dashboard
- Leaderboard
- Streak Tracking
- Submission History

---

# 🌐 API Endpoints

## Authentication

```http
POST /register
POST /login
POST /google-login
```

---

## Coding

```http
POST /run-code
POST /submit
```

---

## AI

```http
POST /chatbot
POST /optimize
POST /explain
```

---

## Dashboard

```http
GET /leaderboard
GET /dashboard
GET /my-submissions/<user_id>
```

---

# 🎯 Future Enhancements

- AI Interview Simulator
- Advanced Plagiarism Detection
- Company-wise Interview Questions
- Contest Mode
- Daily Coding Challenges
- Discussion Forum
- Real-time Code Collaboration
- PostgreSQL Migration
- Dark / Light Theme
- Mobile Application Support

---

# 📸 Screenshots

> Screenshots will be added after deployment.

- Login Page
- Signup Page
- Overview Dashboard
- Coding Problems
- Code Editor
- Profile Page
- Submission History
- Leaderboard

---

# ⭐ Project Vision

CodeWave aims to provide students with a complete AI-powered coding ecosystem that combines coding practice, intelligent assistance, performance tracking, and interview preparation within a single platform.

Our vision is to make coding preparation more interactive, accessible, and AI-driven for students preparing for technical interviews and competitive programming.

---

# 👨‍💻 Team CodeWave

Developed with ❤️ by **Team CodeWave** to empower students with an intelligent coding practice platform.

---

## ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.
