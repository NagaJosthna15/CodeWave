from flask import Blueprint, request, jsonify

from models import db, Submission

from utils.plagiarism import check_plagiarism


submission_bp = Blueprint("submission", __name__)


# SAVE SUBMISSION
@submission_bp.route("/save-submission", methods=["POST"])
def save_submission():

    data = request.json

    current_code = data["code"]

    # ONLY compare student submissions
    previous_submissions = Submission.query.filter_by(
        is_ai_generated=False
    ).all()

    plagiarism_result = {
        "similarity": "0%",
        "plagiarism_detected": False
    }

    # Compare current code with previous codes
    for submission in previous_submissions:

        result = check_plagiarism(
            current_code,
            submission.code
        )

        # if copied detected
        if result["plagiarism_detected"]:

            plagiarism_result = result

            break

    # Save new submission
    new_submission = Submission(

        user_id=data["user_id"],

        problem_name=data["problem_name"],

        code=current_code,

        score=data["score"],

        complexity=data["complexity"],

        status=data["status"],

        # Student submission
        is_ai_generated=False
    )

    db.session.add(new_submission)

    db.session.commit()

    return jsonify({

        "message": "Submission saved successfully",

        "plagiarism": plagiarism_result
    })


# GET USER SUBMISSIONS
@submission_bp.route("/my-submissions/<int:user_id>", methods=["GET"])
def my_submissions(user_id):

    submissions = Submission.query.filter_by(
        user_id=user_id
    ).all()

    result = []

    for s in submissions:

        result.append({

            "problem_name": s.problem_name,

            "score": s.score,

            "complexity": s.complexity,

            "status": s.status,

            "date": str(s.created_at)
        })

    return jsonify(result)