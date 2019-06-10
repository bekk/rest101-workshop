let matches = [];
let teams = [];

function getTeams() {
  return teams;
}

function getTeamWithId(id) {
  return teams.find(t => t.fifaCode === id);
}

function setTeams(teamsFetchedFromServer) {
  teams = teamsFetchedFromServer;
}

function getMatches() {
  return matches;
}

function setMatches(matchesFetchedFromServer) {
  matches = matchesFetchedFromServer;
}

export { getTeams, setTeams, getMatches, setMatches, getTeamWithId };
