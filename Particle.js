// Particle.js
//粒子系统

class Particle {
	constructor(image) {
		this.image = image;
		//当前帧的数量
		this.totalFrames = image.length;
		//当前在那个图像上。Math.round是取整的意思
		this.index = Math.round(random(0, this.totalFrames));
		//定一个位置，暂时不确定，null提示之后要确定这个对象
		this.position = null;
		this.speed = null;
	}

	//生成，指定位置
	birth(pos) {
		//positon是一个二位数字，表示在画布上的位置
		this.position = pos;
	}

	//更新，实时移动
	update() {
		this.position[0] -= this.speed;
	}

	//判断何时剔除
	isDead() {
		//返回条件，boolean
		return this.position[0] < 0;
	}

	//被渲染
	show() {
		//index在变化，现在是30帧，所以不需要太流畅，像素感，帧率降低
		//不要每帧都增加，可以考虑三帧增加一次，就是一秒增加10次
		this.index += (frameCount % 3 === 0);
		// index不断增加，会超过totalframes，所以取模。不懂
		this.index %= this.totalFrames;
		// 绘制粒子
		imageMode(CENTER);
		image(this.image[this.index], this.position[0], this.position[1]);
	}
}

class ParticleSystem {
	constructor(image) {
		this.image = image;
		this.Particle = Particle; //constructor of particle
		this.list = [];
		this.rate = null; //emission rate
	}

	run() {
		this.emit();
		this.update();
		this.remove();
		this.show();
	}


	emit() {
		// 决定能不能发射
		if (Math.random() < (this.rate / frameRate())) {
			let particle = new this.Particle(this.image);
			particle.birth([width, random(0, height)]);
			this.list.push(particle);
		}
	}


	// update() {
	// 	for (let i in this.list)
	// 		this.list[i].update();
	// }

	//Lambda表达式
	update() {
		this.list.forEach(p => p.update());
	}

	// remove() {
	// 	for (let i in this.list)
	// 		if (this.list[i].isDead()) this.list.splice(i, 1);	
	// }

	//Lambda表达式
	remove() {
		this.list.forEach( (p, i, arr) => {
			if (p.isDead()) arr.splice(i, 1);
		});
		console.log(this.list.length);
	}

	// show() {
	// 	for (let i in this.list)
	// 		this.list[i].show();
	// }

	//Lambda表达式
	show() {
		this.list.forEach(p => p.show());
	}
}



class Rainbow extends Particle {
	constructor(image) {
		super(image);
		this.speed = 8;
	}
}

class RainbowSystem extends ParticleSystem {
	constructor(image) {
		super(image);
		this.Particle = Rainbow;
	}

	emit(pos) {
		let particle = new this.Particle(this.image);
		particle.birth(pos);
		this.list.push(particle);
	}

}
