var drawStack = function(){	
	var h = 100;
	var w = 350;
	var x1 = 10;
	var y1 = 10;
	var x2 = 10;
	var y2 = 35;
	var xVar = 320;
	var maxItems = 18
	var data = d3.range(maxItems);
	var count = 0;

	var svg = d3.select('.stack').append('svg')
		.attr('height', h)
		.attr('width', w);

	var lines = svg.selectAll('.lines').data(data);

	lines.enter()
		.append("line")
		.attr("x1", x1)
	    .attr("y1", y1)
	    .attr("x2", x2)
	    .attr("y2", y2)
	    .style({"stroke": "rgb(6,120,155)", "stroke-width" : 2});

	lines.exit()
		.remove("line");

	/*---------------------------PUSH BUTTON--------------------------*/

	var popButton = svg.append('g')
		.attr('transform', 'translate(260, 70)')
		.attr('fill', 'white')
		.attr('stroke-width', .5)
		.attr('stroke', 'black');

	popButton.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 35)
		.attr('height', 20)
		.attr('rx', 1)
		.attr('ry', 1);

	var popText = popButton.append('text')
		.attr('y', 13)
		.attr('x', 8)
		.attr('fill', 'none');

	popText.text('pop');

	/*---------------------------POP BUTTON--------------------------*/

	var pushButton = svg.append('g')
		.attr('transform', 'translate(300, 70)')
		.attr('fill', 'white')
		.attr('stroke-width', .5)
		.attr('stroke', 'black');

	pushButton.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 35)
		.attr('height', 20)
		.attr('rx', 1)
		.attr('ry', 1);

	var pushText = pushButton.append('text')
		.attr('y', 13)
		.attr('x', 5)
		.attr('fill', 'none');

	pushText.text('push');



	/*-----------------------STACK HELPER FUNCTIONS--------------------------*/

	var d3stack = new Stack; // Defines new stack used for d3stackPush/d3stackPop

	var d3stackPush = function(){
		lines.filter(function(d, i) {
				if (i === count){
					d3stack.push(i);
					return true;
				}
			 })
			.transition()
			.duration(800)
			.attr({x1:160, y1:(90-(d3stack.size()*5)), x2:185, y2:(90-(d3stack.size()*5))});
		count++;
	}

	var d3stackPop = function(){
		var index = d3stack.pop();
		lines.filter(function(d, i) {
				if (i === index){
					return true;
				}
			 })
			.style({"stroke": "rgb(255, 137, 0)", "stroke-width": 2})
			.transition()
			.duration(800)
			.attr({x1: x1+xVar, y1: y1, x2: x2+xVar, y2: y2});
	}

	/*---------------------EVENT HANDLERS FOR STACK BUTTONS------------------*/

	pushButton.on('click', function(){
		d3stackPush();
	});

	popButton.on('click', function(){
		d3stackPop();
	});
}()