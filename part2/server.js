const express = require("express");

const app = express();
var fs = require('fs');

// Middlewares
app.use(express.static('public'))
app.use(express.json());

// Data er hentet fra https://github.com/lsv/fifa-worldcup-2018
var worldcupData = JSON.parse(fs.readFileSync('./worldcup2018.json', 'utf8'));

const groupMatches = Object.values(worldcupData.groups)
  .reduce((allMatches, group) => allMatches.concat(Object.values(group.matches)), []);

const knockoutMatches = Object.values(worldcupData.knockout)
  .reduce((allMatches, round) => allMatches.concat(Object.values(round.matches)), []);


let matches = [...groupMatches, ...knockoutMatches];
let savedMatches = [];

// Endepunkt
app.get("/", (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get("/api/matches", (req, res) => {
  res.send({
    matches: matches,
  });
});

app.get("/api/teams", (req, res) => {
  res.send({
    teams: worldcupData.teams,
  });
});

app.get("/api/matches/:id", (req, res) => {
  const match = matches.find(a => a.id === parseInt(req.params.id));
  if (!match) {
    res.status(404).send("The match with the given ID was not found");
    return;
  }
  res.send(match);
});

app.get("/api/savedmatches", (req, res) => {
  res.send({
    matches: savedMatches
  });
});

app.post("/api/savedmatches", (req, res) => {
  if (!res.body.match) {
    res.status(400).send('Body is required in request');
    return;
  }
  let match = res.body.match;

  const savedmatches = {
    id: tracks.length + 1,
    name: req.body.name,
  };
  savedmatches.push(match);
  res.send(match);
});

app.put("/api/savedmatches/:id", (req, res) => {
  let artist = tracks.find(a => a.id === parseInt(req.params.id));
  if (!artist) {
    res.status(404).send("The artist with the given ID was not found");
    return
  }
  if (!res.body.name || res.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  artist.name = req.body.name;
  res.send(artist);
});


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
