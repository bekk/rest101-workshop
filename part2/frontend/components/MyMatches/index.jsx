import React from "react";

import SavedMatch from "./SavedMatch";
import { getMatches } from "./../../dataStore/staticData";

class MyMatches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hasSavedMatches =
      this.props.savedMatches && this.props.savedMatches.length > 0;
    return (
      <div>
        <h2>Dine kamper</h2>
        {hasSavedMatches &&
          this.props.savedMatches.map(match => {
            return <SavedMatch key={match.matchId} matchId={match.matchId} />;
          })}
      </div>
    );
  }
}

// Print ut data, klokkeslett for kampen
// Print ut hvem som spiller. Altså samme som tidligere
// Ta med flagg
// ta med type kamp
// lag dataset på
export default MyMatches;
