import React from 'react';
import cnst from '../game/cnst';

class Game extends React.Component {
    render(){
        return (
            <canvas id='game'tabIndex="0" ref='cavas' width={cnst.canvasWidth} height={cnst.canvasHeight}/>
        );
    }
}

export default Game;