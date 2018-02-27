import React from 'react';
import cnst from '../game/cnst';

class Score extends React.Component {
    constructor() {
        super();
        this.state = {
          score : 0
        }
      }
    componentDidMount() {
        this.timer = setInterval( () => {
          this.tick()
        },1000)
    }
    tick() {
        this.setState({
            score: this.state.score + 1
        });
      }
    render(){
        const boardStyle = {
            width: cnst.boardWidth,
            height: cnst.boradHeight,
            float: 'right',
            background: 'orange',
            opacity: 0.4
        }

        return (
            <div id='ScoreBoard' style={boardStyle}> 
                {this.state.score} 
            </div>
        );
    }
}

export default Score;