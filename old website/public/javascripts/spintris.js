window.onload = function() {
    game.start();
};

var spintris = {

	svg:null,

	board: [],
	fallingblocks: [],

	score: 0,
	level: 0,

	dropBlocks: function () {
		this.moveBlocks(0,1);
    	if (this.state.fallingblocks.length < 1)
    		for (var i = 0; i < this.state.level; i++) {
    			this.generateBlock();
    		}
	},

	moveLeft: function (e) {
    	spintris.moveBlocks(-1,0);
    	console.log('leftclick');
    },
    moveRight: function (e){
    	spintris.moveBlocks(1,0);
    	console.log('rightclick');
    },
    moveBlocks: function(col,row) {
		var blocks = [];
    	for (var i = 0; i < this.fallingblocks.length; i++) {
    		var fb = fallingblocks[i];
    		var y = fb.y + row,
    			x = (fb.x + col) % this.state.gameboard.length;
			
			if(x < 0)
				x = this.state.gameboard.length + x;

    		if (y >= 10 || !this.isEmpty(x, y)) {
    			if(fb.x == x) {
	    			fb.falling = false;
	    			this.detect3inRow(board[x]);
    			}
    			continue;
    		};

    		board[fb.x][fb.y] = {empty:true};
    		board[x][y] = fb;
    		fb.x = x;
    		fb.y = y;
    		//if (fb.x < this.state.gameboard.length && fb.y < 10)
			blocks.push(fb);
    	};
    	for (var i = 0; i < this.fallingblocks.length; i++) {
    		if(!this.fallingblocks[i].falling)
    			this.fallingblocks.splice(i,1);
    	}
    },
    generateBlock: function(){
    	if (this.state.mode != "play")
    		return;

    	var block = {
    		color:this.props.colors[this.getRandomInt(this.props.colors.length)], 
    		falling: true,
    		empty:false,
    		x: this.getRandomInt(this.state.gameboard.length),
    		y: 0
    	};
    	if(!this.isEmpty(block.x,block.y))
    		return;
    	fallingblocks.push(block);
    	this.board[block.x][block.y] = block;
    },
    getRandomInt: function(max) {
	  return Math.floor(Math.random() * (max));
	},
	isEmpty: function(x,y) {
    	return this.board[x][y].empty;
    },
    detect3inRow:function(col) {
    	var board = this.state.gameboard;
    	var arr = [];
    	for (var i = 0; i < col.length; i++) {
    		var block = col[i];

    		if (block.empty)
    			continue;

    		if (arr.length == 0) {
    			arr.push(block);
    			continue;
    		}
    	
    		if (block.color != arr[arr.length - 1].color)
    			arr = [];
    			
			arr.push(block);

	    	if (arr.length >= 3) {
	    		for (var i = 0; i < arr.length; i++) {
	    			var block = arr[i]
	    			this.removeBlock(block.x,block.y);
	    		}

	    		this.increaseScore(1);
	   		}
		}
    },
    increaseScore:function(points){
    	this.score = score + points;
    	if(score >= ((level * this.state.gameboard.length) / 2)){
    		level++;
    		this.levelUp(level);
    	}
    	this.setState({
    		score: score,
    		level:level});
    },
    levelUp: function() {
		this.level++;
    	var last = board.length;
    	board[last] = [];
		for (var y = 0; y < 10; y++) {
			board[last][y] ={empty:true};
		}
    }
};

var game = {
	svg: null,
	start: function() {
		this.svg = d3.select("body")
            .append("svg");

        this.svg.append('circle')
        .attr("cx", (window.innerWidth/2))
		.attr("cy", (window.innerHeight/2))
		.attr('r', (window.innerWidth /4));

		document.getElementById('left-control')
		.addEventListener('click',spintris.moveLeft);

		document.getElementById('right-control')
		.addEventListener('click',spintris.moveRight);

		document.onkeydown =  function (e) {
			e = e || window.event;
			switch(e.which || e.keydown) {
				case 37: 
					spintris.moveLeft();
					break;
				case 39: 
					spintris.moveRight();
					break;
			}
		}
	}
}