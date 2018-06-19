import React from 'react';
import moment from 'moment';

import Match from './Match';
import { getTeamWithId } from './../../dataStore/staticData';

export default class MatchDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="matchSchedule-daylist-date">
          {moment(new Date(this.props.date)).format('MMMM Do')}
        </h3>
        <section className="matchSchedule-daylist">
          {this.props.matchesThisDay &&
            this.props.matchesThisDay.length > 0 &&
            this.props.matchesThisDay.map(match => {
              const homeTeam = getTeamWithId(match.home_team);
              const awayTeam = getTeamWithId(match.away_team);
              const homeTeamName = homeTeam ? homeTeam.name : '?';
              const homeTeamEmoji = homeTeam ? homeTeam.emojiString : '';
              const awayTeamName = awayTeam ? awayTeam.name : '?';
              const awayTeamEmoji = awayTeam ? awayTeam.emojiString : '';
              const homeGoals = match.home_result;
              const awayGoals = match.away_result;
              return (
                <Match
                  key={match.name}
                  match={match}
                  homeTeam={homeTeamName}
                  homeTeamEmoji={homeTeamEmoji}
                  homeGoals={homeGoals}
                  awayTeam={awayTeamName}
                  awayTeamEmoji={awayTeamEmoji}
                  awayGoals={awayGoals}
                  saveMatch={this.props.saveMatch}
                />
              );
            })}
        </section>
      </React.Fragment>
    );
  }
}
