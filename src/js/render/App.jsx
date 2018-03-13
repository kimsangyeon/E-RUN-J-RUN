import React from 'react';
import Game from './Game';
import Score from './Score';

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