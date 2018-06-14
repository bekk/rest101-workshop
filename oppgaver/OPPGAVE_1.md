# Oppgave 1 

## a)

Følg instruksene i [README](https://github.com/bekk/rest101-workshop). 
Åpne nettleser på localhost:3000

Velkommen til VM-planleggeren. I dag skal dere lage en applikasjon hvor dere kan planlegge hvilke VM-kamper dere ønsker å se på fra Kontraskjæret.
Akkurat nå er ikke applikasjonen spesielt spennende. Den har en hardkodet kamp som ligger i frontenden til applikasjonen. 
Første oppgave går ut på å hente alle kampene. 
På localhost:3000/api/matches kan du hente ut alle kampene. Erstatt den hardkodede løsningen ved å gjøre et fetch-kall til denne URL-en. 

Definition of done: Alle kampene blir synlig i VM-planleggeren

## b)

Alle kampene er nå synlig i VM-planleggeren. Hvis du dog forsøker å legge til en kamp, så skjer det ingenting. 
Ta en kikk i server.js. Fyll ut endepunktet under, slik at kampene du legger til blir lagret: 
```
app.post("/api/savedmatches", (req, res) => {
   // Din kode her
});
```

PS! Lagringsmodellen din kan være veldig dum. Man kommer veldig langt med 
```
const savedMatches = [];

//...
app.post("/api/savedmatches", (req, res) => {
   const savedMatch = {} // Velg parametrene du ønsker å lagre her
   savedmatches.push(savedMatch);
   // Husk å svare med res.send(...)
}
```


Underveis i utviklingen kan det være nyttig å bruke en HTTP-klient for å teste API-et ditt før du drar i gang med frontend. Eksempelvis [POSTMAN](https://www.getpostman.com/apps)

Når API-et er ferdig og du har testet med POSTMAN, kan du begynne på frontend-biten. I frontend/utils/api.js finner du en del metoder som forventes å fylles ut i løpet av denne workshopen. 

Fyll ut metoden saveMatch() slik at kampen blir lagret. 

Definition of done: Kamper du har lagt til blir synlig i toppen av skjermen. Kamper du har lagret blir også værende dersom du refresher siden. Noen justeringer i frontenden går helt fint der for å få backend og frontend til å henge sammen. 

## c)
For å vise en lagret kamp må man hente informasjon om en spesifikk kamp. 

Frontenden forventer en rest-ressurs som svarer på GET - "/api/matches/<ID>" hvor <ID> tilsvarer match.name i JSON-filen. 


## d)
Dersom alt har gått bra nå kommer dine lagrede kamper i et panel øverst på siden. 
Denne har en X i høyre hjørne. 

Fyll inn ressursen under, slik at kamper kan bli fjernet i det du sletter de. 

```
app.delete("/api/savedmatches/:id", (req,res) => {
   // Din kode her
}
```

Fyll inn metoden deleteMatch() i frontend/utils/api.js, slik at kamper forsvinner når du trykker de bort. 
