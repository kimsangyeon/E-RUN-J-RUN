import Game from './game/Game';
import runImage from './game/images/run.png';
import slideImage from './game/images/slide.png';
import blockImage from './game/images/block.png';
import iceBlockImage from './game/images/iceBlock.png';
import coinImage from './game/images/coin.png';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './render/App';
import Score from './render/Score';

const rootElement = document.getElementById('main');
ReactDOM.render(<Score />, rootElement);
ReactDOM.render(<App />, rootElement);

window.Game = new Game();