import uuid

from flask import Flask, request
from flask_cors import CORS

players = []
matches = []
match_template = {
    "match_id": None,
    "player_1": None,
    "player_2": None,
    "map": ["", "", "", "", "", "", "", "", ""],
}

app = Flask(__name__)
CORS(app)


# создаст матч, если возможно
def create_match():
    if len(players) < 2:
        return
    
    player_1 = players[0]
    player_2 = players[1]
    players.remove(player_1)
    players.remove(player_2)

    match = match_template.copy()
    match["match_id"] = str(uuid.uuid4())
    match["player_1"] = player_1
    match["player_2"] = player_2
    matches.append(match)


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
    
    create_match()
    return "ok"


@app.route("/player/status")
def playerstatus():
    player_uuid = request.headers.get("authorisation")
    if not player_uuid:
        return "нет uuuid"
    if player_uuid in players:
        return {"status": "в очереди"}
    for match in matches:
        if match["player_1"] == player_uuid or match["player_2"] == player_uuid:
            current_match_id = match["match_id"]
            return {"status": "в матче", "match_id": current_match_id}
    return "НЕ НАДО ДЯДЯ"


# тестовые роуты
@app.route("/players")
def players_route():
    return players

@app.route("/matches")
def matches_route():
    return matches


if __name__ == "__main__":
    app.run(debug=True)
