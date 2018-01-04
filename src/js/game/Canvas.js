import cnst from './cnst';
import Charecter from './Character';

/**
 * Canvas Class
 * Charecter 및 Block instance 관리
 */
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
            if (e.keyCode === 38 && this.charecter.gravity === 0) {
                this.charecter.isJump = true;
                setTimeout(function() {
                    this.charecter.isJump = false;
                }.bind(this), 500);
            }
        });
    }

    /**
     * Charecter Image load 및 생성
     */
    initCharecter() {
        let charImage = new Image();
        charImage.src = "./images/run.png";

        this.charecter = new Charecter(this.context, charImage);
        this.charecter.isJump = false;

        setTimeout(function() {
            this.renderCharecter();
        }.bind(this), 500);
    }

    /**
     * Charecter Image render
     * requestAnimationFrame 사용하여 함수 지속 호출하여 Image render
     */
    renderCharecter() {
        window.requestAnimationFrame(this.renderCharecter.bind(this));

        if (this.charecter.isJump) {
            this.charecter.gravity += 1;
        } else {
            if (this.charecter.gravity !== 0) {
                this.charecter.gravity -= 1;
            }
        }

        this.charecter.update();
        this.charecter.render();
    }
}

export default Canvas;