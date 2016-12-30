import d3 from 'd3';

class Game {
    constructor(wedges) {
        this.svg = null;
        this.wedges = wedges;
        
        this.board = [];
        this.fallingblocks = [];
		this.removableBlocks = [];
        this.colors = ['red','green','blue','yellow'];
        
        this.mode = "play";

        this.score = 0;
        this.level = 1;
        
        this.start();
        this.generateBoard(wedges);
		this.updateScoreboard();
    }
    
    generateBoard(wedges) {
        d3.selectAll('svg *').remove();;
        var degrees = 360 / wedges;
        for(var x = 0; x < wedges; x++){
            if(!this.board[x])
                this.board[x] = [];
            var group = this.svg.append('g');
            for(var y = 9; y >= 0; y--){
                if(!this.board[x][9 - y])
                    this.board[x][9 - y] = {empty: true};
                
                var index = y + 1,
                    endangle = Math.PI/ (wedges /2);        
                
                var arc = d3.svg.arc()
                    .innerRadius(index * 30)
                    .outerRadius((index + 1) * 30)
                    .startAngle(x * endangle)
                    .endAngle((x+1) * endangle);
                    
                var blockColor = this.board[x][9 - y].color ? this.board[x][9 - y].color : '';    
                group.append('path')
                    .attr('transform','translate(' + window.innerWidth/2  + ','
                        + window.innerHeight/2 +  ') ')
                        //'rotate(' + degrees * x +'deg)')
                    .attr('d',arc)
                    .attr('class','block ' + blockColor);    
            }
        }
        
         this.positions = d3.selectAll('g path')[0];
    }
    
    start(){
        this.svg = d3.select("body")
            .append("svg");
        
		document.getElementById('left-control')
		.addEventListener('click',()=> {this.moveLeft()});

		document.getElementById('right-control')
		.addEventListener('click',()=> {this.moveRight()});

		document.onkeydown =  function (e) {
			e = e || window.event;
			switch(e.which || e.keydown) {
				case 37: 
					this.moveLeft();
					break;
				case 39: 
					this.moveRight();
					break;
			}
		}.bind(this);
        
        this.timer = setInterval(()=> this.dropBlocks(),500);
    }
    dropBlocks() {
		if (this.fallingblocks.length < 1) {
    		for (var i = 0; i < this.level; i++) {
    			this.generateBlock();
    		}
        return;    
        }
        this.moveBlocks(0,1);
	}

	moveLeft (e) {
    	this.moveBlocks(-1,0);
    	console.log('leftclick');
    }
    moveRight (e){
    	this.moveBlocks(1,0);
    	console.log('rightclick');
    }
    moveBlocks(col,row) {
		var blocks = [];
    	for (var i = 0; i < this.fallingblocks.length; i++) {
    		var fb = this.fallingblocks[i];
    		var y = fb.y + row,
    			x = (fb.x + col) % this.board.length;
			
			if(x < 0)
				x = this.board.length + x;

    		if (y >= 10 || !this.isEmpty(x, y)) {
    			if(fb.x == x) {
	    			fb.falling = false;
	    			this.detect3inRow(this.board[x], y - 1);
					this.detect3inColumns(fb.x,fb.y);
					if (this.removableBlocks.length >= 3){
						this.removeBlocks();
						this.makeBlocksAboveFall();
					}
					this.removableBlocks = [];
    			}
    			continue;
    		};

            this.removeBlock(fb.x,fb.y);            
            this.board[x][y] = fb;
            d3.select(this.positions[(x * 10) + y]).attr('class','block ' + fb.color);   
    		fb.x = x;
    		fb.y = y;
    		//if (fb.x < this.board.length && fb.y < 10)
			//what does this blocks variable do?
            blocks.push(fb);
    	};
    	for (var i = 0; i < this.fallingblocks.length; i++) {
    		if(!this.fallingblocks[i].falling)
    			this.fallingblocks.splice(i,1);
    	}
    }
    generateBlock(){
    	if (this.mode != "play")
    		return;

    	var block = {
    		color:this.colors[this.getRandomInt(this.colors.length)], 
    		falling: true,
    		empty:false,
    		x: this.getRandomInt(this.board.length),
    		y: 0
    	};
    	if(!this.isEmpty(block.x,block.y))
    		return;
    	this.fallingblocks.push(block);
    	this.board[block.x][block.y] = block;
        d3.select(this.positions[(block.x * 10) + block.y]).attr('class','block ' + block.color); 
    }
    getRandomInt(max) {
	  return Math.floor(Math.random() * (max));
	}
	isEmpty(x,y) {
    	return this.board[x][y].empty;
    }
    detect3inRow(col) {
    	var arr = [];
		var colBlocks = [];
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
			
			if(arr.length >= 3)
				this.removableBlocks = this.removableBlocks.concat(arr);			
		}
    }
	detect3inColumns(x,y){
		var arr = [];
		arr.push(this.board[x][y]);
		
		var n = +x;
		while(this.board[n][y].color && this.board[n][y].color == this.board[x][y].color){
			arr.push(this.board[n][y]);
			n = (n + 1) % this.board.length;
		}
		if (n -1 < 0)
			n = this.board.length;
		n--;
		arr = [];
		while(this.board[n][y].color && this.board[n][y].color == this.board[x][y].color){
			arr.push(this.board[n][y]);
			if (n -1 < 0)
				n = this.board.length;
			n--;
		}
		
		if(arr.length >= 3)
			this.removableBlocks = this.removableBlocks.concat(arr);
	}
	removeBlocks(blocks){
		for(var n in this.removableBlocks) {
			var block = this.removableBlocks[n];
			this.removeBlock(block.x,block.y);
		}
		this.increaseScore(1);
	}
    removeBlock(x,y){
        this.board[x][y] = {empty:true};
        d3.select(this.positions[(x * 10) + y]).attr('class','block');
    }
	makeBlocksAboveFall(){
		for(var n in this.removableBlocks){
			var remBlock = this.removableBlocks[n];
			
			for(var i = this.board[remBlock.x].length - 1;i > 0; i--){	
				var block = this.board[remBlock.x][i];
				if(!block.empty)
					this.fallingblocks.push(block);
			}
		}	
	}
    increaseScore(points){
    	this.score = this.score + points;
    	if(this.score >= ((this.level * this.board.length) / 2)){
    		this.levelUp();
    	}
		this.updateScoreboard();
    }
    levelUp() {
		this.level++;
        this.wedges++;
        clearInterval(this.timer);
        this.generateBoard(this.wedges);
        this.timer = setInterval(()=> this.dropBlocks(),500);
    }
	updateScoreboard(){
		document.getElementById('score').innerHTML = this.score;
		document.getElementById('level').innerHTML = this.level;		
	}
}

window.onload =function() { 
    new Game(4);
    window.d3 = d3;
    //window.spintris = new Spintris();
};