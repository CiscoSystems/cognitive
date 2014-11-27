var _previous_node;
var _from;
var g_node_id = 0;
var Node = (function() {

  // constructor
  function Node(options) {
    this.node_id      = g_node_id++;
    this.name    = options.name;
    this.inputs  = options.inputs;
    this.outputs = options.outputs;
    this.width   = 180;
    this.height  = 40;
    
    // if (typeof this.callee.node_id !== 'undefined') {
    // this.node_id = this.node_id++ || 1;
        
    var svg = d3.selectAll("svg");

    var g = svg.append('g');
    var _x = 600;
    var _y = 30 + 1 * 80;
    var node = g.append('rect')
      .attr("x", _x)
      .attr("y", _y)
      .attr('width',  this.width)
      .attr('height', this.height)
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
      .text(this.name);

      // g.call(d3.behavior.drag().on("drag", move));
    
    if (this.inputs > 0){
     g.append('circle')        
        .attr('cx', _x + 90 )
        .attr('cy', _y)
        .attr('r', 6 )
        .attr('fill', '#fd8d3c')
        .style('stroke-width', 1);
 
    }
    if (this.outputs) {
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
     .attr('id', this.node_id)
     .call(d3.behavior.drag().on("drag", _drag))
     .on("click", function(){ clicked(this); });
     
     console.log("cccc");
  }

  function _drag(){
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



      console.log("------------");
      // var svg = d3.selectAll("svg");

      line_from = d3.select('g[from_id="'+group.attr('id')+'"]').select('line')
        .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
        .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);
        // .attr('transform', 'translate(' + sx + ',' + sy + ')');

      
      d3.select('g[to_id="'+group.attr('id')+'"]').select('line')
        .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
        .attr('y2', sy + parseInt(group.attr('abs_y')))
        ;
      
      console.log(svg.select('g[from_id='+group.id+']'));

  }

  function set_input_connection(elm) {
    this.input_connection = elm;
  }

  function set_output_connection(elm) {
    this.out_connection = elm;
  }

  function clicked(elm){
    if (d3.event.defaultPrevented) return;
    this._selected = (this._selected) ? true:false;
    
    node = d3.select(elm);

    if (this._selected) {
      node.select('rect').attr('fill', 'white');
      node.classed('clicked', false);
      _previous_node = null;
      this._selected = false;
      return;
    }
    this._selected = true;

    node.select('rect').attr('fill', '#ffd8ec');
    
    // グローバルは無理なので select で持ってくること
    _previous_node = $(".clicked");

    // そうしないとこの部分が動作しない
    if (_previous_node.length == 0) {
      console.log("sssss  ")
      node.classed('clicked', true);
      _previous_node = node;
      return;
    }

    // if(_previous_node === node){
    //   node.select('rect').attr('fill', 'white');
    //   node.classed('clicked', false);
    //   _previous_node = null;
    //   return;
    // }

    //_from = d3.select(_previous_node);//'.clicked');//_previous_node);

    // console.log(last_clicked_elm.attr('x'), last_clicked_elm.attr('y'));
    // console.log(node.attr('x'), node.attr('y'));
    // console.log("=====================")
    // console.log(last_clicked_elm.attr('abs_x'), last_clicked_elm.attr('abs_y'));
    // console.log(node.attr('abs_x'), node.attr('abs_y'));
    var svg = d3.selectAll("svg");
    var g = svg.append('g')
        .attr('from_id', _previous_node.attr('id'))
        .attr('to_id', node.attr('id'));
    console.log("------------");
    console.log(_previous_node.attr('id'));
    console.log(node.attr('id'));
    line  = g.append("line")
      .attr('x1',  parseInt(_previous_node.attr('x')) +  parseInt(_previous_node.attr('abs_x')) + 90)
      .attr('y1',  parseInt(_previous_node.attr('y')) +  parseInt(_previous_node.attr('abs_y')) + 40)
      .attr('x2',  parseInt(node.attr('x')) +  parseInt(node.attr('abs_x'))+ 90)
      .attr('y2',  parseInt(node.attr('y')) +  parseInt(node.attr('abs_y')))
      .attr('stroke', 'gray')
      .attr('stroke-width', 3);

    // line = last_clicked_elm.append("line")
    //   .attr('x1',  parseInt(node.attr('x')) +  parseInt(node.attr('abs_x')))
    //   .attr('y1',  parseInt(node.attr('y')) +  parseInt(node.attr('abs_y')))
    //   .attr('x2',  parseInt(last_clicked_elm.attr('x')) +  parseInt(last_clicked_elm.attr('abs_x')))
    //   .attr('y2',  parseInt(last_clicked_elm.attr('y')) +  parseInt(last_clicked_elm.attr('abs_y')))
    //   .attr('stroke', 'gray')
    //   .attr('stroke-width', 3);
    // last_clicked_elm.append(line);
    
    // last_clicked_elm = null;

    // _previous_node[0].classed('clicked', false);
    _previous_node.attr('fill', 'white');
    _previous_node.attr('class', '');
    
    node.classed('clicked', false);
    node.select('rect').attr('fill', 'white');

    //_previous_node = null;
    // node.classed('clicked', true);
  }

  return Node;
})();