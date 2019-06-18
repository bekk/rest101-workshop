
# Oppgave 2


Følg instruksene i [README](https://github.com/bekk/rest101-workshop). 
Åpne nettleser på localhost:3000

Velkommen til VM-planleggeren. I dag skal dere lage en applikasjon hvor dere kan planlegge hvilke VM-kamper dere ønsker å se på fra Kontraskjæret.

Appen består av en frontend som er nesten helt ferdig og en backend som er nesten helt ferdig. Det som gjenstår er å ferdigstille og ta i bruk API-et for å koble dem sammen. Frontenden er skrevet med rammeverket [React](https://reactjs.org/) og backenden skal lages med rammeverket [express.js](https://expressjs.com/). 


## a)
Akkurat nå er ikke applikasjonen spesielt spennende. Den har en hardkodet kamp som ligger i frontenden til applikasjonen. 
Første oppgave går ut på å hente alle kampene.

Backenden implementerer endepunktet `/api/matches`. Ta en kikk i filen `server.js` for å se hvordan endepunktet er implementert. Responsen på et GET kall ser slik ut:

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

I `frontend/utils/api.js` finner du en del metoder som forventes å fylles ut i løpet av denne workshopen. Din første oppgave er å fylle ut metoden `getAllMatches()` i `api.js`.


Denne metoden skal returnere et *Promise* som resulterer i et objekt i JSON format. Objektet skal være det samme som responsen fra serveren på endepunktet `/api/matches`.

Nå lurer du kanskje på hva et Promise er. Dette kan du lese om [her](https://johhorn.gitbooks.io/web-intro/05-javascript/08-promises.html).

For å gjøre et nettverkskall fra JavaScript i nettleseren kan du bruke funksjonen `fetch()`. Hvordan du bruker `fetch()` kan du lese om i artikklen [*Using fetch*](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).


Du er ferdig med oppgaven når alle kampene listes ut i VM-planleggeren. 


## Hint
* Se på funksjonen som henter ut alle lagene i VM i `api.js`.
* Koden som ligger i api.js er et hardkodet utdrag av det man forventer å få i retur. Det vil si at responsen du mottar som et minimum må inneholde feltene som er hardkodet der.

## b)
Alle kampene er nå synlig i VM-planleggeren. Backenden har et endepunkt som heter `/api/saved-matches`. Dette er en liste med kamper som skal vises på toppen av VM-planleggeren og har en respons som ser slik ut:

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

Det er to kall som må gjøres for å hente ut informasjon om lagrede kamper, et for å hente alle lagrede kamper, og et for å hente informasjon om en kamp. Sistnevnte finnes på `/api/matches/:id` og har følgende respons:

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

Du må fylle ut funksjonen `getAllSavedMatches()` og `getMatch(matchId)` i `api.js`. Responsen til dette endepunktet er være objektet som ble lagt til i listen. For eksempel:
```js
{
   "matchId": 3
}
```

Når dette er gjort, skal det vises like mange kamper på toppen av VM-planleggeren som det er kamper i `savedMatches` variablen.

## c)
Hvis du forsøker å legge til en kamp, så skjer det ingenting. Ta en kikk i `server.js`. Responsen til dette endepunktet er  objektet som ble lagt til i listen. For eksempel:
```js
{
   "matchId": 3
}
```

Fyll ut `saveMatch(matchId)` i `api.js`. Også denne funksjonen skal returnere et promise som resulterer i responsen fra endepunktet.  Det kan være lurt å bruke artikkelen [*Using fetch*](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for å få `fetch`-kallet til å bli riktig.

## Hint
* Har du satt riktig headere?
* Har du gjort om body-parameteren til en string?

**Definition of done:** Kamper du har lagt til blir synlig i toppen av skjermen. Kamper du har lagret blir også værende dersom du refresher siden. 

## d)
Dersom alt har gått bra nå kommer dine lagrede kamper i et panel øverst på siden. 
Denne har en X i høyre hjørne. 

Fyll inn metoden `deleteMatch()` i `api.js`, slik at kamper forsvinner når du trykker de bort. 

## e)
Den observante fotballelskeren ser kanskje at noen resultater mangler. Det er fordi all data kommer fra en statisk fil som vi ikke har oppdatert enda.
For å få med resultater kan du enten være nerden som oppdaterer resultater hvert minutt av VM. Eller så kan du være den typen som benytter seg av noen andre sine data.

På `https://fotballfest-api-2019.herokuapp.com/api/matches` kan dere hente ut kamper med resultat. Benytt endepunktet for å hente ut kamper i stedet for å benytte den statiske JSON-filen. 

OBS!
Tjenesten benytter Basic Auth (Brukernavn/Passord: kontraskjaeret/Sommerjobb2019).
Mye av hverdagen består i å google, så du kan like godt begynne i dag.

## Hint 
* Test endepunktet i postman før du forsøker å bruke det i prosjektet. Postman støtter autentisering.

## f)

Det er vanskelig å planlegge å dra på Kontraskjæret uten å vite hvilket vær som er meldt. 
På https://fotballfest-api-2019.herokuapp.com/api/weather kjører et vær-API. Dette API-et forventer en query-param som heter `time` og består av et URIEncoded UTC-tidsstempel på formatet `2019-06-15T11:28:28Z`. Koble løsningen på dette endepunktet for å vise været for en gitt kamp. 

## Hint
* Test endepunktet i postman før du forsøker å bruke det i prosjektet.
* JSONP er ikke lov å benytte
* Prinsippet om at frontenden til http://vg.no ikke kan gjøre requester til http://dagbladet.no gjelder ikke for server-til-server-kommunikasjon


# Oppgave 3 - Versjonering

Du har mottatt en forespørsel fra en venn som har lyst til å ta i bruk API-et ditt.
Som den gode vennen du er, tillater du at vennen din tar dette i bruk.
Men så skjer det noe med forretningskravene, og du er nødt til å endre på API-et.

Endringen skal skje så smertefri som mulig for begge parter, og du er derfor nødt til å versjonere API-et ditt.

Her finnes det mange veier til Roma.
* Man kan innføre v1 i URL-en. Det vil si "/v1/matches" kan leve samtidig som "/matches".
* Man kan også innføre et nytt endepunkt som den ene applikasjonen tar i bruk. F.eks. "/kamper".
* Man kan løse det vha headere.

Innfør en breaking change i API-et som gjør at du trenger versjonering. Typisk kan dette være at et felt får et nytt navn,
at endepunktet forventer mer data (f.eks. ved en POST/PUT-operasjon), eller ved å fjerne felter som opprinnelig var der.

Tips til breaking changes: Man trenger et navn for å kunne lagre en kamp.

# Bonusoppgave 1
## a)

Ved å gjøre et POST-kall mot https://fotballfest-api-2019.herokuapp.com/api/attendees kan man legge seg til i BEKK Sommerjobb 2019 sin deltakerliste for en gitt kamp.

POST-operasjonen forventer følgende data:
```js
{
    "navn": "Esben Aarseth",
    "kamp": 3
}
```

Begynn å registrer dine kamper mot denne URL-en.

## b)
Deltakerne i den globale listen for en gitt kamp ligger som en del av responsen til en kamp på dette API-et. Bruk det til å liste opp
hvem andre som kommer på en kamp i appen din.

## c)
API-et støtter også å fjerne deltakere. Gjør en DELETE mot https://fotballfest-api-2019.herokuapp.com/api/attendees/:DELTAKER_ID for å fjerne deg selv fra listen.



# Bonusoppgave 2 - HATEOAS
HATEOAS står får Hypermedia As The Engine Of Application State. Prinsippet er at man med REST-apier skal kunne navigere seg rundt i et API.

Skriv om "/matches" slik at det følger med lenker til relevante operasjoner man kan gjøre med en kamp. Det vil si å legge til eller fjerne en kamp fra lagrede kamper.

Definition of done: /matches er eneste hardkodede lenken i frontend.

## Tips
Det finnes ingen fasit på hvordan dette kan løses. Måten undertegnede har løst det på prosjekt er å la hver entitet (f.eks. kamp) ha med følgende
 JSON-data.

 ```js
 {
    // Resten av dataen
    "_links": {
        "relasjon_1": {
            "href": "/lenke-til-relasjon_1",
            "method": "GET",
            "accepts": "application/json",
            "content-type": "application/json"
        },
        "relasjon_2": {
            "href": "/lenke-til-relasjon_2",
            "method": "POST",
            "accepts": "application/json",
            "content-type": "application/json"
        }
    }
 }
 ```

## Visste du at

... Javascript sin array har en map-funksjon?
Den fungerer slik.
```js
const myArray = [1,2,3]
const myArrayMultipliedWith2 = myArray.map(function(number) {
    return number*2;
});
console.log(myArrayMultipliedWith2) // Output: [2,4,6]

```
Svært nyttig når man har en array og har lyst til å transformere det. F.eks. ved å legge på lenker.
