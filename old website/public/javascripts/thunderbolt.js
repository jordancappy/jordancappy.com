level = {
    thor: 25,

    zeus: 100
};

device = {
    height: window.innerHeight,

    width: window.innerWidth
};

corner = [
    [0, 0],
    [device.width, 0],
    [device.width, device.height],
    [0, device.height],
    [(device.width / 2), 0]
];


lightning = {
    svg: null,

    mouse: [],

    bolts: 4,

    line: null,

    init: function() {
        this.svg = d3.select("body")
            .append("svg");

        this.svg.append("rect")
            .on("click", this.strike)
            //.on('mousemove',this.trackzeusbolt);

        document.getElementsByTagName('body')[0].addEventListener("webkitAnimationEnd", this.removethunder, false);

    },

    strike: function() {
        var strikes = d3.selectAll('path').size();

        for (i = 0; i < lightning.bolts; i++) {
            if (strikes > level.zeus)
                lightning.zeusbolt(this);
            else if (strikes > level.thor)
                lightning.thorbolt(i, this);

            lightning.bolt(i, this);
        }
    },

    bolt: function(num, e) {

        this.mouse = d3.mouse(e);

        var d = this.generatelinedata(i, 3); //line(data);

        this.svg.insert('path', 'rect')
            .attr('d', d)
            .transition()
            .duration(1000)
            .style("stroke-opacity", 1e-6)
            .remove();
    },

    thorbolt: function(i, e) {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('thunder');

        this.mouse = d3.mouse(e);

        var d = this.generatelinedata(i, 4);
        var d2 = this.generatelinedata(i, 4);

        this.svg.insert('path', 'rect')
            .attr('class', 'thor')
            .attr('d', d)
            .transition()
            .duration(20)
            .attr('d', d2)
            .transition()
            .duration(1500)
            .style("stroke-opacity", 1e-6)
            .remove();

    },

    zeusbolt: function(e) {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('storm');

        this.mouse = d3.mouse(e);

        var d = this.generatelinedata(i, 5);

        this.svg.insert('path', 'rect')
            .attr('class', 'zeus')
            .data([i])
            .attr('d', d)
            .transition()
            .duration(10000)
            .style("stroke-opacity", 1e-6)
            .remove();

        var d2 = this.generatelinedata(i, 5);

        this.svg.insert('path', 'rect')
            .attr('class', 'rotate')
            .attr('d', d2)
            .transition()
            .duration(500)
            .remove();
    },

    removethunder: function() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('thunder');
        body.classList.remove('storm');

    },

    generatelinedata: function(i, numberofpoints) {
        if (!this.line)
            this.line = this.line = d3.svg.line()
            .x(function(d) {
                return d[0];
            })
            .y(function(d) {
                return d[1];
            })
            .interpolate("linear");

        var points = [corner[i]];

        for (i = 1; i < numberofpoints; i++) {
            points[i] = this.generaterandompoint(i);
        }
        points[numberofpoints] = this.mouse;

        return this.line(points);
    },

    generaterandompoint: function() {
        var point = [
            this.random(this.mouse[0], corner[i][0]),
            this.random(this.mouse[1], corner[i][1])
        ];
        return point;
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

};

window.onload = function() {
    lightning.init();
};
