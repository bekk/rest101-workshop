import React from "react";

import api from "./../../utils/api";
import { getTeamWithId } from "./../../dataStore/staticData";
import Team from "./Team";
import { norwegianRoundFromEnglish } from './texts';

const UNKNOWN_TEAM = {
    name: 'Ukjent',
};

class SavedMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchData: undefined,
        };
        if (props.matchId) {
            api.getMatch(props.matchId).then(matchData => {
                this.setState({matchData: matchData});
            });
        }
    }

    render() {
        if (!this.state.matchData) return <div>Loading...</div>;
        const homeTeam = getTeamWithId(this.state.matchData.home_team) || UNKNOWN_TEAM;
        const awayTeam = getTeamWithId(this.state.matchData.away_team) || UNKNOWN_TEAM;
        return (
            <div className="myMatches-savedMatch">
                <div className="myMatches--inner-container">
                    <button className="myMatches-remove" onClick={() => this.props.removeMatch(this.props.matchId)}/>
                    <div className="myMatches-topInfo">
                        <div>{new Date(this.state.matchData.date).toLocaleDateString()}</div>
                        <div>{norwegianRoundFromEnglish(this.state.matchData.matchCategory)}</div>
                    </div>
                    <div className="myMatches-teamsInMatch">
                        <Team teamName={homeTeam.name} flagUrl={homeTeam.flag}/>
                        <div className="myMatches-teamSeparator"/>
                        <Team teamName={awayTeam.name} flagUrl={awayTeam.flag}/>
                    </div>
                    <span className="myMatches-weather">Værmelding: Sol og sky, 19 grader</span>
                    <span className="myMatches-channel">Vises på: UKJENT</span>
                </div>
            </div>
        );
    }
}

export default SavedMatch;
