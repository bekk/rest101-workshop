const express = require('express');
const fetch = require('node-fetch');

const worldCupData = require('./worldCupData');

const app = express();

// Middlewares
app.use(express.static('dist'));
app.use(express.json());

// For serving the frontend of the app
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
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
  },
];

// API endpoints
app.get('/api/teams', (req, res) => {
  res.send({
    teams: teams,
  });
});

app.get('/api/matches', (req, res) => {
  res.send({
    matches,
  });
});

app.get('/api/saved-matches', (req, res) => {
  res.send({
    savedMatches,
  });
});

app.get('/api/matches/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const match = matches.find(e => e.id === id);
  if (match === undefined) {
    res.status(404).send();
  }
  res.send(match);
});

// Oppgave 1c
app.post('/api/saved-matches', (req, res) => {
  const { matchId } = req.body;
  const matches = savedMatches.filter(
    match => match.matchId !== undefined && match.matchId !== matchId
  );
  savedMatches = [
    ...matches,
    {
      matchId,
    },
  ];
  res.send({
    matchId,
  });
});

app.delete('/api/saved-matches/:id', (req, res) => {
  const matchId = parseInt(req.params.id, 10);
  savedMatches = savedMatches.filter(match => match.matchId !== matchId);
  res.status(200).send();
});

app.get('/api/channels/:id', (req, res) => {
  const channelId = parseInt(req.params.id, 10);
  const channel = channels.find(ch => ch.id === channelId);
  if (channel === undefined) {
    res.status(404).send();
  } else {
    res.send(channel);
  }
});

app.get('/api/weather/', (req, res) => {
  fetch(
    'https://fotballfest-api-2019.herokuapp.com/api/weather?time=2019-06-10t20:37:17.803z'
  )
    .then(res => res.json())
    .then(weather => res.send(weather));
});

app.put('/api/saved-matches/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const match = req.body;
  const matches = savedMatches.filter(x => x.id !== id);
  savedMatches = [...matches, match];
  res.send(match);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
