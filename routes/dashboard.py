from flask import Blueprint, jsonify
from models import Submission

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard/<int:user_id>", methods=["GET"])
def dashboard(user_id):

    submissions = Submission.query.filter_by(user_id=user_id).all()

    total = len(submissions)

    if total == 0:
        return jsonify({
            "total_solved": 0,
            "average_score": 0,
            "best_score": 0,
            "efficient_count": 0
        })

    total_score = sum(s.score for s in submissions)
    avg_score = total_score / total
    best_score = max(s.score for s in submissions)

    efficient = len([s for s in submissions if s.status == "Efficient"])

    latest = submissions[-1].problem_name

    return jsonify({
        "total_solved": total,
        "average_score": round(avg_score,2),
        "best_score": best_score,
        "efficient_count": efficient,
        "latest_problem": latest
    })