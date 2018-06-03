import React from "react";

import Team from "./Team";
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
    return (
      <div>
        <h2>Dine kamper</h2>
        <div className="myMatches-match">
          <div className="myMatches-topInfo">
            <div>MANDAG 17.Juni 20.00</div>
            <div>Gruppespill</div>
          </div>
          <div className="myMatches-teamsInMatch">
            <Team
              teamName={"Russia"}
              flagUrl={
                "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.png"
              }
            />
            <div className="myMatches-teamSeparator" />
            <Team
              teamName={"Saudi Arabia"}
              flagUrl={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/750px-Flag_of_Saudi_Arabia.png"
              }
            />
          </div>
        </div>
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
