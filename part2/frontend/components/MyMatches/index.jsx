import React from "react";

import { getMatches } from "./../../dataStore/staticData";

class MyMatches extends React.Component {
  constructor(props) {
    super(props);
  }

  getDataForSavedMatches() {
    const savedMatchesInfo = this.props.savedMatches.map(matchId =>
      getMatches().find(match => match.name === matchId),
    );
    console.log(savedMatchesInfo);
  }

  render() {
    this.getDataForSavedMatches();
    return <h2>Dine kamper</h2>;
  }
}

// Print ut data, klokkeslett for kampen
// Print ut hvem som spiller. Altså samme som tidligere
// Ta med flagg
// ta med type kamp
// lag dataset på
export default MyMatches;
