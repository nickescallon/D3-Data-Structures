var drawQueue = function(){	
	var h = 150;
	var w = 750;
	var x1 = 10;
	var y1 = 10;
	var x2 = 80;
	var y2 = 10;
	var xVar = 200;
	var maxItems = 45;
	var data = d3.range(maxItems);
	var count = 0;

	var svg = d3.select('.queue').append('svg')
		.attr('height', h)
		.attr('width', w);

	var lines = svg.selectAll('.lines').data(data);

	lines.enter()
		.append("line")
		.attr("x1", x1)
	    .attr("y1", y1)
	    .attr("x2", x2)
	    .attr("y2", y2)
	    .style({"stroke": "rgb(6,120,155)", "stroke-width" : 10});

	lines.exit()
		.remove("line");

	/*---------------------------PUSH BUTTON--------------------------*/

	var dequeueButton = svg.append('g')
		.attr('transform', 'translate('+(w-140)+','+(h-30)+')')
		.attr('fill', 'white')
		.attr('stroke-width', .5)
		.attr('stroke', 'black');

	dequeueButton.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 55)
		.attr('height', 20)
		.attr('rx', 1)
		.attr('ry', 1);

	var dequeueText = dequeueButton.append('text')
		.attr('y', 13)
		.attr('x', 8)
		.attr('fill', 'none');

	dequeueText.text('dequeue');

	/*---------------------------POP BUTTON--------------------------*/

	var enqueueButton = svg.append('g')
		.attr('transform', 'translate('+(w-70)+','+(h-30)+')')
		.attr('fill', 'white')
		.attr('stroke-width', .5)
		.attr('stroke', 'black');

	enqueueButton.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width',55)
		.attr('height', 20)
		.attr('rx', 1)
		.attr('ry', 1);

	var enqueueText = enqueueButton.append('text')
		.attr('y', 13)
		.attr('x', 5)
		.attr('fill', 'none');

	enqueueText.text('enqueue');



	/*-----------------------QUEUE HELPER FUNCTIONS--------------------------*/

	var d3queue = new Queue; // Defines new queue used for d3queuePush/d3queuePop

	var d3queueEnqueue = function(){
		lines.filter(function(d, i) {
				if (i === count){
					d3queue.enqueue(i);
					return true;
				}
			 })
			.transition()
			.duration(800)
			.attr({x1:550 - d3queue.size()*20, y1:30, x2:550 - d3queue.size()*20, y2:100});
		count++;
	}

	var d3queueDequeue = function(){
		var index = d3queue.dequeue();
		lines.filter(function(d, i) {
				if (i === index){
					return true;
				}
			 })
			.style({"stroke": "rgb(255, 137, 0)", "stroke-width": 10})
			.transition()
			.duration(800)
			.attr({x1: 670, y1: y1, x2: 740, y2: y2});

		lines.each(function(value, index){
			if (d3queue.storage[index]){
				var x_1 = parseInt(this.getAttribute('x1'));
				var x_2 = parseInt(this.getAttribute('x2'));

				d3.select(this).transition()
				.duration(100)
				.attr({'x1': x_1+20, 'x2': x_2+20});
			}
		});
	}

	/*---------------------EVENT HANDLERS FOR queue BUTTONS------------------*/

	enqueueButton.on('click', function(){
		d3queueEnqueue();
	});

	dequeueButton.on('click', function(){
		d3queueDequeue();
	});
}()