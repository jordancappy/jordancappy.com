window.onload = function() {
	bowl.init();
}

var device = {
	height: window.innerHeight,
	width: window.innerWidth,
};

var eyes = [
	{x:(device.width /2) - 60 ,y:(device.height * 0.3)}, //left

	{x:(device.width /2),y:(device.height * 0.3)}, // right

];

var bowl = {

	svg: null,

	crytime: 10,

	x: (device.width / 2),
	y:( device.height * .65),

	init: function(){
 		this.svg = d3.select("body")
            .append("svg")
        	.on('click', function () { 
				bowl.tear();
				bowl.cry();
        	});

		this.startcrying();
		this.tear();
	},

	startcrying: function () {
		setTimeout(function () {
			bowl.tear();
			bowl.startcrying();
		}, this.rand(10000));
	},

	tear: function () {
		var eye =this.randEye();
		this.svg.append('path')
		    .attr("d", function() { return bowl.raindrop(500); })
		    .attr("transform", function(d,i){
                return 'translate(' + eye.x + ',' + eye.y+ ')';;
                // left: 450, 241
            })
            .transition()
            .attr("transform", function(d,i){
            	return 'translate(' + eye.x + ',' +bowl.y +')';
            })
            .duration(1000)
            .remove();
;
	},

	cry: function () {
		var tears = d3.selectAll('path').size();

		console.log(tears);
		
		if (tears >= this.crytime)
			this.uglycry();
	},

	uglycry: function() {
		this.svg.append('svg:image')
		.attr('xlink:href', '/images/uglycry.png')
		.attr('x', this.rand(device.width))
		.attr('y',this.rand(device.height))


	},

	randEye: function () {
		var eye = eyes[this.rand(eyes.length)];
		return eye;//'translate(' + eye.x + ',' + eye.y+ ')';
	},

	// modified from source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	rand: function(max, min) {
		if (!min) min = 0;
  		return Math.floor(Math.random() * (max - min)) + min;
	},

	raindrop: function (size) {
  var r = Math.sqrt(size / Math.PI);
  return "M" + r + ",0"
      + "A" + r + "," + r + " 0 1,1 " + -r + ",0"
      + "C" + -r + "," + -r + " 0," + -r + " 0," + -3*r
      + "C0," + -r + " " + r + "," + -r + " " + r + ",0"
      + "Z";
}

};
