var drawTree = function(){
	var h = 300;
	var w = 550;

	var treeData =
		 {"name" : "A", "children" : [
            {"name" : "A1" },
            {"name" : "A2" },
            {"name" : "A3", "children": [
            	{"name" : "A31", "children" :[
            		{"name" : "A311" },
            		{"name" : "A312" }
    			]}
    		]}
      ]};

	var svg = d3.select('.tree').append('svg')
		.attr('height', h)
		.attr('width', w);

	var tree = d3.layout.tree();


}()