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

function fetchChannel(channelId) {
  return fetch(`api/channels/${channelId}`).then(res => res.json());
}

function fetchWeather(time) {
  return fetch(`api/weather?time=${encodeURIComponent(time)}`).then(res => res.json());
}

function saveMatch(matchId) {
  return fetch("api/savedmatches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      matchId: matchId,
    }),
  }).then(res => res.json());
}

function deleteMatchFromSavedMatches(matchID) {
  return fetch("api/savedmatches/" + matchID, {
    method: "DELETE",
  }).then(res => res.status);
}

const api = {
  getAllTeams,
  getAllMatches,
  getMatch,
  saveMatch,
  deleteMatchFromSavedMatches,
  getAllSavedMatches,
  fetchChannel,
  fetchWeather
};

export default api;
