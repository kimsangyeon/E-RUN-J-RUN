import cnst from './cnst';

/**
 * Charecter Class
 * Charecter Image 관리
 */
class Charecter {
    constructor(context, image) {
        this.context = context, // canvas context
        this.image = image, // canvas character image
        this.width = cnst.charWidth, // charecter width
        this.height = cnst.charHeight, // charecter height
        this.x = cnst.charX, // charecter x
        this.y = cnst.charY, // charecter y
        this.frameIndex = 0, // charecter image frame index
        this.tickCount = 0, // image animation count
        this.ticksperFrame = cnst.ticksperFrame, // animation count frame
        this.numberOfFrames = cnst.numberOfFrames // charecter image frame num
        this.gravity = 0;
    }

    /**
     * ClearRender 및 drawImage 호출
     */
    render() {
        this.update();
        this.clearRender();
        this.drawImage();
    }

    /**
     * 이미지 그리기 동작
     * context drawImage 호출
     */
    drawImage() {
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y - this.gravity,
            this.width,
            this.height);
    }

    /**
     * Canvas ClearRect 호출
     */
    clearRender() {
        this.context.clearRect(0, 0, cnst.canvasWidth, cnst.canvasHeight);
    }

    /**
     * Image Frame Index update
     */
    update() {
        if (this.isJumpDouble) {
            this.width = cnst.jumpWidht;
            this.height = cnst.jumpHeight;
            this.frameIndex = 0;
            return;
        } else {
            this.width = cnst.charWidth;
            this.height = cnst.charHeight;
        }

        this.tickCount += 1;
        if (this.tickCount > this.ticksperFrame) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex +=1;
            } else {
                this.frameIndex = 0;
            }
        }
    }
}

export default Charecter;