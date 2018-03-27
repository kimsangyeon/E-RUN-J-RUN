import cnst from './cnst';
import Charecter from './Character';
import Block from './Block';
import Coin from './Coin';
import RenderCanvas from './RenderCanvas';

/**
 * Canvas Class
 * Charecter 및 Block instance 관리
 */
class Canvas {
    constructor(id, controller) {
        this.canvas = null;
        this.renderCanvas = null;
        this.context = null;
        this.charecter = null;
        this.block = null;
        this.coin = null;

        this.id = id;
        this.controller = controller;

        this.init();
        this.initCharecter();
        this.initBlock();
        this.initCoin();

        this.renderCanvas = new RenderCanvas(this);
    }

    /**
     * controller property를 반환합니다.
     */
    getController() {
        return this.controller;
    }

    /**
     * charecter property를 반환합니다.
     */
    getCharecter() {
        return this.charecter;
    }

    /**
     * block property를 반환합니다.
     */
    getBlock() {
        return this.block;
    }

    /**
     * coin property를 반환합니다.
     */
    getCoin() {
        return this.coin;
    }

    /**
     * canvas 초기화 및 이벤트 할당
     */
    init() {
        let elMain = document.getElementById('main');
        this.canvas = document.getElementById('game');
        this.canvas.width = cnst.canvasWidth; //px
        this.canvas.height = cnst.canvasHeight; //px
        this.context = this.canvas.getContext('2d');
        elMain.appendChild(this.canvas);

        document.addEventListener('keydown', (e) => {
            if (this.charecter.isEvent) {
                if (e.keyCode === 38 && this.charecter.gravity === 0) {
                    this.charecter.isJump = true;
                    setTimeout(function() {
                        this.charecter.isJump = false;
                    }.bind(this), 500);
                } else if (this.charecter.gravity !== 0) {
                    this.charecter.isJumpDouble = true;
                    this.charecter.isEvent = false;
                    setTimeout(function() {
                        this.charecter.isJumpDouble = false;
                    }.bind(this), 500);
                }
                if (e.keyCode === 40 && this.charecter.gravity ===0) {
                    this.charecter.isSlide = true;
                }
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 40) {
                this.charecter.isSlide = false;
            }
        });
    }

    /**
     * Charecter 객체 초기화
     * Charecter Image load 및 생성
     */
    initCharecter() {
        let runImage = new Image();
        let slideImage = new Image();
        runImage.src = "./images/run.png";
        slideImage.src = "./images/slide.png";

        let charImage = {
            run: runImage,
            slide: slideImage
        };

        this.charecter = new Charecter(this.context, charImage);
        this.charecter.isJump = false;

        setTimeout(function() {
            this.renderCanvas.renderCharecter();
        }.bind(this), 500);
    }

    /**
     * block 객체 초기화
     */
    initBlock() {
        let blockImage = new Image();
        let sBlockImage = new Image();

        blockImage.src = "./images/block.png";
        sBlockImage.src = "./images/iceBlock.png";

        let oBlockImage = {
            blockImage : blockImage,
            sBlockImage : sBlockImage
        };

        this.block = new Block(this.context, oBlockImage);

        setTimeout(function() {
            this.renderCanvas.renderBlock();
        }.bind(this), 500);
    }

    /**
     * coin 객체 초기화
     */
    initCoin() {
        let coinImage = new Image();
        let coin2Image = new Image();
        coinImage.src = "./images/coin.png";
        coin2Image.src = "./images/coinEffect.png";

        this.coin = new Coin(this.context, {
            coinImage: coinImage,
            coin2Image: coin2Image
        });

        setTimeout(function() {
            if (!this.crash) {
                this.renderCanvas.renderCoin();
            }
        }.bind(this), 500);
    }
}

export default Canvas;