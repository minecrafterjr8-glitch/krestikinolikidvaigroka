import uuid

from flask import Flask, request
from flask_cors import CORS

players = []
app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "В чем сила, брат? в двух ферзях, брат =)"


@app.route("/auth/register")
def register_route():
    return str(uuid.uuid4())


@app.route("/players/ready")
def players_ready_route():
    player_uuid = request.headers.get("authorisation")
    if not player_uuid:
        return "нет uuuid"
    if player_uuid not in players:
        players.append(player_uuid)
    return "ok"


@app.route("/player/isready")
def player_status():
    return players


@app.route("/players")
def players_route():
    return players


if __name__ == "__main__":
    app.run(debug=True)
