import cnst from './cnst';

class Charecter {
    constructor(options) {
        this.options = options;
    }

    render() {
        this.clearRender();
        this.drawImage();
    }

    jumpRendr() {
        this.clearRender();
        this.drawImage(true);
    }

    drawImage(jump = false) {
        let jumpingY = jump ? cnst.jumpingY : 0;
        this.options.context.drawImage(
            this.options.image,
            this.options.frameIndex * this.options.width,
            0,
            this.options.width,
            this.options.height,
            this.options.x,
            this.options.y - jumpingY,
            this.options.width,
            this.options.height);
    }

    clearRender() {
        this.options.context.clearRect(this.options.x, this.options.y - cnst.jumpingY, this.options.width, this.options.height + cnst.jumpingY);
    }

    update() {
        let frameIndex = this.options.frameIndex || 0;
        let tickCount = this.options.tickCount || 0;
        let ticksperFrame = this.options.ticksperFrame || 0;
        let numberOfFrames = this.options.numberOfFrames || 1;

        tickCount += 1;
        if (tickCount > ticksperFrame) {
            tickCount = 0;

            if (frameIndex < numberOfFrames - 1) {
                frameIndex +=1;
            } else {
                frameIndex = 0;
            }
        }

        this.options.frameIndex = frameIndex;
        this.options.tickCount = tickCount;
        this.options.ticksperFrame = ticksperFrame;
        this.options.numberOfFrames = numberOfFrames;
    }
}

export default Charecter;