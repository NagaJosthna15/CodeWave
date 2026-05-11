from flask import Blueprint, request, jsonify

from utils.exceutor import run_code
from utils.complexity import get_complexity
from utils.scoring import calculate_score
from models import db, Submission, User
from utils.ai_suggestions import generate_ai_suggestion

from datetime import date, timedelta

import requests


code_bp = Blueprint("code", __name__)


# RUN CODE API
@code_bp.route("/run-code", methods=["POST"])
def run():

    data = request.json

    language = data["language"]

    code = data["code"]

    result = run_code(language, code)

    return jsonify(result)


# SUBMIT API
@code_bp.route("/submit", methods=["POST"])
def submit():

    data = request.json

    user = User.query.get(data["user_id"])

    # USER CHECK
    if not user:

        return jsonify({
            "error": "User not found"
        })

    today = date.today()

    # FIRST LOGIN
    if user.last_active is None:

        user.streak = 1

    # CONTINUOUS STREAK
    elif user.last_active == today - timedelta(days=1):

        user.streak += 1

    # SAME DAY
    elif user.last_active == today:

        pass

    # MISSED DAY
    else:

        user.streak = 1

    user.last_active = today

    language = data["language"]

    title = data["title"]

    code = data["code"]

    # RUN CODE
    result = run_code(language, code)

    # RUNTIME ERROR
    if result["status"] == "Runtime Error":

        return jsonify({

            "status": "Runtime Error",

            "message": result["error"]
        })

    # TLE
    if result["status"] == "Time Limit Exceeded":

        return jsonify({

            "status": "Time Limit Exceeded"
        })

    # ACTUAL OUTPUT
    actual_output = result["output"].strip()

    # FETCH QUESTIONS API
    questions_response = requests.get(

        "https://codewave-api-i461.onrender.com/questions"
    )

    questions = questions_response.json()

    matched_question = None

    for q in questions:

        if q["Title"] == title:

            matched_question = q

            break

    # QUESTION NOT FOUND
    if not matched_question:

        return jsonify({

            "error": "Question not found"
        })

    # EXPECTED OUTPUT
    expected_output = matched_question["Example"]["Output"]

    # ACCEPTED / WRONG ANSWER
    if actual_output == expected_output.strip():

        status = "Accepted"

        score = 100

    else:

        status = "Wrong Answer"

        score = 40

    # COMPLEXITY
    complexity = get_complexity(code)

    # AI SUGGESTION
    ai_suggestion = generate_ai_suggestion(
        code,
        complexity
    )

    # OPTIMIZED CODE API
    optimized_response = requests.get(

        "https://codewave-api-i461.onrender.com/get-solution",

        params={

            "title": title,

            "language": language,

            "code": code
        }
    )

    optimized_code = optimized_response.json()

    # SAVE DB
    new_submission = Submission(

        user_id=data["user_id"],

        language=language,

        problem_name=title,

        code=code,

        score=score,

        complexity=complexity,

        execution_time=result["execution_time"],

        memory_usage=result["memory_usage"],

        status=status
    )

    db.session.add(new_submission)

    db.session.commit()

    # FINAL RESPONSE
    return jsonify({

        "output": actual_output,

        "expected_output": expected_output,

        "execution_time": result["execution_time"],

        "memory_usage": result["memory_usage"],

        "complexity": complexity,

        "score": score,

        "status": status,

        "streak": user.streak,

        "suggestion": ai_suggestion,

        "optimized_code": optimized_code
    })