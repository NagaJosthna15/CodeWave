from flask import Blueprint, request, jsonify

from groq import Groq

from dotenv import load_dotenv

import os


load_dotenv()


client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


chatbot_bp = Blueprint(

    "chatbot",

    __name__
)


@chatbot_bp.route(

    "/chatbot",

    methods=["POST"]
)
def chatbot():

    data = request.json

    code = data["code"]

    question = data["question"]

    prompt = f"""
You are an expert coding mentor.

CODE:
{code}

QUESTION:
{question}

Explain the code line by line in simple words.

Also explain:
1. Time complexity
2. Space complexity
3. Output
4. Better approach if possible
"""

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "user",

                    "content": prompt
                }
            ]
        )

        answer = completion.choices[0].message.content

        return jsonify({

            "answer": answer
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })