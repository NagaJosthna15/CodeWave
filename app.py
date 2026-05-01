from flask import Flask
from flask_cors import CORS

from models import db
from routes.auth import auth_bp

from routes.submission import submission_bp

from routes.dashboard import dashboard_bp
from routes.leaderboard import leaderboard_bp
from routes.code import code_bp
from routes.ai import ai_bp

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///codewave.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(auth_bp)
app.register_blueprint(submission_bp)
app.register_blueprint(code_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(leaderboard_bp)
app.register_blueprint(ai_bp)

@app.route("/")
def home():
    return "CodeWave Running"

if __name__ == "__main__":
    app.run(debug=True)