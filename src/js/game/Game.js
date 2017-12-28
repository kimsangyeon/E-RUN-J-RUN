import Canvas from './Canvas';

class Game {
    constructor() {
        this.canvas = null;

        this.init();
        
    }

    init() {
        let id = 1;
        this.canvas = new Canvas(id);
    }
}

export default Game;