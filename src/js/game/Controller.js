
class Controller {
    constructor(game) {
        this.game = game;
    }

    gameOver() {
        this.game.gameOver();
    }
}

export default Controller;