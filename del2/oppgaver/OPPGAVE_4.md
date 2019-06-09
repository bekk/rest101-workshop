# Oppgave 4: HATEOAS

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