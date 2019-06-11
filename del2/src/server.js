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
  //*** Oppgave 5 ***
  // Your code here
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line

  // ***  ^^^^^^^  ***
});


// Oppgave 1b
app.get("/api/saved-matches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

// Hint: Bruk req.params.id for å hente ut id.
app.get("/api/matches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

// Oppgave 1c
app.post("/api/saved-matches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

// Oppgave 1d
app.delete("/api/saved-matches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

// Oppgave 1e
app.get('/api/channels/:id', (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

// Oppgave 2b
app.get('/api/weather/', (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line
});

app.put("/api/saved-matches/:id", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"});
});



// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
