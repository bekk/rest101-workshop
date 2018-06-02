function getAllMatches() {
  return fetch("api/matches").then(res => res.json());
}

function getAllTeams() {
  return fetch("api/teams").then(res => res.json());
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
  getAllMatches,
  getAllTeams,
  saveMatch,
  getAllSavedMatches,
};

export default api;
