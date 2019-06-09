# Del 1 - handleliste API
I denne del 1 skal vi lage et REST API for en handleliste. Du vil bli kjent med express.js og POSTMAN. Express.js er et rammeverk for å lage web apps og API-er. Postman er et verktøy som lar deg gjøre requests og er nyttig for å utforske og utvikle API-er.

## Kom i gang
1.	Last ned og installer Postman fra https://www.getpostman.com/downloads/ 
2.	Gjør en request fra postman
  1.	Velg verbet GET
  2. Skriv inn ` postman-echo.com/get` i feltet der det står «Enter request URL».
  3. Trykk send. Sjekk at du får en respons før du går videre.
 
3.	Gå til mappen der du pakket ut workshopen fra github. Kjør:
  1.	`$ cd del1`
  2.	`npm i`. (`npm i` er kort for `npm install` som installerer alle nødvendige avhengigheter).
4.	Kjør `npm run server`. Denne kommandoen starter webserveren ved å kjører scriptet «server» som er definert i package.json.

## Oppgave 1
Åpne filen del1/server.js i din favoritt editor. Her har vi satt opp skallet for API-et du skal implementere.
På de to førstelinjene importerer vi express.js og oppretter en express app.
const express = require('express');
const app = express();

app objektet kan vi bruke til å sette opp endepunktene for API-et. Vi har alt satt opp endepunktet GET /api/handleliste 
Når vi skal opprette et endepunkt som håndterer requests med verbet GET, kaller vi get metoden på app objektet. Denne metoden tar en to parametere. Den første er url-en endepunktet skal leve på. Den andre er en funksjon som håndterer requestene på dette endepunktet. Denne funksjonen tar inn to parametere, req og res. Req er et objekt med informasjon om requesten og res er et objekt som lar deg styre hvilken respons endepunktet skal returnere.
```js
app.get(«url til endepunkt», (req, res) => {
…
res.send(svar);
};
```
På bunnen av filen server.js kaller vi metoden listen på app objektet. Denne metoden gjør at serveren lytter etter requests på porten som er satt i variablen port, og sender requests til endepunktene vi har satt opp.
Gjøre et kall mot http://localhost:3000/api/handleliste Postman. Sjekk at du får ut handlelisten og gå videre til neste oppgave.

## Oppgave 2
I endepunktet i Oppgave 1, returneres ikke alle egenskapene til tingene i handlelisten. I REST endepunkt der man returnerer alle tingene i samling, er det kun de viktigste egenskapene som skal returneres. Dette er for å gjøre responsen fra serveren så liten som mulig. 

I handlelisten som returneres i oppgave 1, er kommentaren utelatt. Du skal nå implementere endepunktet som lar deg hente ut all informasjon om et objekt i handlelisten.
Endepunktet skal være på dette formatet: ```GET /api/handleliste/2```.

Tallet 2 er id-en til tingen i handlelisten du ønsker å hente ut. Svaret på responsen fra serveren skal være på dette formatet:
```json
{
	{
    "id": 2,
    "ting": "Avocado",
    "antall": 2,
    "kommentar": "Må være moden. Kjøp ferdig guacamole om de ikke har modne avocadoer."
  }
}
```

**Nyttige lenker:**
Express.js dokumentasjon om req-objektet.

Hint: Du kan hente ut id-en slik:
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
-	en passende status (https://restfulapi.net/http-status-codes/) og
-	en body på formatet
```
{
  id: 2,
	ting: "Avocado",
	antall: 2,
	kommentar: "Må være moden. Om ikke, kjøp guacamole på boks."
}
```

## Oppgave 4
Ingen har råd til mer enn en avokado, derfor må du endre tingen med id 2. Dette gjøres med verbet `PUT`. Implementer følgende endepunkt:
```PUT /api/handleliste/:id```
Du har løst oppgaven dersom et kall til dette endepunktet lar deg oppdatere en ting i handlelisten og returnerer det oppdaterte objektet.

## Oppgave 5
Gulrot har ingen ting å gjøre i taco. Lag et endepunkt som lar deg slette objekter fra handlelisten. Dette gjøres med verbet `DELETE`. 

Du har løst oppgaven dersom kallet `DELETE /api/handleliste/4` fra Postman sletter gulrot-objektet fra handlelisten. 

Ferdig? Kult! Gå videre til del 2.
