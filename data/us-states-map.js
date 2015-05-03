(function(){

var w = 1000;
var h = 800;

var svg = d3.select("#us-states-map")
			.append("svg")
			.attr("width", w)
			.attr("height", h);		
			
			
	d3.json("data/us-counties-data.json", function(json){
		
	var projection = d3.geo.albers()
	    .scale(-.6)
	    .translate([0, 0]);

	// Create a path generator.
	var path = d3.geo.path()
	    .projection(projection);

	// Compute the bounds of a feature of interest, then derive scale & translate.
	var b = path.bounds(json),
	    s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
	    t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

	// Update the projection to use computed scale & translate.
	projection
	    .scale(s)
	    .translate(t);
	
	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")				
   		.attr("class", "county")
	    .attr("d", path)
		

		.on("mouseover", function(d){
				d3.select("#tooltip")
				.style("left", (d3.event.pageX) + "px")     
             	.style("top", (d3.event.pageY - 90) + "px")
				.select("#info-label")	
				.html("<strong>" + d.properties.name + "</strong>")
			d3.select("#tooltip").classed("hidden", false);					  
				 })
		 
			.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
								
				  })
	
		
	});
		
 })();