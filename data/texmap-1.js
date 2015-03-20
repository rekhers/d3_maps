(function(){

var w = 1000;
var h = 500;
var data;


var projection = d3.geo.albers()
.center([44.2, 72.5])
.scale([2500]).translate([1550, -1620]);



//Define path generator
var path = d3.geo.path()
.projection(projection);


 

//Create SVG element
var svg = d3.select("#texas-map-1")
			.append("svg")
			.attr("width", w)
			.attr("height", h);		
			
d3.csv("data/tex-pop-simple.csv", function(data) {
			
	d3.json("data/tx_counties.json", function(json){
		

		for (var i = 0; i < data.length; i++) {
			
			var dataCounty = data[i].Name;
			
			var dataTotal = data[i].Total;
			
	
			//Find the corresponding state inside the GeoJSON
			for (var j = 0; j < json.features.length; j++) {
			
				var county_name = json.features[j].properties.COUNTY;
				
				
				county_name = county_name.split(" ")
							  county_name.pop();
							  
				county_name = county_name.join(" ");
				
					
				
				if (dataCounty.toLowerCase() == county_name.toLowerCase()) {
			
					//Copy the data value into the JSON
					
					var unformat_total = parseInt(dataTotal.replace(/,/g,''));
					
					var format_total = dataTotal;
					
					
					json.features[j].properties.format_total = format_total;
					json.features[j].properties.unformat_total = unformat_total;
					
					
					
					//Stop looking through the JSON
					break;
					
				}
			}		
		}
		
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
				.html("<strong>" + d.properties.COUNTY + '</br>' + "Population: " + d.properties.format_total + "</strong>")
			d3.select("#tooltip").classed("hidden", false);					  
				 })
		 
			.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
								
				  })
		
		});
		
	});
		
 })();
		