import cnst from './cnst';
import Charecter from './Character';
import Block from './Block';
import Score from './Score';
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
        this.score = null;
        this.elScore = null;

        this.id = id;
        this.charFrameId = null;
        this.blockFrameId = null;
        this.coinFrameId = null;

        this.crash = false;

        this.init();
        this.initCharecter();
        this.initBlock();
        this.initScore();
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
            this.renderCharecter();
        }.bind(this), 500);
    }
    
    initScore() {
        this.elScore = document.getElementById('eScoreBoard');
        this.score = new Score(this.elScore);
        
        this.score.componentDidMount();
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

    /**
     * block 초기화
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
            this.renderBlock();
        }.bind(this), 500);
    }

    renderBlock() {
        this.blockFrameId = window.requestAnimationFrame(this.renderBlock.bind(this));
        this.block.render();

        if (this.block.image.src.indexOf('ice') === -1
        && (this.charecter.x + this.charecter.width > this.block.x + this.block.width / 2
        && this.charecter.y + this.charecter.height - this.charecter.gravity > this.block.y + this.block.height / 2
        && this.charecter.x < this.block.x + this.block.width - this.block.width / 2)) {
            this.crash = true;
            window.cancelAnimationFrame(this.charFrameId);
            window.cancelAnimationFrame(this.blockFrameId);
            window.cancelAnimationFrame(this.coinFrameId);
            this.score.componentDidClear();
        } else if (this.block.image.src.indexOf('ice') !== -1
        && (this.charecter.x + this.charecter.width > this.block.x + this.block.sWidth / 2
        && this.charecter.y - this.charecter.gravity < this.block.y + this.block.sHeight
        && this.charecter.x < this.block.x + this.block.sWidth - this.block.sWidth / 2)) {
            this.crash = true;
            window.cancelAnimationFrame(this.charFrameId);
            window.cancelAnimationFrame(this.blockFrameId);
            window.cancelAnimationFrame(this.coinFrameId);
            this.score.componentDidClear();
        }
    }

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
                this.renderCoin();
            }
        }.bind(this), 500);
    }

    renderEffectCoin() {
        var reqId = window.requestAnimationFrame(this.renderEffectCoin.bind(this));
        this.coin.renderEffect(this.charecter.x, this.charecter.y, reqId);
    }
    renderCoin() {
        this.coinFrameId = window.requestAnimationFrame(this.renderCoin.bind(this));
        this.coin.render();

        if (this.charecter.x + this.charecter.width > this.coin.x
        && this.charecter.y + this.charecter.height - this.charecter.gravity > this.coin.y
        && this.charecter.x < this.coin.x + this.coin.width) {
            this.coin.clearRender(this.coin.x, this.coin.y);
            window.cancelAnimationFrame(this.coinFrameId);
            this.renderEffectCoin();

            if (!this.crash) {
                this.initCoin();
            }
        }
    }
}

export default Canvas;