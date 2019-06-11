# REST 101
Følg stegene under for å komme i gang.

## Steg 1: Har du alt installert?

Åpne en terminal. Kjør følgende kommandoer (Uten $ i start av kommando. Dette gjelder alle kommandoer i denne teksten)..
```
$ node --version
$ npm --version
```

Er det noen av disse som ikke svarer med et versjonsnummer? Da mangler du enten node eller npm. Ta kontakt, så hjelper vi deg. Det skal i utgangspunktet ikke spille noen rolle hvilken versjon du har installert av node og npm.

Kjør så følgende kommando i terminalen:
```
$ npm i -g parcel-bundler@1.12.3 nodemon
```
Denne installerer [parcel](https://parceljs.org/) og [nodemon](https://nodemon.io/). Disse brukes for å kjøre prosjektene i del 1 og 2.

## Steg 2:
Last ned .zip-filen under og pakk den ut. Destinasjonen blir heretter referert til som $PROJECT_DIR
https://github.com/bekk/rest101-workshop/archive/master.zip

## Steg 3 - oppsett del 1

I terminalen:
```
$ cd $PROJECT_DIR/del1/src/
$ npm i
$ npm run server
```

Du kan nå gjøre del 1 av workshopen. Dere må jobbe i deres eget tempo og dere må selv passe på å ta pauser. 

Oppgavene finne du her `/del1/OPPGAVE_1.md`. Du kan også lese oppgavene på github [her](https://github.com/bekk/rest101-workshop/blob/master/del1/OPPGAVE_1.md).
## Steg 4 - oppsett del 2
Ferdig med del 1? Følg instruksjonene under for å komme i gang med del 2.

Stans prosessen du startet i terminalen i Steg 3. Dette kan gjøres ved å trykke `Ctrl + C`. Kjør så følgende kommandoer i terminalen:
```
$ cd $PROJECT_DIR/del2/src/
$ npm i
$ npm run frontend
```

Åpne et nytt terminalvindu:
```
$ cd $PROJECT_DIR/del2/src/
$ npm run backend
```

Naviger til `localhost:3000` i en nettleser. Formodentlig ikke i Internet Explorer. (Vi diskriminerer ikke, vi vet bare ikke hvor smertefull utviklingsopplevelsen din blir)

Det du nå har satt opp er to prosesser. Hold disse kjørende under hele del to av workshopen.

`npm run frontend` bruker `parcel` til å lytte på endringer i `frontend/`-mappen. Ved refresh skal du være ~garantert nyeste versjon. Ved seriøse feil ved bygging av frontend vil det bli logget i dette vinduet.
`npm run backend` bruker `nodemon` til å lytte på endringer i `server.js`. Dersom scriptet oppdager endring etter et `server.js` blir lagret, startes serveren på nytt. Seriøse feil på serveren blir logget til dette vinduet.

Om du er nysgjerrig kan gå inn i filen `package.json` for å se hva som skjer når du kjører disse to kommandoene.

### Oppgavetid.
Oppgaver ligger i mappen `del2/oppgaver/`. Det er bare å begynne. Arbeidet vil foregå i filene `src/frontend/utils/api.js` og `src/server.js`.
Dersom siden blir svart, se i debug-konsollen DevTools (Cmd+Alt+J på Mac / F11 på Windows). 

## Nyttig ressurs - Introduksjon til webutvikling
https://johhorn.gitbooks.io/web-intro/
