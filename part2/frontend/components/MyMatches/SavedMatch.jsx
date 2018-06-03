import React from "react";

import api from "./../../utils/api";
import { getTeamWithId } from "./../../dataStore/staticData";
import Team from "./Team";

class SavedMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: undefined,
    };
    if (props.matchId) {
      api.getMatch(props.matchId).then(matchData => {
        this.setState({ matchData: matchData });
      });
    }
  }

  render() {
    if (!this.state.matchData) return <div>Loading...</div>;
    const homeTeam = getTeamWithId(this.state.matchData.home_team);
    const awayTeam = getTeamWithId(this.state.matchData.away_team);
    return (
      <div className="myMatches-savedMatch">
        <div className="myMatches-topInfo">
          <div>{new Date(this.state.matchData.date).toLocaleDateString()}</div>
          <div>Gruppespill</div>
        </div>
        <div className="myMatches-teamsInMatch">
          <Team teamName={homeTeam.name} flagUrl={homeTeam.flag} />
          <div className="myMatches-teamSeparator" />
          <Team teamName={awayTeam.name} flagUrl={awayTeam.flag} />
        </div>
        <div>Værmelding: Sol og sky, 19 grader</div>
        <div className="myMatches-moreInfo">
          <div>TV-channel: NRK</div>
          <div>Værmelding: Sol og sky, 19 grader</div>
          <button onClick={() => this.props.removeMatch(this.props.matchId)}>
            Fjern fra dine kamper
          </button>
        </div>
      </div>
    );
  }
}

export default SavedMatch;
