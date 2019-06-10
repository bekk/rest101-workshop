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

let worldcupData = JSON.parse(fs.readFileSync("./worldcup2018.json", "utf8"));
let teams2019 = JSON.parse(fs.readFileSync("./teams2019.json", "utf-8"));
let matches2019 = JSON.parse(fs.readFileSync("./matches2019.json"));

let formatted2019Matches = matches2019.map((m, idx) => {
  return (
    {
        matchCategory: m.stage_name,
        name: idx,
        fifa_id: m.fifa_id,
        home_team: m.home_team.code,
        away_team: m.away_team.code,
        home_result: m.home_team.goals,
        away_result: m.away_team.goals,
        date: m.datetime,
        channels: [
            4,
            6,
            13
        ],
        finished: m.status === "completed",
  });
})

let formatted2019Teams = teams2019.map((t, idx) => {
  return (
    {
      id: t.id,
      name: t.country,
      country: t.country,
      fifaCode: t.fifa_code,
      flag: t.flag,
      emoji: t.emoji_code,
      emojiString: t.emojiString,
      group_letter: t.group_letter
    }
  );
});

const channels = Object.values(worldcupData.tvchannels);

let savedMatches = [
  {
    matchId: 1,
  },
  {
    matchId: 5,
  }];

app.get("/api/teams", (req, res) => {
  res.send({
    teams: formatted2019Teams,
  });
});

// Oppgave 1a
app.get("/api/matches", (req, res) => {
  res.send({
    matches: formatted2019Matches,
  });
});

// Hint: Bruk req.params.id for å hente ut id.
app.get("/api/matches/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)
  const match = formatted2019Matches.find(e => e.name === id);
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
  savedMatches = savedMatches.filter(match => match.matchId !== undefined && match.matchId !== matchId);
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
