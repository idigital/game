jewel.display = (function() {
	var canvas, ctx, cols, rows, jewelSize, jewels, firstRun = true;
	cols = jewel.settings.cols;
	rows = jewel.settings.rows; 
	jewelSize = jewel.settings.jewelSize;
	
	function setup() {
		var boardElement = $('#game-screen .game-board')[0];
		canvas = $(".board")[0];
		ctx = canvas.getContext('2d');
		canvas.width = cols * jewelSize;
		canvas.height = rows * jewelSize;
		createBackground();
	}
	
	function createBackground() {
		var background = $(".board-bg")[0];
		bgctx = background.getContext('2d');
		background.width = cols * jewelSize;
		background.height = rows * jewelSize;
		bgctx.fillStyle = "rgba(225,235,255,0.15)";
		for(var x = 0; x < cols; x++) {
			for(var y = 0; y < rows; y++) {
				if((x+y)%2) {
					bgctx.fillRect(x*jewelSize, y*jewelSize, jewelSize, jewelSize);
				}
			}
		}
		return background;
	}
		
		
	function drawJewel(type, x, y) {
		var image = jewel.images["images/jewels" + jewelSize + ".png"];
		ctx.drawImage(image, type * jewelSize, 0, jewelSize, jewelSize, x*jewelSize, y*jewelSize, jewelSize, jewelSize);
	}
	
	function redraw(newJewels, callback) {
		var x, y;
		jewels = newJewels;
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(x = 0; x < cols; x++) {
			for(y = 0; y < rows; y++) {
				console.log(jewels[x][y], x, y);
				drawJewel(jewels[x][y], x, y);
			}
		}	
		callback();
	}
	
	function initialize(callback) {
		if(firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	}
	
	return {
		initialize: initialize,
		redraw: redraw
	};
})();
			