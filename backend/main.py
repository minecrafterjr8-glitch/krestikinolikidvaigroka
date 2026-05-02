from flask import Flask, request
from flask_cors import CORS
import uuid
players = []
app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "В чем сила, брат? в двух ферзях, братаааааааааааааааааааааааааааааааааааааааан"


@app.route("/auth/register")
def register_route():
    return str(uuid.uuid4())
@app.route("/player/isready")
def player_status():
    return players
@app.route("/players/ready")
def players_ready_route():
    player_uuid = request.headers.get("authorisation")
    if not player_uuid:
        return "нет uuuid"
    players.append(player_uuid)
    return "ok"

@app.route("/players")
def players_route():
    return players
if __name__ == "__main__":
    app.run(debug=True)
