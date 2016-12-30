window.onload = function () {
    shapes.init()
};
var browser = {
    width: window.innerWidth,
    height: window.innerHeight
};
var x = 10;
var y = 10;
var padding = 10;
var strokecolor = "#fff";

var drag = d3.behavior.drag()
.on("drag",dragmove);

	// taken: https://gist.github.com/enjalot/1378144
	function dragmove (d){
        d.x += d3.event.dx
        d.y += d3.event.dy
        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.x,d.y ] + ")"
        });
        positions.detect();
    }


var shapes = {
    svg: null,

    init: function () {
        this.svg = d3.select("body").append("svg");

        for(var i = 0; i < 5; i++){
            var padding = (i + 1) * x; 
            shapes.rect(i, padding);
            shapes.circle(i, padding);        
            
        }

    },

    rect: function (i, padding) {
        var width = 50;

        this.svg.append("rect")
            .data([{"x": browser.width - padding - width, "y":y * (i + 1)}])
            .attr("width",width)
            .attr("height",250)
            .style("stroke", strokecolor )
            .attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
            .call(drag);
    },

    circle: function (i, padding) {
        var width = -50;
        padding = padding / 2;
        this.svg.append("circle")
            .data([{"x": width + padding, "y":(y * (i + 1)) + width}])
            .attr("cx", 100)
            .attr("cy",100)
            .attr("r", 55)
            .style({"height": 200})
 .attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
            .attr("stroke", strokecolor)
            //.on("click", function(d){
            //    return d3.select(this).attr("r", 85)
            //})
            .call(drag);
    }

}

var positions = {

    rect: {t:0,l:0,r:0,m:0},
    circle: {t:0,l:0,r:0,m:0},    

    detect: function () {
        this.reset();

        var elements = d3.selectAll('svg *')[0];

        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            var type = ele.nodeName;
            var coord = ele.getBoundingClientRect();
            
            this.detectTop(type, coord.left, coord.top, coord.right, coord.bottom)
            this.detectLeft(type, coord.left, coord.top, coord.right, coord.bottom)
            this.detectRight(type, coord.left, coord.top, coord.right, coord.bottom)
            this.detectMiddle(type, coord.left, coord.top, coord.right, coord.bottom)
        }

        puzzle.resolve(this.rect, this.circle);

    },

    reset: function () {
        this.circle = {t:0,l:0,r:0,m:0};
        this.rect = {t:0,l:0,r:0,m:0};
    },

    detectTop: function(type,left,top,right,bottom){
        if((left > 0 && right < browser.width) &&
            (top > 0 && bottom < (browser.height / 2)))
            this[type].t++;
    },
    detectLeft: function(type,left,top,right,bottom){
        if(left > 0 && right < (browser.width * 0.3) &&
            (top > (browser.height / 3) && bottom < browser.height))
            this[type].l++;
    },
    detectMiddle: function(type,left,top,right,bottom){
        if(left > (browser.width * 0.3) && right < (browser.width * 0.7) &&
            (top > (browser.height / 3) && bottom < browser.height ))
            this[type].m++;
    },
    detectRight: function(type,left,top,right,bottom){
        if((left > (browser.width * 0.7) && right < browser.width) &&
            (top > (browser.height / 3) && bottom < browser.height))
            this[type].r++;
    },
};

var puzzle = {
    resolve: function(rect, circle) {
        this.isHand(rect, circle);
    },

    isHand: function (rect, circle){
        if ((rect.t == 4 && (rect.l ==1 || rect.r == 1)) &&
            circle.m ==1)
            this.play('dQw4w9WgXcQ');
    },

    play: function (url){
        var iframe = document.getElementsByTagName('iframe')[0];
        var video = iframe.getAttribute('src');
        var src = 'https://www.youtube.com/embed/' + url +'?autoplay=1';
        
        if(video != src){
            iframe.setAttribute('src',src);
            iframe.classList.add('play')
        }
    }

};