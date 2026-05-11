import os

from dotenv import load_dotenv

from groq import Groq


# LOAD ENV
load_dotenv(dotenv_path=".env")

# GROQ CLIENT
client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


def generate_ai_suggestion(

    code,

    complexity
):

    try:

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

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "user",

                    "content": prompt
                }
            ]
        )

        return completion.choices[0].message.content

    except Exception as e:

        return f"AI Error: {str(e)}"