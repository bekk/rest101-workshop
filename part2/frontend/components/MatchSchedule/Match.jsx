import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

const Match = props => {
  return (
    <li className="matchSchedule-match">
      <span className="matchSchedule-time">{moment(new Date(props.match.date)).format('HH:mm')}</span>
      <span> {props.homeTeam} - {props.awayTeam} </span>
      <button
        className="matchSchedule-addMatch btn"
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
