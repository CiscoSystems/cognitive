$(function(){
  var dataset = [ 5, 10, 15, 20, 25 ];
  var nodes = [];
  
  var last_clicked_elm = null;
  var group_id = 1;  

  node = new Node({
    name: 'aaaa',
    inputs: 1,
    outputs: 1
  });

  
  $(".add_btn").click(function(){
    
    var component_name = "invalid";
    
    
    console.log($(this).attr('class'));
    var node;
    if ($(this).hasClass('add_input')){
      
      node = new Node({
        name:'INPUT_DATA',
        outputs:1,
        inputs:0
      });
      
      request_data = {
        user_id: 1, 
        token: "aaa",
        experiment_id: 1,
        type: "css",
        data: [["1","2","3"],["4","5","6"]]
      };

    } else if ($(this).hasClass('add_transform')) {
      node = new Node({
        name:'TRANSFORM',
        input: 1,
        output:1
      });

    } else if ($(this).hasClass('add_metadata')) {
      node = new Node({
        name:'METADATA',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_transform')) {
      node = new Node({
        name:'TRANSFORM',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_formula')) {
      node = new Node({
        name:'FORMULA',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_filtering')) {
      node = new Node({
        name:'FILTERING',
        input:1,
        outputs:1
      });
    } else if ($(this).hasClass('add_output')) {
      node = new Node({
        name:'OUTPUT',
        input:1,
        output:0
      });
    } else if ($(this).hasClass('add_machine_learning')) {
      node = new Node({
        name:'Machine Learning',
        input:1,
        output:0
      });
    } 


    // var g = svg.append('g');

    
    // var _x = 100;
    // var _y = 30 + nodes.length * 80;
    // var node = g.append('rect')
    //   .attr("x", _x)
    //   .attr("y", _y)
    //   .attr('width', 180)
    //   .attr('height', 40)
    //   .attr('class', "node")
    //   .attr('fill', 'white')
    //   .attr('stroke', "steelblue" )
    //   .attr('stroke-width', "5" )
    //   .attr('text',"aaaaaa" )
    //   .attr('font-size', "20pt");
    //   // .call(d3.behavior.drag().on("drag", move));
    

    // g.append('text')
    //   .attr('x', _x + 90)
    //   .attr('y', _y + 25)
    //   .attr('fill', 'black')
    //   .style('stroke-width', 1)
    //   .style({"font-size":"14px","z-index":"9999999"} )
    //   .style('text-anchor', "middle")
    //   .text(component_name);

    //   // g.call(d3.behavior.drag().on("drag", move));
    
    // if (num_of_input > 0){
    //  g.append('circle')        
    //     .attr('cx', _x + 90 )
    //     .attr('cy', _y)
    //     .attr('r', 6 )
    //     .attr('fill', '#fd8d3c')
    //     .style('stroke-width', 1);
 
    // }
    // if (num_of_output) {
    //   g.append('circle')        
    //     .attr('cx', _x + 90 )
    //     .attr('cy', _y + 40 )
    //     .attr('r', 6 )
    //     .attr('fill', '#5264ae')
    //     .style('stroke-width', 1);
    // }
      
    // g.attr('x', 0)
    //  .attr('y', 0)
    //  .attr('abs_x', _x)
    //  .attr('abs_y', _y)
    //  .attr('group_id', group_id++)
    //  .call(d3.behavior.drag().on("drag", move))
    //  .on("click", function(){ clicked(this); });
     

    
    // nodes.push(g);
    // console.log(g);
  });
})


