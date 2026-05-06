from flask import Blueprint, request, jsonify

from groq import Groq

from dotenv import load_dotenv

import os


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


ai_bp = Blueprint("ai", __name__)


MODEL_NAME = "llama-3.3-70b-versatile"


# CHATBOT
@ai_bp.route("/chatbot", methods=["POST"])
def chatbot():

    question = request.json["question"]

    try:

        response = client.chat.completions.create(

            model=MODEL_NAME,

            messages=[
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        answer = response.choices[0].message.content

        return jsonify({
            "answer": answer
        })

    except Exception as e:

        return jsonify({
            "answer": str(e)
        })


# OPTIMIZE
@ai_bp.route("/optimize", methods=["POST"])
def optimize():

    code = request.json["code"]

    prompt = f"""
    Optimize this code.

    Reduce time complexity.

    Explain improvements.

    Code:
    {code}
    """

    try:

        response = client.chat.completions.create(

            model=MODEL_NAME,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        return jsonify({
            "optimized_code": result
        })

    except Exception as e:

        return jsonify({
            "optimized_code": str(e)
        })


# EXPLAIN
@ai_bp.route("/explain", methods=["POST"])
def explain():

    code = request.json["code"]

    prompt = f"""
    Explain this code step-by-step.

    Also explain:
    1. Time Complexity
    2. Space Complexity
    3. Dry Run
    4. Optimization ideas

    Code:
    {code}
    """

    try:

        response = client.chat.completions.create(

            model=MODEL_NAME,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        return jsonify({
            "explanation": result
        })

    except Exception as e:

        return jsonify({
            "explanation": str(e)
        })