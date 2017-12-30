import Charecter from './Character';

class Canvas {
    constructor(id) {
        this.canvas = null;
        this.context = null;
        this.charecter = null;

        this.id = id;

        this.init();
        this.initCharecter();
    }

    init() {
        let elMain = document.getElementById('main');
        this.canvas = document.createElement('canvas');
        this.canvas.width = 480; //px
        this.canvas.height = 270; //px
        this.context = this.canvas.getContext('2d');
        elMain.appendChild(this.canvas);
    }

    initCharecter() {
        let charImage = new Image();
        charImage.src = "./images/coin.png";

        this.charecter = new Charecter({
            context: this.context,
            width: 44,
            height: 44,
            image: charImage,
            ticksperFrame: 10,
            numberOfFrames: 10
        });
        setTimeout(function() {
            this.renderCharecter();
        }.bind(this), 500);
    }

    renderCharecter() {
        window.requestAnimationFrame(this.renderCharecter.bind(this));

        this.charecter.update();
        this.charecter.render();
    }
}

export default Canvas;