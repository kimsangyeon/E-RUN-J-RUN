import cnst from './cnst';

class Coin {
	constructor(context, image) {
		this.context = context;
		this.image = image;

		this.width = cnst.coinWidth;
		this.height = cnst.coinHeight;
		this.x = cnst.coinX;
		this.y = cnst.coinY;

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

	drawImage() {
		this.context.drawImage(
			this.image,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	drawEffect(charX, chayY) {
		this.context.drawImage(
			this.image,
			charX + 10,
			chayY - 30,
			this.width,
			this.height
		);
		this.context.rotate(20*Math.PI/180);
	}

	clearRender() {
		this.context.clearRect(0, 0, cnst.coinWidth, cnst.coinHeight);
	}
}

export default Coin;