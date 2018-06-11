const express = require('express');
const fs = require('fs');
const values = require('object.values');

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

const decorateMatchWithLinks = (match) => {
  return Object.assign({
    _links: {
      saveMatch: {
        href: `/api/savedmatches/${match.name}`,
        method: 'POST',
        contentType: 'application/json',
        accept: 'application/json'
      },
      deleteMatch: {
        href: `/api/savedmatches/${match.name}`,
        method: 'DELETE',
        contentType: 'application/json',
        accept: 'application/json'
      },
      information: {
        href: `/api/matches/${match.name}`,
        method: 'GET',
        contentType: 'application/json',
        accept: 'application/json'
      }
    }
  }, match);
};

app.get("/api/matches", (req, res) => {
  res.send({
    matches: matches.map(decorateMatchWithLinks),
  });
});

app.get("/api/matches/:id", (req, res) => {
  const match = matches.find(m => m.name === parseInt(req.params.id));
  if (!match) {
    res.status(404).send("The match with the given ID was not found");
    return;
  }
  res.send(match);
});

app.get("/api/savedmatches", (req, res) => {
  res.send({
    savedMatches: savedMatches,
  });
});

app.get('/api/channels/:id', (req, res) => {
  const channel = channels.filter(c => {
    return c.id == req.params.id;
  })[0];
  res.send(channel);
});

const matchAlreadyExists = (matchId) => {
  return savedMatches.filter(match => match.matchId === matchId).length > 0;
};

app.post("/api/savedmatches", (req, res) => {
  if (!req.body.matchId) {
    res.status(400).send("Body with a matchId is required in request");
    return;
  }

  if (matchAlreadyExists(req.body.matchId)) {
    res.status(400).send("Match already exists");
    return;
  }

  let matchId = req.body.matchId;

  const newSavedMatch = {
    matchId: matchId,
    kontraskjaeret: false,
  };
  savedMatches.push(newSavedMatch);
  res.send(newSavedMatch);
});

app.delete("/api/savedmatches/:id", (req, res) => {
  const indexOfMatch = savedMatches
    .map(e => e.matchId)
    .indexOf(parseInt(req.params.id, 10));
  if (indexOfMatch === -1) {
    res.status(404).send();
  } else {
    savedMatches.splice(indexOfMatch, 1);
    res.status(204).send();
  }
});

app.put("/api/savedmatches/:id", (req, res) => {
  const indexOfMatch = savedMatches
    .map(e => e.matchId)
    .indexOf(parseInt(req.params.id, 10));
  if (indexOfMatch < 0) {
    res
      .status(404)
      .send(
        `The match with id=${
          req.params.id
        } was not in the list of saved matches.`
      );
    return;
  }
  if (!req.body) {
    res.status(400).send("Body is required");
    return;
  }
  savedMatches[indexOfMatch] = req.body;
  res.send(req.body);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
