from flask import Blueprint, request, jsonify

from google.oauth2 import id_token

from google.auth.transport import requests

from models import db, User


google_bp = Blueprint("google", __name__)


GOOGLE_CLIENT_ID = "1036904732160-qjjmllc89enb0mu6rbhqbhsf2ab7iulo.apps.googleusercontent.com"


@google_bp.route("/google-login", methods=["POST"])
def google_login():

    token = request.json["token"]

    try:

        user_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = user_info["email"]

        name = user_info["name"]

        user = User.query.filter_by(email=email).first()

        # NEW USER
        if not user:

            user = User(
                name=name,
                email=email,
                password="google_auth"
            )

            db.session.add(user)

            db.session.commit()

        return jsonify({
            "message":"Google login successful",
            "user_id":user.id,
            "name":user.name
        })

    except Exception as e:

        return jsonify({
            "error":str(e)
        })