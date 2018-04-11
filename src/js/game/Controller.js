
class Controller {
    constructor(game) {
        this.game = game;
    }

    gameOver(charFrameId, blockFrameId, coinFrameId) {
        this.game.gameOver(charFrameId, blockFrameId, coinFrameId);
    }
}

export default Controller;