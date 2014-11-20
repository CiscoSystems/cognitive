
$(function(){
  var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];

  
  
  var svg = d3.selectAll("svg");

  function move(){
    // var parent = d3.select(this.parentNode);
    // parent.attr("x", function(){return d3.event.dx + parseInt(parent.attr("x"))})
    //         .attr("y", function(){return d3.event.dy +  parseInt(parent.attr("y"))});
    var node = d3.select(this);
    console.log(d3.event.dx,d3.event.dy)
    node.attr("x", function(){return parseInt(node.attr("x")) + d3.event.dx;  })
          .attr("y", function(){return parseInt(node.attr("y")) + d3.event.dy;});
  };

  // svg.append('circle')
  //   .attr("x", 120)
  //   .attr("y",120)
  //   .attr('cx', 100)
  //   .attr('cy', 120)
  //   .attr('r', 15)
  //   .attr('class', "node")
  //   .attr('fill', 'steelblue');

  $(".add_btn").click(function(){
    var node = svg.append('rect')
    .attr("x", 100)
    .attr("y", 30 + nodes.length * 80)
    .attr('width', 180)
    .attr('height', 40)
    .attr('class', "node")
    .attr('fill', 'white')
    .attr('stroke', "steelblue" )
    .attr('stroke-width', "5" )
    .call(d3.behavior.drag().on("drag", move));

    nodes.push(node);
    console.log(nodes);
  });
})