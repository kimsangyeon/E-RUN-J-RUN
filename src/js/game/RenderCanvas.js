
class RenderCanvas {
    constructor (canvas) {
        this.canvas = canvas;
        this.controller = canvas.getController();
        this.charecter = canvas.getCharecter();
        this.block = canvas.getBlock();
        this.coin = canvas.getCoin();

        // charecter, block, coin 랜더링 메소드 관리 frame Id
        this.charFrameId = null;
        this.blockFrameId = null;
        this.coinFrameId = null;

        // charecter와 block 충돌 확인
        this.crash = false;
    }

    /**
     * Charecter Image render
     * 캐릭터 이미지를 랜더링 하며 gravity속성에따라 캐릭터의 점프를 표현
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
     * Block Image render
     * 블럭 이미지를 랜더링하며 캐릭터와 충돌처리 하여 게임오버 호출
     * requestAnimationFrame 사용하여 함수 지속 호출하여 Image render
     */
    renderBlock() {
        this.blockFrameId = window.requestAnimationFrame(this.renderBlock.bind(this));
        this.block.render();

        if (this.block.image.src.indexOf('ice') === -1
        && (this.charecter.x + this.charecter.width > this.block.x + this.block.width / 2
        && this.charecter.y + this.charecter.height - this.charecter.gravity > this.block.y + this.block.height / 2
        && this.charecter.x < this.block.x + this.block.width - this.block.width / 2)) {
            this.crash = true;
            this.controller.gameOver(this.charFrameId, this.blockFrameId, this.coinFrameId);
        } else if (this.block.image.src.indexOf('ice') !== -1
        && (this.charecter.x + this.charecter.width > this.block.x + this.block.sWidth / 2
        && this.charecter.y - this.charecter.gravity < this.block.y + this.block.sHeight
        && this.charecter.x < this.block.x + this.block.sWidth - this.block.sWidth / 2)) {
            this.crash = true;
            this.controller.gameOver(this.charFrameId, this.blockFrameId, this.coinFrameId);
        }
    }

    /**
     * 캐릭터가 코인을 먹은 경우, 코인 이펙트 랜더링
     */
    renderEffectCoin() {
        var reqId = window.requestAnimationFrame(this.renderEffectCoin.bind(this));
        this.coin.renderEffect(this.charecter.x, this.charecter.y, reqId);
    }

    /**
     * Coin Image Render
     * 코인 이미지를 랜더링하며 캐릭터와 충돌처리하여  renderEffectCoin 호출
     * requestAnimationFrame 사용하여 함수 지속 호출하여 Image render
     */
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
                this.canvas.initCoin();
            }
        }
    }
}

export default RenderCanvas;