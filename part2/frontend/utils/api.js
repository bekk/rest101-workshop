function getAllTeams() {
  return fetch("api/teams").then(res => res.json());
}

function getAllMatches() {
  return fetch("api/matches").then(res => res.json());
}

function getMatch(matchId) {
  return fetch(`api/matches/${matchId}`).then(res => res.json());
}

function getAllSavedMatches() {
  return fetch("api/savedmatches").then(res => res.json());
}

function saveMatch(matchId) {
  return fetch("api/savedmatches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      matchId: matchId,
    }),
  }).then(res => res.json());
}

const api = {
  getAllTeams,
  getAllMatches,
  getMatch,
  saveMatch,
  getAllSavedMatches,
};

export default api;
