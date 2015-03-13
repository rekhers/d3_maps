(function(){

var w = 1000;
var h = 800;
var data;


var projection = d3.geo.albers()
.scale(2000)
.translate([300, 15]);



//Define path generator
var path = d3.geo.path()
.projection(projection);


 

//Create SVG element
var svg = d3.select("#texas-map-1")
			.append("svg")
			.attr("width", w)
			.attr("height", h);		


		var counties = svg.append("g")
		    .attr("id", "counties");
//Load in GeoJSON data
			
			
			
d3.json("data/tx_counties.json", function(json){
	
	console.log(json);
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
				.html("<strong>" + d.properties.COUNTY + "</strong>")
			d3.select("#tooltip").classed("hidden", false);					  
				 })
		 
			.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
								
				  })
		
		});
		
 })();
		