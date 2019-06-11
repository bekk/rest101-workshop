# Del 1 - handleliste API
I del 1 skal vi lage et REST API for en handleliste. Du vil bli kjent med express.js og POSTMAN. Express.js er et rammeverk for å lage web apps og API-er. Postman er et verktøy som lar deg gjøre HTTP-requests og er nyttig for å utforske og utvikle API-er.

## Oppgave 1
I denne oppgaven skal vi gå raskt gjennom hva en express-app består av og hvordan vi lager API-endepunkt.

Åpne filen `del1/server.js` i din favoritt editor. Her har vi satt opp skallet for API-et du skal implementere.

På de to første linjene importerer vi express.js og oppretter en express app.
```js
const express = require('express');
const app = express();
```

`app`-objektet kan vi bruke til å sette opp endepunkter for API-et. Vi har alt satt opp endepunktet `GET /api/handleliste`.

Vi kaller `.get()`-metdoen på `app`-objektet for å opprette et endepunkt som håndterer requests med verbet GET. Denne metoden har to parametere. Url-en endepunktet skal svare på og en funksjon som håndterer requesten. Disse to tingene kaller vi henoldsvis for _route_ og _handler_. 

Handler-funksjonen tar også inn to parametere, `req` og `res`. `req` er et objekt med informasjon om requesten og `res` er et objekt som lar deg styre hvordan endepunktet skal respondere på requesten. Under er et eksempel på et endepunkt:
```js
app.get("/url/til/endepunkt", (req, res) => {
  const response = "Hello world!";
  res.send(response);
};
```

Dette API-endepunktet svarer på requests med verbet `GET`. Dersom du ønsker å lage et endepunkt som svarer på `DELETE`, bruker du metoden `.delete()` istedenfor `.get()`. Tilsvarende gjelder for `PUT` og `POST`. Om du vil vite mer om routing i express, ta en kikk på dokumentasjonen [her](https://expressjs.com/en/starter/basic-routing.html).


På bunnen av filen `server.js` kaller vi metoden `.listen()` på app-objektet. Denne metoden gjør at express lytter etter requests på porten som sendes inn som første parameter. Når det kommer en request på denne porten, forsøker express å sende requesten til en handler som matcher med verb og route til requesten. Om express ikke finner noen handler som matcher, svarer serveren med 404 - Not found.

**Din oppgave**: 

Last ned og installer Postman fra https://www.getpostman.com/downloads/ 

Når postman er installert, gjør en GET-request mot http://localhost:3000/api/handleliste. Sjekk at du får ut handlelisten og gå videre til neste oppgave.

## Oppgave 2
Endepunktet `GET /api/handleliste` returnerer ikke alle egenskapene til tingene i handlelisten. I REST-endepunkt der man returnerer alle tingene i en samling, er det kun de viktigste egenskapene for tingene som skal returneres. Dette er for å gjøre responsen fra serveren så liten som mulig. 

I handlelisten som returneres i oppgave 1 er egenskapen `kommentar` utelatt. Du skal nå implementere endepunktet som lar deg hente ut all informasjon om et objekt i handlelisten.
Endepunktet skal være på dette formatet: ```GET /api/handleliste/2```.

Tallet 2 er id-en til tingen i handlelisten du ønsker å hente ut. Svaret på responsen fra serveren skal være på dette formatet:
```json
{
  "id": 2,
  "ting": "Avocado",
  "antall": 2,
  "kommentar": "Må være moden. Kjøp ferdig guacamole om de ikke har modne avocadoer."
}
```

Ta gjerne en titt på dokumentasjonen for `req` objektet [her](https://expressjs.com/en/4x/api.html#req).

*Hint:* Du kan hente ut id-en fra `req` slik:
```js
const id = req.params.id;
```

## Oppgave 3
Det er mange ting i som mangler i handlelisten dersom det skal bli taco til middag. Implementer endepunktet `POST /api/handleliste` som skal kunne legge til nye ting i handlelisten.

Du gjør en POST-request i postman ved å velge POST istedenfor GET. En post-request trenger en body med objektet som skal opprettes. Du legger til en JSON body i Postman slik:
-	Trykk på fanen body
-	Huk av for «raw» 
-	Velg JSON (application/json) i nedtrekksmenyen til høyre. 

I request-bodyen skal du ikke sende med `id`. Denne skal bestemmes av serveren. 

Du har løst oppgaven og kan gå videre til dersom endepunktet returnerer:
-	en passende [statuskode](https://restfulapi.net/http-status-codes/) og
-	en body på dette formatet:
```json
{
  "id": 6,
  "ting": "Paprika",
  "antall": 3,
  "kommentar": "To rød og en gul."
}
```

*Hint:* Ta en titt på body egenskapen til `req` i [dokumentasjonen](https://expressjs.com/en/4x/api.html#req).

## Oppgave 4
Det er ofte nødvendig å kunne endre på objekter med et REST API...

Ingen har råd til mer enn én avokado. I øyeblikket har vi to avokadoer i handlelisten og faren for at kortet blir avvist i kassen er ubehaglig stor. 

Din neste oppgave er å redusere antall avokadoer i handlelisten til 1. Dette må du gjøre med et nytt endepunkt som bruker verbet `PUT`.

Implementer følgende endepunkt:
```PUT /api/handleliste/:id```
Du har løst oppgaven dersom et kall til dette endepunktet lar deg oppdatere en ting i handlelisten og returnerer det oppdaterte objektet.

## Oppgave 5
Gulrot har ingen ting å gjøre i taco. Lag et endepunkt som lar deg slette objekter fra handlelisten. Dette gjøres med verbet `DELETE`. 

Du har løst oppgaven dersom kallet `DELETE /api/handleliste/4` fra Postman sletter gulrot-objektet fra handlelisten. 

Dette endepunktet trenger kun å svare med en fornuftig statuskode.

Ferdig? Da er det bare å hive seg rundt og begynne på del 2.
