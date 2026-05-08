from flask import Blueprint, request, jsonify

from utils.exceutor import run_code
from utils.complexity import get_complexity
from utils.scoring import calculate_score
from models import db, Submission

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
# SUBMIT API
@code_bp.route("/submit", methods=["POST"])
def submit():

    data = request.json

    language = data["language"]

    code = data["code"]

    # RUN CODE
    result = run_code(language, code)

    # COMPLEXITY
    complexity = get_complexity(code)

    # SCORE + STATUS
    score, status = calculate_score(
        complexity,
        result["execution_time"],
        "0%"
    )

    # SAVE TO DATABASE
    new_submission = Submission(

        user_id=data["user_id"],

        language=language,

        problem_name="Practice Problem",

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

        "output": result["output"],

        "execution_time": result["execution_time"],

        "memory_usage": result["memory_usage"],

        "complexity": complexity,

        "plagiarism": "0%",

        "score": score,

        "status": status
    })