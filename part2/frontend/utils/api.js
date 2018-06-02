function getAllMatches() {
  return fetch("api/matches").then(res => res.json());
}

function getAllTeams() {
  return fetch("api/teams").then(res => res.json());
}

function saveMatch(matchId) {
  fetch("api/savedmatches", {
    method: "POST",
    body: {
      matchId: matchId,
    },
  });
}

const api = {
  getAllMatches,
  getAllTeams,
  saveMatch,
};

export default api;
