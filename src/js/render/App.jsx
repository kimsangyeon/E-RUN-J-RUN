import React from 'react';
import Game from './Game';
import Score from './Score';
import cnst from '../game/cnst';

class App extends React.Component {
    render(){
        return (
            <div>
                <Game/>
                <Score/>
            </div>
        );
    }
}

export default App;