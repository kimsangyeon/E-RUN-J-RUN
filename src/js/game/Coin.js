import cnst from './cnst';

class Coin {
	constructor(context, images) {
		this.context = context;
		this.coinImage = images.coinImage;
		this.coin2Image = images.coin2Image;

		this.width = cnst.coinWidth;
		this.height = cnst.coinHeight;
		this.x = cnst.coinX;
		this.y = cnst.coinY;
        this.frameIndex = 0, // charecter image frame index
        this.tickCount = 0, // image animation count
        this.ticksperFrame = cnst.ticksperCoinFrame, // animation count frame
        this.numberOfFrames = cnst.numberOfCoinFrames // charecter image frame num
		this.speed = 6;
	}

	update() {
		if (this.x < 0) {
			this.x = cnst.coinX;
		}
		//TODO cnst에서 값을 뽑지 말자.
		this.width = cnst.coinWidth;
		this.height = cnst.coinHeight;
		this.y = cnst.coinY;
		this.x -= this.speed;
	}

	render() {
		this.update();
		this.drawImage();
	}

	renderEffect(charX, charY) {
		this.updateEffect();
		this.drawEffect(charX, charY);
	}

	drawImage() {
		this.context.drawImage(
			this.coinImage,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	drawEffect(charX, charY) {
		this.context.drawImage(
			this.coin2Image,
			this.frameIndex * cnst.coinEffectWidth / cnst.numberOfCoinFrames,
			0,
			cnst.coinEffectWidth / cnst.numberOfCoinFrames,
			cnst.coinEffectHeight,
			charX + 20,
			charY - 30,
			cnst.coinEffectWidth / cnst.numberOfCoinFrames,
			cnst.coinEffectHeight
		);
	}

	updateEffect() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksperFrame) {
            this.tickCount = 0;

            if (this.frameIndex < 10 - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
	}

	clearRender() {
		this.context.clearRect(0, 0, cnst.coinWidth, cnst.coinHeight);
	}
}

export default Coin;