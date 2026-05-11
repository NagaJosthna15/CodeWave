from flask import Blueprint, request, jsonify

from groq import Groq

from dotenv import load_dotenv

import os


# LOAD ENV
load_dotenv(dotenv_path=".env")


# DEBUG
print(os.getenv("GROQ_API_KEY"))


# GROQ CLIENT
client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


# MODEL
MODEL_NAME = "llama-3.3-70b-versatile"


ai_bp = Blueprint(

    "ai",

    __name__
)


# CHATBOT
@ai_bp.route(

    "/chatbot",

    methods=["POST"]
)
def chatbot():

    data = request.get_json()

    code = str(

        data.get("code", "")
    )

    question = str(

        data.get("question", "")
    )

    optimized_code = str(

        data.get(
            "optimized_code",
            ""
        )
    )

    prompt = f"""
You are an expert coding mentor.

Student Original Code:
{code}

Optimized Code:
{optimized_code}

Student Question:
{question}

Explain clearly step-by-step.

Also explain:
1. Output
2. Time complexity
3. Space complexity
4. Better approach
5. Optimization tips

Keep response beginner friendly.
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

        answer = response.choices[0].message.content

        return jsonify({

            "answer": answer
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })


# AI SUGGESTION
@ai_bp.route(

    "/ai-suggestion",

    methods=["POST"]
)
def ai_suggestion():

    data = request.get_json()

    code = str(

        data.get("code", "")
    )

    complexity = str(

        data.get(
            "complexity",
            ""
        )
    )

    prompt = f"""
You are an expert coding mentor.

Analyze this code:

{code}

Complexity:
{complexity}

Give:
1. Optimization suggestion
2. Better approach
3. Performance improvement

Keep response short and beginner friendly.
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

        suggestion = response.choices[0].message.content

        return jsonify({

            "suggestion": suggestion
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })


# EXPLAIN CODE
@ai_bp.route(

    "/explain",

    methods=["POST"]
)
def explain():

    data = request.get_json()

    code = str(

        data.get("code", "")
    )

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

        explanation = response.choices[0].message.content

        return jsonify({

            "explanation": explanation
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })


# OPTIMIZE CODE
@ai_bp.route(

    "/optimize",

    methods=["POST"]
)
def optimize():

    data = request.get_json()

    code = str(

        data.get("code", "")
    )

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

        optimized = response.choices[0].message.content

        return jsonify({

            "optimized_code": optimized
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })