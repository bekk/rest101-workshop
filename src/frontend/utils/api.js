function getAllTeams() {
	const dummyTeams = {
		"teams": [
			{
				"id": 3,
				"name": "Egypt",
				"flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/900px-Flag_of_Egypt.png",
				"emojiString": "🇪🇬"
			},
			{
				"id": 4,
				"name": "Uruguay",
				"flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/900px-Flag_of_Uruguay.png",
				"emojiString": "🇺🇾"
			},
		]
	};
	return Promise.resolve(dummyTeams);
}

function getAllMatches() {
	const dummyMatch = {
		"matches": [{
			"matchCategory": "Group A",
			"name": 2,
			"type": "group",
			"home_team": 3,
			"away_team": 4,
			"date": "2018-06-15T17:00:00+05:00",
			"channels": [3, 6, 13],
			"finished": false,
		}]
	};
	return Promise.resolve(dummyMatch);
}

function getMatch(matchId) {
	const dummyMatch = {
		"matchCategory": "Group A",
		"name": 2,
		"type": "group",
		"home_team": 3,
		"away_team": 4,
		"date": "2018-06-15T17:00:00+05:00",
		"channels": [3, 6, 13],
	};
	return Promise.resolve(dummyMatch);
}

function getAllSavedMatches() {
	const dummySavedMatches = {
		"savedMatches": [
			{matchId: 2}
		]
	};
	return Promise.resolve(dummySavedMatches);
}

function fetchChannel(channelId) {
	const dummyChannel = {
		"icon": "https://upload.wikimedia.org/wikipedia/commons/5/59/NRK1_logo.png",
	};
	return Promise.resolve(dummyChannel);
}

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

function saveMatch(matchId) {}

function deleteMatchFromSavedMatches(matchID) {}

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
