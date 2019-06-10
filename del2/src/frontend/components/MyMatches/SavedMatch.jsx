import React from 'react';
import moment from 'moment';
import api from './../../utils/api';
import { getTeamWithId } from './../../dataStore/staticData';
import Team from './Team';
import { norwegianRoundFromEnglish } from './texts';

const UNKNOWN_TEAM = {
  name: 'Ukjent'
};

class SavedMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: {},
      channel: {},
      weather: {}
    };
    if (props.matchId !== undefined || props.matchId !== null) {
      api.getMatch(props.matchId).then(matchData => {
        this.setState({ matchData: matchData });

        api
          .fetchChannel(matchData.channels[matchData.channels.length - 1])
          .then(channel => {
            this.setState({ channel: channel });
          });

        api.fetchWeather(matchData.date).then(weather => {
          this.setState({ weather: weather });
        });
      });
    }
  }

  render() {
    if (!this.state.matchData) return <div>Loading...</div>;
    const homeTeam =
      getTeamWithId(this.state.matchData.home_team) || UNKNOWN_TEAM;
    const awayTeam =
      getTeamWithId(this.state.matchData.away_team) || UNKNOWN_TEAM;
    const groupLetter = homeTeam.group_letter;
    const homeGoals = this.state.matchData.home_result;
    const awayGoals = this.state.matchData.away_result;
    return (
      <section className="myMatches-savedMatch">
        <section className="myMatches--inner-container">
          <button
            className="myMatches-remove"
            onClick={() => this.props.removeMatch(this.props.matchId)}
          />
          <div className="myMatches-topInfo">
            <div>
              {moment(new Date(this.state.matchData.date)).format(
                'HH:mm MMMM Do'
              )}
            </div>
            <div>
              {norwegianRoundFromEnglish(this.state.matchData.matchCategory, groupLetter)}
            </div>
          </div>
          <div className="myMatches-teamsInMatch">
            <Team teamName={homeTeam.country} flagUrl={homeTeam.flag} />
            <span className={`myMatches-homeGoals ${homeGoals > awayGoals ? 'myMatches-winner' : ''}`}>{homeGoals}</span>
            <div className="myMatches-teamSeparator" />
            <span className={`myMatches-awayGoals ${homeGoals < awayGoals ? 'myMatches-winner' : ''}`}>{awayGoals}</span>
            <Team teamName={awayTeam.country} flagUrl={awayTeam.flag} />
          </div>
          <div className="row">
            <div className="col-sm">
              <img
                className="myMatches-channel"
                src={this.state.channel.icon}
              />
            </div>
            <div className="col-sm">
              <span className="myMatches-weather">
                {this.state.weather.symbolUrl && (
                  <img
                    src={
                      'https://fotballfest-api-2019.herokuapp.com' +
                      this.state.weather.symbolUrl
                    }
                    className="myMatches-weather-symbol"
                  />
                )}
                <span className="myMatches-weather-info">
                  {this.state.weather.location &&
                    this.state.weather.location.temperature.value}
                  &deg;C
                  {this.state.weather.rain && ' / ' + this.state.weather.rain}
                </span>
              </span>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default SavedMatch;
