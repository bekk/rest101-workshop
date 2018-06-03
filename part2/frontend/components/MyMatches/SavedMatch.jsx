import React from "react";

import Team from "./Team";

class SavedMatch extends React.Component {
  render() {
    return (
      <div className="myMatches-savedMatch">
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
    );
  }
}

export default SavedMatch;
