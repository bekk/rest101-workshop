import React from "react";
import PropTypes from "prop-types";

const Match = props => {
  const timeOfMatch = new Date(props.match.date).toTimeString().slice(0, 5);

  return (
    <li className="matchSchedule-match">
      <span className="matchSchedule-time">{timeOfMatch} </span>
      {props.homeTeam} - {props.awayTeam}
      <button
        className="matchSchedule-addMatch"
        onClick={() => props.saveMatch(props.match.name)}
      >
        Legg til
      </button>
    </li>
  );
};

export default Match;

Match.propTypes = {
  match: PropTypes.object,
  homeTeam: PropTypes.string,
  awayTeam: PropTypes.string,
  saveMatch: PropTypes.func,
};