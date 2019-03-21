// NyanCat.js

class NyanCat {
	constructor(catImg, rbImg) {
		this.position = [width * 0.38, height * 0.5]
		this.image = catImg;
		this.rainbow = new RainbowSystem(rbImg);
		this.speed = 30;
		this.emission = 4;
	}

	run() {
		this.emitRainbow();
		this.showCat();
	}

	emitRainbow() {
		for (let i = 0; i < this.emission; i++) {
			this.control();
			this.rainbow.emit([this.position[0], this.position[1] + this.oscillate(20, 0.8)]);
			this.rainbow.update();
			this.rainbow.remove();
		}
		this.rainbow.show();
	}

	//运动幅度
	oscillate(amplitude, omega) {
		return Math.round(amplitude * Math.sin(frameCount * omega));
	}

	control() {
		if (keyIsPressed) {
			if (key === 'W' || key === 'w') this.position[1] -= this.speed / this.emission;
			if (key === 'S' || key === 's') this.position[1] += this.speed / this.emission;
		}
		this.checkEdges();
	}

	checkEdges() {
		if (this.position[1] > height) this.position[1] = height;
		if (this.position[1] < 0) this.position[1] = 0;
	}

	showCat() {
		//一秒30帧太快
		let index = Math.floor(frameCount / 2) % this.image.length;
		imageMode(CENTER);
		image(this.image[index], this.position[0], this.position[1]);
	}
}