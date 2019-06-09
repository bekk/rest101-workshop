import React from 'react';

const Team = props => {
    return (
        <div className="myMatches-team">
            <img className="myMatches-flag" src={props.flagUrl}/>
            {props.teamName}
        </div>
    );
};

export default Team;
