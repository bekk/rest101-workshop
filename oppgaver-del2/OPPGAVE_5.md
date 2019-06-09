# Oppgave 5: Versjonering

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