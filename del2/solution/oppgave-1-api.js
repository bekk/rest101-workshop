function getAllTeams() {
	return fetch("/api/teams").then(res => res.json());
}

// Oppgave 1a
function getAllMatches() {
	// const dummyMatch = {
	// 	"matches": [{
	// 		"matchCategory": "Group A",
	// 		"name": 2,
	// 		"type": "group",
	// 		"home_team": 3,
	// 		"away_team": 4,
	// 		"date": "2018-06-15T17:00:00+05:00",
	// 		"channels": [13],
	// 		"finished": false,
	// 	}]
	// };
	// return Promise.resolve(dummyMatch);
	// Referer til resursser om promises og fetch
	return fetch("./api/matches").then(res => res.json());
}


// Oppgave 1b
// Hent ut alle SavedMatches
function getAllSavedMatches() {
	// const dummySavedMatches = {
	// 	"savedMatches": [
	// 		{matchId: 2}
	// 	]
	// };
	// return Promise.resolve(dummySavedMatches);
	return fetch("./api/saved-matches").then(res => res.json());
}


function saveMatch(matchId) {
	return fetch("./api/saved-matches", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
	},
		body: JSON.stringify({
			matchId: matchId,
		})
	}).then(res => res.json());
}

function getMatch(matchId) {
	// const dummyMatch = {
	// 	"matchCategory": "Group A",
	// 	"name": 2,
	// 	"type": "group",
	// 	"home_team": 3,
	// 	"away_team": 4,
	// 	"date": "2018-06-15T17:00:00+05:00",
	// 	"channels": [3, 6, 13],
	// };
	// return Promise.resolve(dummyMatch);
	return fetch("./api/matches/" + matchId).then(res => res.json());
}


function fetchChannel(channelId) {
	// const dummyChannel = {
	// 	"icon": "https://upload.wikimedia.org/wikipedia/commons/5/59/NRK1_logo.png",
	// };
	// return Promise.resolve(dummyChannel);
	return fetch("./api/channels/" + channelId).then(res => res.json());
}

function deleteMatchFromSavedMatches(matchId) {
	return fetch("./api/saved-matches/" + matchId, {
		method: "DELETE"
	}).then(res => res.ok);
}

function fetchWeather(time) {
	/* Utdrag fra YR response objektet */
	// const dummyWeather = {
	// 	"datatype": "forecast",
	// 	"location": {
	// 		"temperature": {"value": "19.2"},
	// 	},
	// 	"rain": "0.0 mm",
	// 	"symbolUrl": "/icons/02.svg"
	// };
	// return Promise.resolve(dummyWeather);
	return fetch("./api/weather").then(res => res.json());
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
