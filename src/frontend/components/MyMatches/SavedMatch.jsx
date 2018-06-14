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
    if (props.matchId) {
      api.getMatch(props.matchId).then(matchData => {
        this.setState({ matchData: matchData });

        api
          .fetchChannel(matchData.channels[matchData.channels.length - 1])
          .then(channel => {
            this.setState({ channel: channel });
          });
        
        api.fetchWeather(matchData.date).then(weather => {
          this.setState({weather: weather});
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
    return (
      <div className="myMatches-savedMatch">
        <div className="myMatches--inner-container">
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
              {norwegianRoundFromEnglish(this.state.matchData.matchCategory)}
            </div>
          </div>
          <div className="myMatches-teamsInMatch">
            <Team teamName={homeTeam.name} flagUrl={homeTeam.flag} />
            <div className="myMatches-teamSeparator" />
            <Team teamName={awayTeam.name} flagUrl={awayTeam.flag} />
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
                {
                    this.state.weather.symbolUrl &&
                    <img
                        src={"https://fotballfest-test.herokuapp.com" + this.state.weather.symbolUrl}
                        className="myMatches-weather-symbol"
                    />
                }
                <span className="myMatches-weather-info">
                  {this.state.weather.location && this.state.weather.location.temperature.value}
                  &deg;C
                  {this.state.weather.rain && " / " + this.state.weather.rain}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedMatch;
