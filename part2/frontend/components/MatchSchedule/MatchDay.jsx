import React from "react";

import Match from "./Match";

class MatchDay extends React.Component {
  constructor(props) {
    super(props);
  }

  getTeamWithId(id) {
    return this.props.teams.find(t => t.id === id);
  }

  render() {
    return (
      <div>
        <h3>{this.props.date}</h3>
        <ul>
          {this.props.matches.map(match => {
            const homeTeamObj = this.getTeamWithId(match.home_team);
            const awayTeamObj = this.getTeamWithId(match.away_team);
            const homeTeam = homeTeamObj ? homeTeamObj.name : "?";
            const awayTeam = awayTeamObj ? awayTeamObj.name : "?";
            return (
              <Match match={match} homeTeam={homeTeam} awayTeam={awayTeam} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MatchDay;
