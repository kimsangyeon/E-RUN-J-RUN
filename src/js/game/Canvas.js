import cnst from './cnst';
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
        this.canvas.width = cnst.canvasWidth; //px
        this.canvas.height = cnst.canvasHeight; //px
        this.context = this.canvas.getContext('2d');
        elMain.appendChild(this.canvas);

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 38) {
                this.charecter.isJump = true;
                setTimeout(function() {
                    this.charecter.isJump = false;
                }.bind(this), 500);
            }
        });
    }

    initCharecter() {
        let charImage = new Image();
        charImage.src = "./images/coin.png";

        this.charecter = new Charecter({
            context: this.context,
            width: cnst.charWidht,
            height: cnst.charHeight,
            x: cnst.charX,
            y: cnst.charY,
            image: charImage,
            ticksperFrame: cnst.ticksperFrame,
            numberOfFrames: cnst.numberOfFrames
        });
        this.charecter.isJump = false;

        setTimeout(function() {
            this.renderCharecter();
        }.bind(this), 500);
    }

    renderCharecter() {
        window.requestAnimationFrame(this.renderCharecter.bind(this));

        this.charecter.update();
        if (!this.charecter.isJump) {
            this.charecter.render();
        } else {
            this.charecter.jumpRendr();
        }
    }
}

export default Canvas;