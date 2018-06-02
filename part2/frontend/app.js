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
    };
  }
  componentDidMount() {
    Promise.all([api.getAllMatches(), api.getAllTeams()]).then(result => {
      this.setState({ matches: result[0].matches, teams: result[1].teams });
    }); // Todo: Add error handling
  }
  render() {
    return (
      <main className="mainSection">
        <h1>VM-planlegger</h1>
        <h2>Dine kamper</h2>
        <MatchSchedule matches={this.state.matches} teams={this.state.teams} />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
