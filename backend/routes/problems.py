from flask import Blueprint, request, jsonify
import requests

problem_bp = Blueprint("problems", __name__)

BASE_URL = "https://codewave-api-i461.onrender.com/questions"

# Get all problems
@problem_bp.route("/problems", methods=["GET"])
def get_problems():
    difficulty = request.args.get("difficulty")

    if difficulty:
        url = f"{BASE_URL}?difficulty={difficulty}"
    else:
        url = BASE_URL

    response = requests.get(url)
    data = response.json()

    return jsonify(data)