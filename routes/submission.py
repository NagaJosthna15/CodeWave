from flask import Blueprint, request, jsonify
from models import db, Submission

submission_bp = Blueprint("submission", __name__)


# Save submission
@submission_bp.route("/save-submission", methods=["POST"])
def save_submission():
    data = request.json

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

    return jsonify({"message": "Submission saved successfully"})


# Get user submissions
@submission_bp.route("/my-submissions/<int:user_id>", methods=["GET"])
def my_submissions(user_id):
    submissions = Submission.query.filter_by(user_id=user_id).all()

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