// Suggested solution to tasks in part 1
const express = require('express');

const app = express();

// Middlewares
app.use(express.json()); // Brukes for å kunne lese JSON fra request body

let handleliste = [
  {
    id: 1,
    ting: "Tacokrydder",
    antall: 1
  },
  {
    id: 2,
    ting: "Avokado",
    antall: 2,
    kommentar: "Må være moden."
  },
  {
    id: 3,
    ting: "Tomat",
    antall: 3,
  },
  {
    id: 4,
    ting: "Gulrot",
    antall: 4,
  },
  {
    id: 5,
    ting: "Salsa",
    antall: 2,
    kommentar: "En hot og en mild."
  }
];

app.get("/api/handleliste", (req, res) => {
  const responseBody = {
    handleliste: handleliste.map(ting => {
      return {
        id: ting.id,
        ting: ting.ting,
        antall: ting.antall
      }
    }),
  };
  res.status(200).send(responseBody);
});


app.get("/api/handleliste/:id", (req, res) => {
  let id = parseInt(req.params.id, 10);
  const element = handleliste.find(e => e.id === id);
  if (element === undefined) {
    res.status(404).send("Fant ingen element i handlelisten med id " + id + ".");
  } else {
    res.send(element);
  }
});

app.post("/api/handleliste", (req, res) => {
  const nyTing = req.body;
  if (!nyTing.ting || nyTing === "") {
    res.status(400).send("400: Bad request. Egenskapen \"ting\" mangler eller er tom.")
  }
  // For å gi den nye resurssen en unik id, finn maks id og pluss på en.
  let maxId = 0;
  handleliste.forEach(e => {
    if (e.id > maxId) {
      maxId = e.id;
    }
  })
  nyTing.id = maxId + 1;
  handleliste.push(nyTing);

  // Status 201: Created
  res.status(201).send(nyTing);
})

app.put("/api/handleliste/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  handleliste = handleliste.filter(e => e.id !== id);
  handleliste.push(req.body);
  res.status(200).send(req.body);
});

app.delete("/api/handleliste/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  handleliste = handleliste.filter(e => e.id !== id);
  res.status(204).send();
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
