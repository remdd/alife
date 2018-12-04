//	Main alife object
var al = {
	mainCanvas: {
		setup: function() {
			this.ctx = $('#mainCanvas')[0].getContext('2d');
			this.zoomFactor = 10;
			this.width = $('#mainCanvas').width() / this.zoomFactor;
			this.height = $('#mainCanvas').height() / this.zoomFactor;
			this.ctx.canvas.width = this.width;
			this.ctx.canvas.height = this.height;
		},
		clear: function() {
			this.ctx.clearRect(0, 0, this.width, this.height)	
		}
	},
	background: {
		grid: [],
		setup: function() {
			//	Add a 'column' array for each 'row' array in canvas
			console.log(al.mainCanvas.width);
			console.log(al.mainCanvas.height);
			for(let i = 0; i < al.mainCanvas.width; i++) {
				this.grid[i] = [];
				for(let j = 0; j < al.mainCanvas.height; j++) {
					this.grid[i][j] = new bgPixel(i, j);
					this.grid[i][j].setColor();
					this.grid[i][j].draw();
				}
			}
			console.log(this.grid);
		},
		update: function() {
			$('#fps').text(MainLoop.getFPS());
			this.grid.forEach(column => {
				column.forEach(bgPixel => {
					bgPixel.changeColor();
				});
			});
		},
		draw: function() {
			this.grid.forEach(column => {
				column.forEach(bgPixel => {
					bgPixel.draw();
				});
			});
		}
	},
	entities: {
		creatures: []
	},
	mainloop: {
		setup: function() {
			al.mainCanvas.setup();
			al.background.setup();
			let creature1 = new Entity();
			al.entities.creatures.push(creature1);
		},
		update: function() {
			al.background.update();
			al.entities.creatures.forEach(creature => {
				// creature.move();
			});
		},
		draw: function() {
			al.mainCanvas.clear();
			al.background.draw();
			// al.entities.creatures.forEach(creature => {
			// 	drawEntity(creature);
			// });
		},
		start: function() {
			this.setup();
			MainLoop.setUpdate(this.update).setDraw(this.draw).start();
		}
	}
}

//	Run on DOM load complete
$(() => {
	al.mainCanvas.setup();
	al.mainloop.start();
});

function bgPixel(y, x) {
	this.position = {
		y: y,
		x: x
	}
	this.color = {
		r: 0,
		g: 0,
		b: 0,
	}
}
var bg = {
	max_r: 30,
	min_r: 20,
	max_g: 20,
	min_g: 5,
	max_b: 30,
	min_b: 5,
	changeSpeed: 9,
} 

bgPixel.prototype.setColor = function(r, g, b) {
	this.color.r = r ? r : Math.floor(Math.random() * (bg.max_r - bg.min_r) + bg.min_r);
	this.color.g = g ? g : Math.floor(Math.random() * (bg.max_g - bg.min_g) + bg.min_g);
	this.color.b = b ? b : Math.floor(Math.random() * (bg.max_b - bg.min_b) + bg.min_b);
}
bgPixel.prototype.changeColor = function() {
	let r_change = Math.floor(Math.random() * bg.changeSpeed) - ((bg.changeSpeed -1) / 2);
	let g_change = Math.floor(Math.random() * bg.changeSpeed) - ((bg.changeSpeed -1) / 2);
	let b_change = Math.floor(Math.random() * bg.changeSpeed) - ((bg.changeSpeed -1) / 2);
	this.color.r = (this.color.r + r_change <= bg.max_r && this.color.r + r_change >= bg.min_r) ? this.color.r + r_change : this.color.r;
	this.color.g = (this.color.g + g_change <= bg.max_g && this.color.g + g_change >= bg.min_g) ? this.color.g + g_change : this.color.g;
	this.color.b = (this.color.b + b_change <= bg.max_b && this.color.r + b_change >= bg.min_b) ? this.color.b + b_change : this.color.b;
}
bgPixel.prototype.draw = function() {
	al.mainCanvas.ctx.fillStyle = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
	al.mainCanvas.ctx.fillRect(this.position.y, this.position.x, 1, 1);
}

function Entity (position) {
	this.position = {
		x: position ? position.x : 30,
		y: position ? position.y : 30
	}
	this.radius = 25;
	this.color = 'rgba(200,100,80,1)';
	this.color = 'green';
	this.move = function() {
		this.position.x += 1;
		this.position.y += 1;
	}
}

function drawEntity(entity) {
	// al.mainCanvas.ctx.fillStyle = 'green';
	// al.mainCanvas.ctx.fillRect(50,50,150,150);
	if(entity.radius) {
		al.mainCanvas.ctx.beginPath();
		al.mainCanvas.ctx.arc(entity.position.x, entity.position.y, entity.radius, 0, 2 * Math.PI, false);
		al.mainCanvas.ctx.fillStyle = entity.color;
		al.mainCanvas.ctx.fill();
		al.mainCanvas.lineWidth = 5;
		al.mainCanvas.strokeStyle = '#003300';
		al.mainCanvas.ctx.stroke();
	}
}

