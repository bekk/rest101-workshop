const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

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

// Oppgave 1
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
  // *** Oppgave 2 ***
  // Your code here
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line

  // ***  ^^^^^^^  ***
});



app.post("/api/handleliste", (req, res) => {
  // *** Oppgave 3 ***
  // Your code here
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line

  // ***  ^^^^^^^  ***
})



app.put("/api/handleliste/:id", (req, res) => {
  // *** Oppgave 4 ***
  // Your code here
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line

  // ***  ^^^^^^^  ***
});



app.delete("/api/handleliste/:id", (req, res) => {
  //*** Oppgave 5 ***
  // Your code here
  res.status(501).send({"message": "Not implemented yet"}); // Remove this line

  // ***  ^^^^^^^  ***
});


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}...`));
