(function(){

var w = 600;
var h = 600;


//Create SVG element
var svg = d3.select("#texas-map-2")
			.append("svg")
			.attr("width", w)
			.attr("height", h);		

		var quantize = d3.scale.quantize()
		    .domain([0, 100000])
		    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
			
			
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
		
		var projection = d3.geo.albers()
		.scale([1]).translate([0, 0]);



		//Define path generator
		var path = d3.geo.path()
		.projection(projection);


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
	
				  
     		 .attr("class", function(d) { return quantize(d.properties.unformat_total); })
				  
		
		});
		
	});
		
 })();
		