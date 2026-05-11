from flask import Blueprint, request, jsonify

from models import db, Submission



submission_bp = Blueprint("submission", __name__)


# SAVE SUBMISSION
@submission_bp.route("/save-submission", methods=["POST"])
def save_submission():

    data = request.json

    # Save new submission
    new_submission = Submission(

        user_id=data["user_id"],

        problem_name=data["problem_name"],

        code=data["code"],

        score=data["score"],

        complexity=data["complexity"],

        status=data["status"]
    )

    db.session.add(new_submission)

    db.session.commit()

    return jsonify({

        "message": "Submission saved successfully"
    })