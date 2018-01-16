import cnst from './cnst';

class Block {
	constructor(context, oImage) {
		this.context = context;
		this.image = oImage.blockImage;
		this.blockImage = oImage.blockImage;
		this.sBlockImage = oImage.sBlockImage;

		this.width = cnst.blockWidth;
		this.height = cnst.blockHeight;
		this.x = cnst.blockX;
		this.y = cnst.blockY;

		this.sWidth = cnst.sBlockWidth;
		this.sHeight = cnst.sBlockHeight;
		this.sX = cnst.sBlockX;
		this.sY = cnst.sBlockY;

		this.speed = 5;
	}

	update() {
		// When the last point is reached, initialization
		if (this.x < 0) {
			this.x = cnst.blockX;
			if ((Math.floor(Math.random() * 2) + 1) === 2) {
				this.image = this.sBlockImage;
				this.width = this.sWidth;
				this.height = this.sHeight;
				this.y = this.sY;
			} else {
				//TODO cnst에서 값을 뽑지 말자.
				this.image = this.blockImage;
				this.width = cnst.blockWidth;
				this.height = cnst.blockHeight;
				this.y = cnst.blockY;
			}
		}
		this.x -= this.speed;
	}

	render() {
		this.update();
		this.clearRender();
		this.drawImage();
	}

	drawImage() {
		this.context.drawImage(
			this.image,
			this.x,
			this.y,
			this.width,
			this.height
			);
	}

	clearRender() {
		this.context.clearRect(0, 0, cnst.blockWidth, cnst.blockHeight);
	}
}

export default Block;