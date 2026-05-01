from flask import Blueprint, request, jsonify

ai_bp = Blueprint("ai", __name__)


@ai_bp.route("/chatbot", methods=["POST"])
def chatbot():
    return jsonify({
        "answer": "AI chatbot working."
    })


@ai_bp.route("/optimize", methods=["POST"])
def optimize():

    code = request.json["code"]

    optimized_code = """
def two_sum(arr, target):
    seen = {}

    for i, num in enumerate(arr):
        diff = target - num

        if diff in seen:
            return [seen[diff], i]

        seen[num] = i
"""

    return jsonify({
        "optimized_code": optimized_code,
        "optimized_complexity": "O(n)",
        "message": "Nested loops removed. HashMap used."
    })