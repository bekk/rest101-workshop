import React from "react";

const Match = props => {
  const timeOfMatch = new Date(props.match.date).toTimeString().slice(0, 5);

  return (
    <li class="allMatches-match">
      <span class="allMatches-time">{timeOfMatch} </span>
      {props.homeTeam} - {props.awayTeam}
      {/* <button class="allMatches-addMatch">Legg til</button> */}
    </li>
  );
};

export default Match;
