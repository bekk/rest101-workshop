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
var worldcupData = JSON.parse(fs.readFileSync("./worldcup2018.json", "utf8"));

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

let savedMatches = [];

app.get("/api/teams", (req, res) => {
  res.send({
    teams: worldcupData.teams,
  });
});

app.get("/api/matches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

// Hint: Bruk req.params.id for å hente ut id.
app.get("/api/matches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.get("/api/savedmatches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.get('/api/channels/:id', (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.get('/api/weather/', (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.post("/api/savedmatches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.delete("/api/savedmatches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

app.put("/api/savedmatches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
