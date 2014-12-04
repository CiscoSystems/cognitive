$(function(){

// $.colorbox({html:"<img src='/static/images/spinner.gif' alt='Smiley face' height='200px' width='200px'/>", closeButton:false});


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
   .attr("x", function(d,i){ return i * 22 + 7; })
   .attr("y", function(d){ return h - d; })
   .attr('class', 'bar')
   
   .attr('height', function(d){ return d -3; })
   .attr("width", (w/dataset.length - 6));

  svg.append('rect')
    .attr("x", 3)
    .attr("y", 3)
    .attr('width',  w - 6 )
    .attr('height', h - 6 )
    .attr('stroke', "black" )
    .attr('fill', 'none')
    .attr('stroke-width', "1" )
  
})
