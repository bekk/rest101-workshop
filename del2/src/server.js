const express = require('express');
const fetch = require('node-fetch');

const worldCupData = require('./worldCupData');

const app = express();


// Middlewares
app.use(express.static("dist"));
app.use(express.json());

// For serving the frontend of the app
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const teams = worldCupData.teams;
const matches = worldCupData.matches;
const channels = worldCupData.channels;

// State
let savedMatches = [
  {
    matchId: 1,
  },
  {
    matchId: 5,
  }
];


// API endpoints
app.get("/api/teams", (req, res) => {
  res.send({
    teams: teams,
  });
});

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
  fetch("https://fotballfest-api-2019.herokuapp.com/api/weather?time=2019-06-10T20:37:17.803Z")
    .then(res => res.json())
    .then(weather => res.send(weather));
});


// Configuration and starup of server

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
