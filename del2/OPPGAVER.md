
# Oppgave 2

## a)
Den observante fotballelskeren ser kanskje at noen resultater mangler. Det er fordi all data kommer fra en statisk fil som vi ikke har oppdatert enda.
For å få med resultater kan du enten være nerden som oppdaterer resultater hvert minutt av VM. Eller så kan du være den typen som benytter seg av noen andre sine data.

På `https://fotballfest-api-2019.herokuapp.com/api/matches` kan dere hente ut kamper med resultat. Benytt endepunktet for å hente ut kamper i stedet for å benytte den statiske JSON-filen. 

OBS!
Tjenesten benytter Basic Auth (Brukernavn/Passord: kontraskjaeret/Sommerjobb2019).
Mye av hverdagen består i å google, så du kan like godt begynne i dag.

## Hint: 
* Test endepunktet i postman før du forsøker å bruke det i prosjektet. Postman støtter autentisering.

## b)

Det er vanskelig å planlegge å dra på Kontraskjæret uten å vite hvilket vær som er meldt. 
På https://fotballfest-api-2019.herokuapp.com/api/weather kjører et vær-API. Dette API-et forventer en query-param som heter `time` og består av et URIEncoded UTC-tidsstempel på formatet `2019-06-15T11:28:28Z`. Koble løsningen på dette endepunktet for å vise været for en gitt kamp. 

## Hint: 
* Test endepunktet i postman før du forsøker å bruke det i prosjektet.
* JSONP er ikke lov å benytte
* Prinsippet om at frontenden til http://vg.no ikke kan gjøre requester til http://dagbladet.no gjelder ikke for server-til-server-kommunikasjon


# Oppgave 3: Versjonering

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



# Bonusoppgave 2: HATEOAS
HATEOAS står får Hypermedia As The Engine Of Application State. Prinsippet er at man med REST-apier skal kunne navigere seg rundt i et API.

Skriv om "/matches" slik at det følger med lenker til relevante operasjoner man kan gjøre med en kamp. Det vil si å legge til eller fjerne en kamp fra lagrede kamper.

Definition of done: /matches er eneste hardkodede lenken i frontend.

## Tips:
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

... Javascript sin array metode har en map-funksjon?
Den fungerer slik.
```js
const myArray = [1,2,3]
const myArrayMultipliedWith2 = myArray.map(function(number) {
    return number*2;
});
console.log(myArrayMultipliedWith2) // Output: [2,4,6]

```
Svært nyttig når man har en array og har lyst til å transformere det. F.eks. ved å legge på lenker.