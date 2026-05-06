from flask import Blueprint, request, jsonify
from utils.exceutor import run_code
from utils.complexity import get_complexity

code_bp = Blueprint("code", __name__)


# Run code only
@code_bp.route("/run-code", methods=["POST"])
def run():
    data = request.json
    code = data["code"]

    output = run_code(code)

    return jsonify({
        "output": output
    })


# Submit code
@code_bp.route("/submit", methods=["POST"])
def submit():
    data = request.json
    code = data["code"]

    output = run_code(code)
    complexity = get_complexity(code)

    score = 100
    status = "Efficient"
    optimized_available = False

    # Complexity based scoring
    if complexity == "O(n^2)":
        score = 60
        status = "Needs Improvement"
        optimized_available = True

    elif complexity == "O(n^3)":
        score = 40
        status = "Poor Solution"
        optimized_available = True

    elif complexity == "O(n)":
        score = 100
        status = "Efficient"

    else:
        score = 80
        status = "Good"

    return jsonify({
        "output": output,
        "complexity": complexity,
        "score": score,
        "status": status,
        "optimized_available": optimized_available
    })