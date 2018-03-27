
class Controller {
    constructor(game) {
        this.game = game;
    }

    /**
     * game 객체 gameOver 호출
     */
    gameOver() {
        this.game.gameOver();
    }
}

export default Controller;