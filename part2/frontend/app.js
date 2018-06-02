import React from "react";
import ReactDOM from "react-dom";

import MatchSchedule from "./components/MatchSchedule";
import api from "./utils/api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      teams: [],
      savedMatches: [],
    };
    this.addMatchToSavedMatches = this.addMatchToSavedMatches.bind(this);
  }
  componentDidMount() {
    Promise.all([
      api.getAllMatches(),
      api.getAllTeams(),
      api.getAllSavedMatches(),
    ]).then(result => {
      this.setState({
        matches: result[0].matches,
        teams: result[1].teams,
        savedMatches: result[2].savedMatches,
      });
    });
  }

  addMatchToSavedMatches(matchId) {
    api
      .saveMatch(matchId)
      .then(res => {
        this.setState(prevState => {
          return { savedMatches: [...prevState.savedMatches, res.matchId] };
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main className="mainSection">
        <h1>VM-planlegger</h1>
        <h2>Dine kamper</h2>
        <MatchSchedule
          matches={this.state.matches}
          teams={this.state.teams}
          saveMatch={this.addMatchToSavedMatches}
        />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
