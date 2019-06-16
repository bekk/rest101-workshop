
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

 ```
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
```
const myArray = [1,2,3]
const myArrayMultipliedWith2 = myArray.map(function(number) {
    return number*2;
});
console.log(myArrayMultipliedWith2) // Output: [2,4,6]

```
Svært nyttig når man har en array og har lyst til å transformere det. F.eks. ved å legge på lenker.