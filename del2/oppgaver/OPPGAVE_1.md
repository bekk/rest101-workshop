# Oppgave 1 

Følg instruksene i [README](https://github.com/bekk/rest101-workshop). 
Åpne nettleser på localhost:3000

Velkommen til VM-planleggeren. I dag skal dere lage en applikasjon hvor dere kan planlegge hvilke VM-kamper dere ønsker å se på fra Kontraskjæret.

Appen består av en frontend som er nesten helt ferdig og en backend som dere skal skrive i løpet av denne workshoppen. Frontenden er skrevet med rammeverket [React](https://reactjs.org/) og backenden skal lages med rammeverket [express.js](https://expressjs.com/). 

## a)
Akkurat nå er ikke applikasjonen spesielt spennende. Den har en hardkodet kamp som ligger i frontenden til applikasjonen. 
Første oppgave går ut på å hente alle kampene. 

### Steg 1

I filen `del1/src/server.js` er følgende metode satt opp:
```js
app.get("/api/matches", (req, res) => {
  res.status(501).send({"message": "Not implemented yet"}); // Erstatt denne linjen med egen kode
});
```
Dette endepunktet skal returnere alle kampene som spilles i VM. Implementer dette endepunktet.

Kampene finner du i variabelen `matches` i samme fil. Responsen fra serverens skal se slik ut:
```js
{
    "matches": [
        {
            "matchCategory": "First Stage",
            "name": 0,
            "fifa_id": "300438238",
            "home_team": "FRA",
            "away_team": "KOR",
            "home_result": 4,
            "away_result": 0,
            "date": "2019-06-07T19:00:00Z",
            "channels": [
                14
            ],
            "finished": true
        },
        ...
    ]
}
```


### Steg 2
I `frontend/utils/api.js` finner du en del metoder som forventes å fylles ut i løpet av denne workshopen. Din neste oppgave er å fylle ut metoden `getAllMatches()` i `api.js`.

Denne metoden skal returnere et *Promise* som resulterer i et objekt i JSON format. Objektet skal være det samme som responsen fra serveren på endepunktet `/api/matches`.

Nå lurer du kanskje på hva et Promise er. Dette kan du lese om [her](https://johhorn.gitbooks.io/web-intro/05-javascript/08-promises.html).

For å gjøre et nettverkskall fra JavaScript i nettleseren kan du bruke funksjonen `fetch()`. Hvordan du bruker `fetch()` kan du lese om i artikklen [*Using fetch*](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).


Du er ferdig med oppgaven når alle kampene listes ut i VM-planleggeren. 

*Hint 1:* Se på metoden som henter ut alle lagene i VM på toppen av `api.js`.

*Hint 2:* Koden som ligger i api.js er et hardkodet utdrag av det man forventer å få i retur. Det vil si at responsen du mottar som et minimum må inneholde feltene som er hardkodet der.

## b)
Alle kampene er nå synlig i VM-planleggeren. I `server.js` er det en variabel som heter `savedMatches`. Dette er en liste med kamper som skal vises på toppen av VM-planleggeren. Det er to endepunkt som må implementeres for at dette skal virke. Et for å hente alle lagrede kamper, og et for å hente informasjon om en kamp. Du skal nå implementere disse endepunktene.

**1. GET /api/saved-matches**

Først ut er endepunktet for å hente ut alle lagrede kamper. 
```js
app.get("/api/savedmatches", (req, res) => {});
```
Metoden over skal returnere alle lagrede kamper på dette formatet: 
```js
{
   "savedMatches": [
      {
         "matchId": 3
      },
      ...
   ]
}

```
I tillegg må du fylle ut funksjonen `getAllSavedMatches()` i `api.js`.

*Hint:* Her kan du gjenbruke mye fra oppgave a).

**2. GET /api/matches/{id}**
Vi må kunne hente ut informasjon om en enkelt kamp. For dette trenger vi en rest-ressurs som svarer på `GET - "/api/matches/{ID}"`. Forventet respons på `/api/matches/2`er:
```js
{
   "matchCategory": "First Stage",
   "id": 2,
   "fifa_id": "300438234",
   "home_team": "ESP",
   "away_team": "RSA",
   "home_result": 3,
   "away_result": 1,
   "date": "2019-06-08T16:00:00Z",
   "channels": [
      14
   ],
   "finished": true
}
```
Funksjonen `getMatch(matchId)` i `api.js` må også fylles ut.

Når alt dette er gjort, skal det vises like mange kamper på toppen av VM-planleggeren som det er kamper i `savedMatches` variablen.

## c)
Hvis du forsøker å legge til en kamp, så skjer det ingenting. 
Ta en kikk i `server.js`. Fyll ut endepunktet under, slik at kampene du legger til blir lagret: 

```js
app.post("/api/savedmatches", (req, res) => {
   // Din kode her
});
```

PS! Lagringsmodellen din kan være veldig dum. Man kommer veldig langt med 
```js
const savedMatches = [];

//...
app.post("/api/savedmatches", (req, res) => {
   const savedMatch = {} // Velg parametrene du ønsker å lagre her
   savedmatches.push(savedMatch);
   // Husk å svare med res.send(...)
}
```
Responsen til dette endepunktet skal være objektet som ble lagt til i listen. For eksempel:
```js
{
   "matchId": 3
}
```
Du bør sjekke at API-et ditt virker med Postman før du går videre. 

Nå kan fylle ut funksjonen `saveMatch(matchId)` i `api.js`. Også denne funksjonen skal returnere et promise som resulterer i responsen fra endepunktet.  Det kan være lurt å bruke artikkelen [*Using fetch*](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for å få `fetch`-kallet til å bli riktig.

*Hint 1:* Har du satt riktig headere?

*Hint 2:* Har du gjort om body-parameteren til en string?

**Definition of done:** Kamper du har lagt til blir synlig i toppen av skjermen. Kamper du har lagret blir også værende dersom du refresher siden. 

## d)
Dersom alt har gått bra nå kommer dine lagrede kamper i et panel øverst på siden. 
Denne har en X i høyre hjørne. 

Fyll inn ressursen under i server.js, slik at kamper kan bli fjernet i det du sletter de. 

```
app.delete("/api/savedmatches/:id", (req,res) => {
   // Din kode her
}
```

Fyll inn metoden deleteMatch() i frontend/utils/api.js, slik at kamper forsvinner når du trykker de bort. 

## e)
Man har også mulighet til å vise kanalen en kamp går på. 
Lag et API for å hente ut navn og logo på en gitt kanal-id. 
Fyll ut metoden getChannel() for å benytte API-et 
