from flask import Blueprint, jsonify
from models import Submission

leaderboard_bp = Blueprint("leaderboard", __name__)


@leaderboard_bp.route("/leaderboard", methods=["GET"])
def leaderboard():

    submissions = Submission.query.all()

    scores = {}

    for s in submissions:
        if s.user_id not in scores:
            scores[s.user_id] = 0

        scores[s.user_id] += s.score

    sorted_users = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    result = []

    rank = 1

    for user_id, total_score in sorted_users:
        result.append({
            "rank": rank,
            "user_id": user_id,
            "total_score": total_score
        })
        rank += 1

    return jsonify(result)