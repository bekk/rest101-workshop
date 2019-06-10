const express = require('express');
const fs = require('fs');
const values = require('object.values');
const fetch = require('node-fetch');

const app = express();

if (!Object.values) {
  values.shim();
}

// Middlewares
app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Data er hentet fra https://github.com/lsv/fifa-worldcup-2018
let worldcupData = JSON.parse(fs.readFileSync("./worldcup2018.json", "utf8"));
let teams2019 = JSON.parse(fs.readFileSync("./teams2019.json", "utf-8"));
let matches2019 = JSON.parse(fs.readFileSync("./matches2019.json"));


const groupMatches = Object.values(worldcupData.groups).reduce(
  (allMatches, group) => allMatches.concat(Object.values(group.matches).map((match) => {
    return Object.assign({matchCategory: group.name}, match);
  })),
  []
);

const knockoutMatches = Object.values(worldcupData.knockout).reduce(
  (allMatches, round) => allMatches.concat(Object.values(round.matches).map((match) => {
    return Object.assign({matchCategory: round.name}, match);
  })),
  []
);

const channels = Object.values(worldcupData.tvchannels);

let matches = [...groupMatches, ...knockoutMatches];

let savedMatches = [
  {
    matchId: 1,
  },
  {
    matchId: 5,
  }];

app.get("/api/teams", (req, res) => {
  res.send({
    teams: teams2019,
  });
});

// Gammelt lag objekt:
// {
//   "id": 13,
//   "name": "Argentina",
//   "fifaCode": "ARG",
//   "iso2": "ar",
//   "flag":
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.png",
//   "emoji": "flag-ar",
//   "emojiString": "🇦🇷"
// },

// Nytt lagobjekt:
// {
//   "id": 20,
//   "country": "Netherlands",
//   "alternate_name": null,
//   "emoji_code": "flag-nl",
//   "emojiString": "🇳🇱",
//   "fifa_code": "NED",
//   "group_id": 5,
//   "group_letter": "E",
//   "flag_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/300px-Flag_of_the_Netherlands.svg.png"
// },


// Oppgave 1a
app.get("/api/matches", (req, res) => {
  res.send({
    matches: matches,
  });
});

// Hint: Bruk req.params.id for å hente ut id.
app.get("/api/matches/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)
  const match = matches.find(e => e.name === id);
  if (match === undefined) {
    res.status(404).send();
  }
  res.send(match);
});

// 
app.get("/api/saved-matches", (req, res) => {
  res.send({
    savedMatches: savedMatches
  });
});

app.post("/api/saved-matches", (req, res) => {
  console.log(req.body);
  const matchId = req.body.matchId;
  savedMatches = savedMatches.filter(match => match.matchId && match.matchId !== matchId);
  savedMatches.push({
    matchId: matchId
  });
  res.send({
    matchId: matchId,
  });
});

app.delete("/api/saved-matches/:id", (req, res) => {
  const matchId = parseInt(req.params.id, 10);
  savedMatches = savedMatches.filter(match => match.matchId !== matchId);
  res.status(200).send();
});

app.put("/api/saved-matches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.get('/api/channels/:id', (req, res) => {
  const channelId = parseInt(req.params.id);
  const channel = channels.find(ch => ch.id === channelId);
  if (channel === undefined) {
    res.status(404).send();
  } else {
    res.send({
      ...channel
    })
  }
});

app.get('/api/weather/', (req, res) => {
  fetch("https://fotballfest-test.herokuapp.com/api/weather?time=2019-06-10T20:37:17.803Z")
    .then(res => res.json())
    .then(weather => res.send(weather));
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
