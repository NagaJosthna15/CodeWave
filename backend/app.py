from flask import Flask
from flask_cors import CORS
from models import db

from routes.auth import auth_bp
from routes.submission import submission_bp
from routes.dashboard import dashboard_bp
from routes.leaderboard import leaderboard_bp
from routes.code import code_bp
from routes.ai import ai_bp
from routes.google_auth import google_bp
from routes.chatbot import chatbot_bp
from extensions import mail
from dotenv import load_dotenv

import os




app = Flask(__name__)
load_dotenv()

CORS(app)
mail.init_app(app)


# DATABASE
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///codewave.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# MAIL CONFIG
app.config['MAIL_SERVER'] = 'smtp.gmail.com'

app.config['MAIL_PORT'] = 587


app.config['MAIL_USE_TLS'] = True

app.config['MAIL_USE_SSL'] = False

app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")

app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")


# MAIL OBJECT

# DB INIT
db.init_app(app)


with app.app_context():

    db.create_all()


# BLUEPRINTS
app.register_blueprint(auth_bp)

app.register_blueprint(submission_bp)

app.register_blueprint(code_bp)

app.register_blueprint(dashboard_bp)

app.register_blueprint(leaderboard_bp)

app.register_blueprint(ai_bp)

app.register_blueprint(google_bp)

app.register_blueprint(chatbot_bp)
@app.route("/")
def home():

    return "CodeWave Running"


if __name__ == "__main__":

    app.run(debug=True, use_reloader=False)