# Del 1 - handleliste API
I ddel 1 skal vi lage et REST API for en handleliste. Du vil bli kjent med express.js og POSTMAN. Express.js er et rammeverk for å lage web apps og API-er. Postman er et verktøy som lar deg gjøre HTTP-requests og er nyttig for å utforske og utvikle API-er.

## Kom i gang
1.	Last ned og installer Postman fra https://www.getpostman.com/downloads/ 
2.	Gjør en request fra postma:
    1. Velg verbet GET
    2. Skriv inn ` postman-echo.com/get` i feltet der det står «Enter request URL».
    3. Trykk send. Sjekk at du får en respons før du går videre.
 
3.	Start en terminal og gå til mappen der du pakket ut workshopen. Kjør de tre neste kommandoene i tur og orden i terminalen:
    1.	`$ cd del1/src`
    2.	`$ npm install` (installerer alle nødvendige avhengigheter)
    3.	`$ npm run server` 

Denne siste kommandoen starter webserveren ved å kjører scriptet `server` som er definert i `package.json`.

## Oppgave 1
I denne oppgaven skal vi gå raskt gjennom hva en express app består av og hvordan vi lager API-endepunkt.

Åpne filen `del1/server.js` i din favoritt editor. Her har vi satt opp skallet for API-et du skal implementere.

På de to første linjene importerer vi express.js og oppretter en express app.
```js
const express = require('express');
const app = express();
```

`app`-objektet kan vi bruke til å sette opp endepunkter for API-et. Vi har alt satt opp endepunktet `GET /api/handleliste`.

Vi kallet `.get()`-metdoen på `app`-objektet for å opprette et endepunkt som håndterer request med verbet GET. Denne metoden har to parametere. Url-en endepunktet skal svare på og en funksjon som håndterer requests. Disse to tingene kaller vi henoldsvis for _route_ og _handler_. 

Handler funksjonen tar også inn to parametere, `req` og `res`. `req` er et objekt med informasjon om requesten og `res` er et objekt som lar deg styre hvordan endepunktet skal respondere på requesten. Under er et eksempel på et endepunkt:
```js
app.get("/url/til/endepunkt", (req, res) => {
  const response = "Hello world!";
  res.send(response);
};
```

Dette API-endepunktet svarer på requests med verbet `GET`. Dersom du ønsker å lage et endepunkt som svarer på `DELETE`, bruker du metoden `.delete()` istedenfor `.get()`. Tilsvarende gjelder for `PUT` og `POST`. Om du vil vite mer om routing i express, ta en kikk på dokumentasjonen [her](https://expressjs.com/en/starter/basic-routing.html).


På bunnen av filen `server.js` kaller vi metoden `.list()` på app-objektet. Denne metoden gjør at express lytter etter requests på porten som sendes inn som første parameter. Når det kommer en request på denne porten, forsøker express å sende requesten til handler som matcher med verg og route til requesten. Om express ikk finne noen handler som matcher, svarer serveren med 404 - Nor found.

**Din oppgave**: 
Gjøre en GET request mot http://localhost:3000/api/handleliste i Postman. Sjekk at du får ut handlelisten og gå videre til neste oppgave.

## Oppgave 2
Endepunktet `GET /api/handleliste` returnerer ikke alle egenskapene til tingene i handlelisten. I REST endepunkt der man returnerer alle tingene i samling, er det kun de viktigste egenskapene tingene som skal returneres. Dette er for å gjøre responsen fra serveren så liten som mulig. 

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

**Nyttige lenker:**
Express.js dokumentasjon om req-objektet. //TODO

Hint: Du kan hente ut id-en fra `req`slik:
```js
const id = req.params.id;
```

## Oppgave 3
Det er mange ting i som mangler i handlelisten dersom det skal bli taco til middag. Implementer endepunktet `POST /api/handleliste` som skal kunne legge til nye ting i handlelisten.

Du gjør POST-request i postman ved å velge POST  istedenfor GET. En post request trenger en body med objektet som skal opprettes. Du legger til en JSON body i Postman slik:
-	Trykk på fanen body
-	Huk av for «raw» 
-	Velg JSON (application/json) i nedtrekksmenyen til høyre. 

I request bodyen skal du ikke sende med `id`. Denne skal bestemmes av serveren. 

Du har løst oppgaven og kan gå videre til dersom endepunktet returnerer:
-	en passende [statuskode](https://restfulapi.net/http-status-codes/) og
-	en body på dette formatet:
```json
{
  "id": 2,
  "ting": "Avocado",
  "antall": 2,
  "kommentar": "Må være moden. Om ikke, kjøp guacamole på boks."
}
```

## Oppgave 4
Ingen har råd til mer enn en avokado. For å endre antall ønskede avokadoer i handlelisten til 1 må du lage et endepunkt som lar deg endre på et objekter i listen. Dette gjøres med verbet `PUT`.

Implementer følgende endepunkt:
```PUT /api/handleliste/:id```
Du har løst oppgaven dersom et kall til dette endepunktet lar deg oppdatere en ting i handlelisten og returnerer det oppdaterte objektet.

## Oppgave 5
Gulrot har ingen ting å gjøre i taco. Lag et endepunkt som lar deg slette objekter fra handlelisten. Dette gjøres med verbet `DELETE`. 

Du har løst oppgaven dersom kallet `DELETE /api/handleliste/4` fra Postman sletter gulrot-objektet fra handlelisten. 

Ferdig? Da er det bare å hive seg rundt og begynne på del 2.
