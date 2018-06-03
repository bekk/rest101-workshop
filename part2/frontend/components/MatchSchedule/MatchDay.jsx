import React from "react";
import PropTypes from "prop-types";

import Match from "./Match";
import { getTeamWithId } from "./../../dataStore/staticData";

export default class MatchDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.date}</h3>
        <ul className="allMatches-daylist">
          {this.props.matchesThisDay &&
            this.props.matchesThisDay.length > 0 &&
            this.props.matchesThisDay.map(match => {
              const homeTeam = getTeamWithId(match.home_team);
              const awayTeam = getTeamWithId(match.away_team);
              const homeTeamName = homeTeam ? homeTeam.name : "?";
              const awayTeamName = awayTeam ? awayTeam.name : "?";
              return (
                <Match
                  key={match.name}
                  match={match}
                  homeTeam={homeTeamName}
                  awayTeam={awayTeamName}
                  saveMatch={this.props.saveMatch}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}

MatchDay.propTypes = {
  date: PropTypes.string,
  matchesThisDay: PropTypes.array,
  saveMatch: PropTypes.func,
};
