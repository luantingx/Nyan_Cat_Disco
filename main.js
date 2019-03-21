//main.js

let cat;
let resources = {
	catImg: [],
	starImg: [],
	rbImg: []	
}	

//p5.js 调用的三个函数

//发生在所有执行之前，用来加载资源
function preload() {
	resources.rbImg[0] = loadImage('asset/rb.png');
	for (let i = 0; i < 12; i++) 
		resources.catImg[i] = loadImage("asset/cat/cat" + i + ".png");
	for (let i = 0; i < 6; i++) 
		resources.starImg[i] = loadImage("asset/star/star" + i + ".png");
}

//设置场景，初始化对象
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	frameRate(30);
	cat = new NyanCat(resources.catImg, resources.rbImg);
}

//每一帧绘制内容
function draw() {
	background(0);
	noStroke();

	for (var x = 0; x <= width; x += 50) {
		for (var y = 0; y <= height; y += 50) {
			fill(random(255), 0, random(200));
			ellipse(x, y, 25, 25);
		}
	}

	cat.run();
}		

