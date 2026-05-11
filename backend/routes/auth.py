from flask import Blueprint, request, jsonify
from models import db, User

from email.mime.text import MIMEText
import smtplib

import bcrypt
import os

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:

        return jsonify({
            "message":"Email already registered"
        })

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password.decode("utf-8")
    )

    db.session.add(user)

    db.session.commit()


    # EMAIL SEND
    message = MIMEText(f"""
Hello {data["name"]},

Welcome to CodeWave 🚀

Happy Coding!

- CodeWave Team
""")

    message["Subject"] = "Welcome to CodeWave 🚀"

    message["From"] = os.getenv("MAIL_USERNAME")

    message["To"] = data["email"]


    server = smtplib.SMTP("smtp.gmail.com", 587)

    server.starttls()

    server.login(
         os.getenv("MAIL_USERNAME"),
        os.getenv("MAIL_PASSWORD")
    )

    server.send_message(message)

    server.quit()


    return jsonify({
        "message": "User registered successfully",
        "user_id": user.id
    })


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"})