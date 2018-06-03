import React from "react";
import ReactDOM from "react-dom";

import MatchSchedule from "./components/MatchSchedule";
import SavedMatches from "./components/MyMatches";
import MyMatches from "./components/MyMatches";

import api from "./utils/api";
import { setMatches, setTeams } from "./dataStore/staticData";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
      setMatches(result[0].matches);
      setTeams(result[1].teams);

      this.setState({
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
        <MyMatches savedMatches={this.state.savedMatches} />
        <MatchSchedule saveMatch={this.addMatchToSavedMatches} />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
