from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# User table
class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(200), nullable=False)


# Submission table
class Submission(db.Model):
     id = db.Column(db.Integer, primary_key=True)

     user_id = db.Column(db.Integer, nullable=False)

     language = db.Column(db.String(50), nullable=False)

     problem_name = db.Column(db.String(200), nullable=False)

     code = db.Column(db.Text, nullable=False)

     score = db.Column(db.Integer, nullable=False)

     complexity = db.Column(db.String(50), nullable=False)

     execution_time = db.Column(db.String(50), nullable=False)

     memory_usage = db.Column(db.String(50), nullable=False)

     status = db.Column(db.String(50), nullable=False)

    # IMPORTANT
    # AI optimized code ni plagiarism lo compare cheyyakudadhu
     is_ai_generated = db.Column(db.Boolean, default=False)

     created_at = db.Column(db.DateTime, default=datetime.utcnow)

   