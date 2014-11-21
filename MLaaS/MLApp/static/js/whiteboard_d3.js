
$(function(){
  var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];

  
  
  var svg = d3.selectAll("svg");


  function move(){
    // var parent = d3.select(this.parentNode);
    // parent.attr("x", function(){return d3.event.dx + parseInt(parent.attr("x"))})
    //         .attr("y", function(){return d3.event.dy +  parseInt(parent.attr("y"))});


    var group = d3.select(this);
      // console.log(this.attr("x"),this.attr("y"))
      // target = this.parentNode();
      // translation = target.getAttributeNS(null, "transform").slice(10,-1).split(' ');
      // sx = parseInt(translation[0]);
      // sy = parseInt(translation[1]);
      console.log(d3.event.dx,d3.event.dy)
      
      sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
      sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);

      console.log(sx,sy)
      console.log(parseInt(sx) + parseInt(d3.event.dx),parseInt(sy) +  parseInt(d3.event.dy))      

      group
        .attr('x', sx)
        .attr('y', sy)
        .attr('transform', 'translate(' + sx + ',' + sy + ')');

          



    // var node = d3.select(this);
    // console.log(d3.event.dx,d3.event.dy)
    //   node.attr("x", function(){return parseInt(node.attr("x")) + d3.event.dx;  })
    //       .attr("y", function(){return parseInt(node.attr("y")) + d3.event.dy;});


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
    var g = svg.append('g');
    
    var _x = 100;
    var _y = 30 + nodes.length * 80;
    var node = g.append('rect')
    .attr("x", _x)
    .attr("y", _y)
    .attr('width', 180)
    .attr('height', 40)
    .attr('class', "node")
    .attr('fill', 'white')
    .attr('stroke', "steelblue" )
    .attr('stroke-width', "5" )
    .attr('text',"aaaaaa" )
    .attr('font-size', "20pt");
    

    g.append('text')
    .attr('x', _x + 90)
    .attr('y', _y + 25)
    .attr('fill', 'black')
    .style('stroke-width', 1)
    .style({"font-size":"14px","z-index":"9999999"} )
    .style('text-anchor', "middle")
    .text("INPUT DATA");

    // g.call(d3.behavior.drag().on("drag", move));
    g.attr('x', 0)
     .attr('y', 0)
     .call(d3.behavior.drag().on("drag", move));

    nodes.push(g);
    console.log(g);
  });
})