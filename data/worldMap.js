(function (){

       var width = 2000;
       var height = 3000
       var projection = d3.geo.kavrayskiy7()
           .center([10, 15])
           .translate([170, 92])
           .rotate([0, 0])
           .scale(70);
       var path = d3.geo.path()
           .projection(projection);

       var ncgMap = d3.selectAll("#worldMap")
                .append("svg")
               .attr("width", width)
               .attr("height", height);

       d3.json("data/world-110m2.json", function(world) {
        d3.tsv("data/world-country-names.tsv", function(tsv){ 

       var countries = topojson.feature(world, world.objects.countries).features;




     //  tsv.forEach(function(t){
     //   countries.forEach(function(d){
     //    if (d.id == t.id) 
     //      d.name == t.name;
     //   });
     // });


      countries.forEach(function(d){
        console.log(d.id);
      })

        ncgMap.selectAll("path")
               .data(topojson.feature(world, world.objects.countries).features)
               .enter()
               .append("path")
               .attr("d", path)
               .style("stroke-width", 1)
               .style("fill", "gray");

     
          })

       })
   })();