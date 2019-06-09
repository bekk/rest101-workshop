# REST 101

## Steg 1: Har du alt installert?

Åpne en terminal. Kjør følgende kommandoer (Uten $ i start av kommando. Dette gjelder alle kommandoer i denne teksten)..
```
$ node --version
$ npm --version
```

Er det noen av disse som ikke svarer med et versjonsnummer? Ta kontakt, så hjelper vi deg.

Kjør så følgende kommando i terminalen:
```
$ npm i -g parcel-bundler nodemon
```
Denne installerer [parcel](https://parceljs.org/) og [nodemon](https://nodemon.io/) som brukes for å kjøre prosjektet i Steg 3. 

## Steg 2:
Last ned .zip-filen under og pakk den ut. Destinasjonen blir heretter referert til som $PROJECT_DIR
https://github.com/bekk/rest101-workshop/archive/master.zip

## Steg 3

I terminalen:
```
$ cd $PROJECT_DIR/src/
$ npm i
$ npm run frontend
```

Åpne et nytt terminalvindu:
```
$ cd $PROJECT_DIR/src/
$ npm run backend
```

Naviger til `localhost:3000` i en nettleser. Formodentlig ikke i Internet Explorer. (Vi diskriminerer ikke, vi vet bare ikke hvor smertefull utviklingsopplevelsen din blir)

Det du nå har satt opp er to prosesser. Hold disse kjørende under hele workshopen.

`npm run frontend` lytter på endringer i `frontend/`-mappen, ved refresh skal du være ~garantert nyeste versjon. Ved seriøse feil ved bygging av frontend vil det bli logget i dette vinduet.
`npm run backend` lytter på endringer i `server.js`. Ved seriøse feil på serveren vil det bli logget i dette vinduet.

Om du er nysgjerrig kan gå inn i filen `package.json` for å se hva som skjer når du kjører disse to kommandoene.

## Steg 4 - Oppgavetid.
Oppgaver ligger i `oppgaver/`. Det er bare å begynne. I all hovedsak vil arbeidet foregå i filene `src/frontend/utils/api.js` og `src/server.js`.
Dersom siden blir svart, se i debug-konsollen DevTools (Cmd+Alt+J på Mac / F11 på Windows). 

Det er langt flere oppgaver her enn det vi har tid til i dag. Dere må jobbe i deres eget tempo og dere må selv passe på å ta pauser.  

## Nyttig ressurs - Introduksjon til webutvikling
https://johhorn.gitbooks.io/web-intro/
