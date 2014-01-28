var h = 100;
var w = 350;
var x1 = 10;
var y1 = 10;
var x2 = 10;
var y2 = 35;
var xVar = 320;
var maxItems = 18
var data = d3.range(maxItems);
var len;
var count = 0;
var size = 0;

var svg = d3.select('.stackContainer').append('svg')
	.attr('height', h)
	.attr('width', w);

var lines = svg.selectAll('.lines').data(data);

lines.enter()
	.append("line")
	.attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .style({"stroke": "rgb(6,120,155)", "stroke-width" : 1});

lines.exit()
	.remove("line");


var pop = function(){
	if (count > 0){
		lines.filter(function(d, i) { return i === len; }).transition()
			.duration(800)
			.attr({x1: x1+xVar, y1: y1, x2: x2+xVar, y2: y2});
		if (size){
			size--;
		}
		len--;
	}	
}

var push = function(){
	if (count < maxItems){
		lines.filter(function(d, i) { return i === count; }).transition()
			.duration(800)
			.attr({x1:160, y1:(90-size*5), x2:185, y2:(90-size*5)});
		size++;
		len = count;
		count++;	
	}
}



