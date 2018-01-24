import Game from './game/Game';
import runImage from './game/images/run.png';
import blockImage from './game/images/block.png';
import specialBlockImage from './game/images/specialBlock.png';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './render/App';

const rootElement = document.getElementById('main');
ReactDOM.render(<App />, rootElement);

window.Game = new Game();