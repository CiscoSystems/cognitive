$(function(){
  var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];
  
  var last_clicked_elm = null;
  var group_id = 1;  
  
  var svg = d3.selectAll("svg");


  function clicked(elm){
    node = d3.select(elm);
    
    if (last_clicked_elm == null) {
      last_clicked_elm = elm;
      return 
    }    

    last_clicked_elm = d3.select(last_clicked_elm);

    console.log(last_clicked_elm.attr('x'), last_clicked_elm.attr('y'));
    console.log(node.attr('x'), node.attr('y'));
    console.log("=====================")
    console.log(last_clicked_elm.attr('abs_x'), last_clicked_elm.attr('abs_y'));
    console.log(node.attr('abs_x'), node.attr('abs_y'));

    line = last_clicked_elm.append("line")      
      .attr('x1',  parseInt(node.attr('x')) +  parseInt(node.attr('abs_x')))
      .attr('y1',  parseInt(node.attr('y')) +  parseInt(node.attr('abs_y')))
      .attr('x2',  parseInt(last_clicked_elm.attr('x')) +  parseInt(last_clicked_elm.attr('abs_x')))
      .attr('y2',  parseInt(last_clicked_elm.attr('y')) +  parseInt(last_clicked_elm.attr('abs_y')))
      .attr('stroke', 'gray')
      .attr('stroke-width', 3);
    // last_clicked_elm.append(line);
  
    last_clicked_elm = null;
        
  }

  function move(){
    // var parent = d3.select(this.parentNode);
    // parent.attr("x", function(){return d3.event.dx + parseInt(parent.attr("x"))})
    //         .attr("y", function(){return d3.event.dy +  parseInt(parent.attr("y"))});
    console.log("aaa");
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
  };

  $(".add_btn").click(function(){
    
    var component_name = "invalid";
    var num_of_input   = 0;
    var num_of_output  = 0;
    console.log($(this).attr('class'));
    if ($(this).hasClass('add_input')){
      component_name = 'INPUT_DATA'
      num_of_output  = 1;
      
      request_data = {
        user_id: 1, 
        token: "aaa",
        experiment_id: 1,
        type: "css",
        data: [["1","2","3"],["4","5","6"]]
      };


    } else if ($(this).hasClass('add_transform')) {
      component_name = 'TRANSFORM'
      num_of_input   = 1;
      num_of_output  = 1;

    } else if ($(this).hasClass('add_metadata')) {
      component_name = 'METADATA'
      num_of_input   = 1;
      num_of_output  = 1;
    } else if ($(this).hasClass('add_transform')) {
      component_name = 'TRANSFORM'
      num_of_input   = 1;
      num_of_output  = 1;
    } else if ($(this).hasClass('add_formula')) {
      component_name = 'FORMULA'
      num_of_input   = 1;
      num_of_output  = 1;
    } else if ($(this).hasClass('add_filtering')) {
      component_name = 'FILTERING'
      num_of_input   = 1;
      num_of_output  = 1;
    } else if ($(this).hasClass('add_output')) {
      component_name = 'OUTPUT'
      num_of_input   = 1;
    } else if ($(this).hasClass('add_machine_learning')) {
      component_name = 'Machine Learning'
      num_of_input   = 1;
    } 


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
      // .call(d3.behavior.drag().on("drag", move));
    

    g.append('text')
      .attr('x', _x + 90)
      .attr('y', _y + 25)
      .attr('fill', 'black')
      .style('stroke-width', 1)
      .style({"font-size":"14px","z-index":"9999999"} )
      .style('text-anchor', "middle")
      .text(component_name);

      // g.call(d3.behavior.drag().on("drag", move));
    
    if (num_of_input > 0){
     g.append('circle')        
        .attr('cx', _x + 90 )
        .attr('cy', _y)
        .attr('r', 6 )
        .attr('fill', '#fd8d3c')
        .style('stroke-width', 1);
 
    }
    if (num_of_output) {
      g.append('circle')        
        .attr('cx', _x + 90 )
        .attr('cy', _y + 40 )
        .attr('r', 6 )
        .attr('fill', '#5264ae')
        .style('stroke-width', 1);
    }
      
    g.attr('x', 0)
     .attr('y', 0)
     .attr('abs_x', _x)
     .attr('abs_y', _y)
     .attr('group_id', group_id++)
     .call(d3.behavior.drag().on("drag", move))
     .on("click", function(){ clicked(this); });
     

    
    nodes.push(g);
    console.log(g);
  });
})