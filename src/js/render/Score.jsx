import React from 'react';
import cnst from '../game/cnst';

class Score extends React.Component {
    render() {
        const boardStyle = {
            width: cnst.boardWidth,
            height: cnst.boradHeight,
            float: 'right',
            background: 'orange',
            opacity: 0.4
        }

        return (
            <div id='eScoreBoard' style={boardStyle}>
                {"0"}
            </div>
        );
    }
}

export default Score; 