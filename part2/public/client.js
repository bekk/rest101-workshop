// App state

let state = {
  matches: [],
  teams: [],
}

function getAllMatches() {
  return fetch("api/matches").then(res => res.json());
}

function getAllTeams() {
  return fetch("api/teams").then(res => res.json());
}

function getTeamWithId(id) {
  return state.teams.find(t => t.id === id);
}

function renderAllMatches(matches, teams) {
  const matchesGroupedByDayAsMap = groupBy(state.matches, (match) => match.date.slice(0,10));
  const matchesGroupedByDaySorted = [...matchesGroupedByDayAsMap.entries()]
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(day => {
      day[1] = day[1].sort((a, b) => new Date(a.date) - new Date(b.date));
      return day;
    });

  const matchToHtml = match => {
    const timeOfMatch = new Date(match.date).toTimeString().slice(0,5);
    const homeTeamObj = getTeamWithId(match.home_team);
    const awayTeamObj = getTeamWithId(match.away_team);
    const homeTeam = homeTeamObj ? homeTeamObj.name : "?";
    const awayTeam = awayTeamObj ? awayTeamObj.name : "?";

    return `<li>
              <span class="allMatches-time">${timeOfMatch}</span>
              ${homeTeam} - ${awayTeam}
            </li>`;
  };

  let html = matchesGroupedByDaySorted.map(day => {
    return `<ul class="allMatches-day">
              <h3>${day[0]}</h3>
              ${day[1].map(match => matchToHtml(match)).join("")}
            </ul>`;
  }).join("");

  const allMatchesList = document.getElementById("allMatches-list");
  allMatchesList.innerHTML = html;
}

function initateApp() {
  Promise.all([getAllMatches(), getAllTeams()]).then(function(result) {
    state.matches = result[0].matches;
    state.teams = result[1].teams;
    renderAllMatches(state.matches, state.teams);
    // let lol = getMatchesGroupedByDay(state.matches);
  });
}




function showTrackSearchResults(results) {
  const html = results.reduce((tempHtml, track) => tempHtml + trackToListHtml(track), "");
  const searchResultsList = document.getElementById("searchResults");
  searchResultsList.innerHTML = html;
}

function trackToListHtml(track) {
  return `<li class="searchResults-li">
    <span class="searchResults-trackName">${track.name}</span>
    <span class="searchResults-artists">
      ${track.artists.map(artist => artist.name).join(", ")}
    </span>
    </li>`;
    // <button class="addToListButton" data-spotifyId=${track.id}>Legg til</button>
}

function trackToString(track) {
  const artists = track.artists.map(artist => artist.name).join(", ");
  return track.name + " - " + artists;
}

function searchButtonClicked(event) {
  const searchString = document.getElementById("searchField").value;
  searchForTracks(searchString).then(tracks => {
    showTrackSearchResults(tracks);
    currentSearchResult = tracks;
  });
}


document.addEventListener("DOMContentLoaded", function() {
  initateApp();

  // const searchButton = document.getElementById("searchButton");
  // const searchField = document.getElementById("searchField");

  // searchButton.addEventListener("click", searchButtonClicked);
  // searchField.addEventListener("keyup", (event) => {
  //   if (event.keyCode === 13) { // 13 === enter 
  //     searchButtonClicked();
  //   } 
  // });
});

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
  });
  return map;
}