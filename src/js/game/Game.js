import Canvas from './Canvas';
import Controller from './Controller';
import Score from './Score';

class Game {
    constructor() {
        this.canvas = null;
        this.controller = null;
        this.score = null;

        this.initController();
        this.initCanvas();
        this.initScore();
    }

    initController() {
        this.controller = new Controller(this);
    }

    initCanvas() {
        let id = 1;
        this.canvas = new Canvas(id, this.controller);
    }

    initScore() {
        this.elScore = document.getElementById('eScoreBoard');
        this.score = new Score(this.elScore);
    }

    gameOver() {
        window.cancelAnimationFrame(this.canvas.charFrameId);
        window.cancelAnimationFrame(this.canvas.blockFrameId);
        window.cancelAnimationFrame(this.canvas.coinFrameId);
        this.score.componentDidClear();
    }
}

export default Game;