# Bonus-oppgave

6a)

Ved å gjøre et POST-kall mot https://fotballfest.herokuapp.com/api/attendees kan man legge seg til i BEKK Sommerjobb 2018 sin deltakerliste for en gitt kamp.

POST-operasjonen forventer følgende data:
{
"name": "Esben Aarseth",
"kamp": <ID>
}

Begynn å registrer dine kamper mot denne URL-en.

6b)
Deltakerne i den globale listen for en gitt kamp ligger som en del av responsen til en kamp på dette API-et. Bruk det til å liste opp
hvem andre som kommer på en kamp i appen din.

6c)
API-et støtter også å fjerne deltakere. Gjør en DELETE mot https://fotballfest.herokuapp.com/api/attendees/:DELTAKER_ID for å fjerne deg selv fra listen.