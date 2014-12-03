$(function(){


var dataset = [ 55, 40, 90, 29];

var xAxis = d3.svg.axis();

var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[0]; })])
            .range([0, 350]);

var w = 100;
var h = 100;
var svg = d3.select("body").selectAll("svg")

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d,i){
    return i * 20 + 6;
   })
   .attr('fill', '#1e8cff')
   .attr('class', 'bar')
   .attr("y", function(d){
    return h - d;
   })
   .attr('height', function(d){ return d -3; })
   .attr("width", (w/dataset.length - 7));

  svg.append('rect')
    .attr("x", 3)
    .attr("y", 3)
    .attr('width',  w - 6 )
    .attr('height', h - 6 )
    .attr('stroke', "black" )
    .attr('fill', 'none')
    .attr('stroke-width', "1" )


// svg.append('line')
//   .attr('x1', 0 )
//   .attr('y1', h - 3 )
//   .attr('x2', w )
//   .attr('y2', h - 3 )
//   .attr('stroke',"black" )
//   .attr('stroke-width',"1");

// svg.append('line')
//   .attr('x1', 3 )
//   .attr('y1', 0 )
//   .attr('x2', 3 )
//   .attr('y2', h )
//   .attr('stroke',"black" )
//   .attr('stroke-width',"1");
  
})
