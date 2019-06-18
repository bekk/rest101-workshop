// Oppgave 2a
function getAllMatches() {
	const dummyMatch = {
		"matches": [{
			"matchCategory": "First Stage",
			"name": 0,
			"fifa_id": "300438238",
			"home_team": "FRA",
			"away_team": "KOR",
			"home_result": 4,
			"away_result": 0,
			"date": "2019-06-07T19:00:00Z",
			"channels": [
					4,
					6,
					13
			],
			"finished": true
		}]
	};
	return Promise.resolve(dummyMatch);
}

// Oppgave 2b
// Hent ut alle SavedMatches
function getAllSavedMatches() {
	const dummySavedMatches = {
		"savedMatches": [
			{matchId: 2}
		]
	};
	return Promise.resolve(dummySavedMatches);
}	

// Oppgave 2b
function getMatch(matchId) {
	const dummyMatch = {
		"matchCategory": "Group A",
		"id": 2,
		"type": "group",
		"home_team": 3,
		"away_team": 4,
		"date": "2018-06-15T17:00:00+05:00",
		"channels": [3, 6, 13],
	};
	return Promise.resolve(dummyMatch);
}

// Oppgave 2c
function saveMatch(matchId) {
	const dummySavedMatch = {
		"matchId": 1
	};
	return Promise.resolve(dummySavedMatch);
}

// Oppgave 2d
function deleteMatchFromSavedMatches(matchId) {
	return false;
}


// Oppgave 2f
function fetchWeather(time) {
	/* Utdrag fra YR response objektet */
	const dummyWeather = {
		"datatype": "forecast",
		"location": {
			"temperature": {"value": "19.2"},
		},
		"rain": "0.0 mm",
		"symbolUrl": "/icons/02.svg"
	};
	return Promise.resolve(dummyWeather);
}

function getAllTeams() {
	return fetch("/api/teams").then(res => res.json());
}

function fetchChannel(channelId) {
	const dummyChannel = {
		"icon": "https://upload.wikimedia.org/wikipedia/commons/5/59/NRK1_logo.png",
	};
	return Promise.resolve(dummyChannel);
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
