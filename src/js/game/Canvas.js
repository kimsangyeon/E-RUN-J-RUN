import cnst from './cnst';
import Charecter from './Character';
import Block from './Block';
import Coin from './Coin';

/**
 * Canvas Class
 * Charecter 및 Block instance 관리
 */
class Canvas {
    constructor(id) {
        this.canvas = null;
        this.context = null;
        this.charecter = null;
        this.block = null;
        this.coin = null;

        this.id = id;
        this.charFrameId = null;
        this.blockFrameId = null;
        this.coinFrameId = null;

        this.init();
        this.initCharecter();
        this.initBlock();
        this.initCoin();
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
        this.charFrameId = window.requestAnimationFrame(this.renderCharecter.bind(this));
        if (this.charecter.isJump || this.charecter.isJumpDouble) {
            this.charecter.gravity += 1.5;
        } else {
            if (this.charecter.gravity !== 0) {
                this.charecter.gravity -= 1.5;
            } else {
                this.charecter.isEvent = true;
            }
        }

        this.charecter.render();
    }

    initBlock() {
        let blockImage = new Image();
        let sBlockImage = new Image();

        blockImage.src = "./images/block.png";
        sBlockImage.src = "./images/specialBlock.png";

        let oBlockImage = {
            blockImage : blockImage,
            sBlockImage : sBlockImage
        };

        this.block = new Block(this.context, oBlockImage);

        setTimeout(function() {
            this.renderBlock();
        }.bind(this), 500);
    }

    renderBlock() {
        this.blockFrameId = window.requestAnimationFrame(this.renderBlock.bind(this));
        this.block.render();

        if (this.block.image.src.indexOf('special') === -1 
        && (this.charecter.x + this.charecter.width > this.block.x
        && this.charecter.y + this.charecter.height - this.charecter.gravity > this.block.y
        && this.charecter.x < this.block.x + this.block.width)) {
            window.cancelAnimationFrame(this.charFrameId);
            window.cancelAnimationFrame(this.blockFrameId);
            window.cancelAnimationFrame(this.coinFrameId);
        }
    }

    initCoin() {
        let coinImage = new Image();
        coinImage.src = "./images/coin.png";

        this.coin = new Coin(this.context, coinImage);

        setTimeout(function() {
            this.renderCoin();
        }.bind(this), 500);
    }

    renderCoin() {
        this.coinFrameId = window.requestAnimationFrame(this.renderCoin.bind(this));
        this.coin.render();

        if (this.charecter.x + this.charecter.width > this.block.x
        && this.charecter.y + this.charecter.height - this.charecter.gravity > this.block.y
        && this.charecter.x < this.block.x + this.block.width) {
            // this.coin.drawEffect(this.charecter.x, this.charecter.y);
            this.coin.clearRender();
        }
    }
}

export default Canvas;