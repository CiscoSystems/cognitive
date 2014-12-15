var _from;
var _g_node_id = 1;

var Node = (function() {
  
  function Node(options) {
    
    this.node_id      = _g_node_id++;
    this.name         = options.name;
    this.input       = options.input;
    this.output      = options.output;
    this.width        = 180;
    this.height       = 40;
    this.component_id = 0;

    var svg = d3.selectAll("svg");

    var g = svg.append('g');
    // Just adding an element of randomity so things don't appear on top of each other.
    var _x = $('.detail').width() + (Math.random() * 400);
    var _y = 50 + (Math.random() * 400);
    // Lets compensate for smaller window widths, just in case.
    if (_x > window.innerWidth - 350) { _x = window.innerWidth - 500; console.log("Too big, making " + _x)}
    if (_y > window.innerHeight) { _y = window.innerHeight - 300;}
    var node = g.append('rect')
      .attr("x", _x)
      .attr("y", _y)
      .attr('width',  this.width)
      .attr('height', this.height)
      .attr('class', "node base-node")
      .attr('stroke', "steelblue" )
      .attr('stroke-width', "3" )
      .attr('text',"aaaaaa" )
      .attr('font-size', "20pt");

    g.append('text')
      .attr('x', _x + 90)
      .attr('y', _y + 25)
      .attr('fill', 'black')
      .style('stroke-width', 1)
      .style({"font-size":"14px","z-index":"9999999"} )
      .style('text-anchor', "middle")
      .text(this.name);
    
    if (this.input > 0){
     g.append('circle')        
        .attr('cx', _x + 90 )
        .attr('cy', _y)
        .attr('r', 4 )
        .attr('fill', '#fd8d3c')
        .style('stroke-width', 1);
 
    }
    if (this.output > 0) {
      g.append('circle')        
        .attr('cx', _x + 90 )
        .attr('cy', _y + 40 )
        .attr('r', 4 )
        .attr('fill', '#5264ae')
        .style('stroke-width', 1);
    }
      
    g.attr('x', 0)
     .attr('y', 0)
     .attr('abs_x', _x)
     .attr('abs_y', _y)
     .attr('id', this.node_id)
     .call(d3.behavior.drag().on("drag", _drag))
     .on("click", function(){ clicked(this); })
     .append('i').attr('class', 'fa fa-bar-chart')
     ;
  }

  function _drag(){

    var group = d3.select(this);
      
    sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
    sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);

    group
      .attr('x', sx)
      .attr('y', sy)
      .attr('transform', 'translate(' + sx + ',' + sy + ')');

    line_from = d3.selectAll('g[from_id="'+group.attr('id')+'"]').selectAll('line')
      .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
      .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);
    
    d3.selectAll('g[to_id="'+group.attr('id')+'"]').selectAll('line')
      .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
      .attr('y2', sy + parseInt(group.attr('abs_y')));
  }

  function setInputPath(path) {
    this.input_path = path;
  }
  function setOutputPath(path) {
    this.output_path = path;
  }
  function getInputPath(path) {
    return this.input_path;
  }
  function getOutputPath(path) {
    return this.output_path;
  }


  function clicked(elm){

    if (d3.event.defaultPrevented) return;

    node = d3.select(elm);

    if (Node.current_focus == null) {
      node.classed('clicked', true);
      Node.current_focus = node;
      return;
    }

    if (Node.current_focus.attr('id') == node.attr('id')) {
      node.classed('clicked', false);
      Node.current_focus = null;
      return;
    }

    var svg = d3.selectAll("svg");
    var g = svg.append('g')
        .attr('from_id', Node.current_focus.attr('id'))
        .attr('to_id', node.attr('id'));

    line  = g.append("line")
      .attr('x1',  parseInt(Node.current_focus.attr('x')) +  parseInt(Node.current_focus.attr('abs_x')) + 90)
      .attr('y1',  parseInt(Node.current_focus.attr('y')) +  parseInt(Node.current_focus.attr('abs_y')) + 40)
      .attr('x2',  parseInt(node.attr('x')) +  parseInt(node.attr('abs_x'))+ 90)
      .attr('y2',  parseInt(node.attr('y')) +  parseInt(node.attr('abs_y')))        
      .attr("stroke", "gray")
      .attr('troke-width', 10);

    Node.find_by_id(Node.current_focus.attr('id'))
      .setOutputPath(g);
    Node.find_by_id(node.attr('id'))
      .setInputPath(g);

    Node.current_focus.classed('clicked', false);
    
    node.classed('clicked', false);
    Node.current_focus = null;
  }

  function setComponentId(id) {
    this.component_id = id;
  }

  function getComponentId(id) {
    return (this.component_id);
  }

  function getId() {
    return this.node_id;
  }


  Node.prototype = {
    constructor:    Node,
    getId:          getId,
    setComponentId: setComponentId,
    getComponentId: getComponentId,
    setInputPath:   setInputPath,
    setOutputPath:  setOutputPath,
    getInputPath:   getInputPath,
    getOutputPath:  getOutputPath
  }

  Node.current_focus  = null;
  
  Node._all            = [];
  
  Node.getAll = function(){
    return Node._all;
  }
  
  Node.appendToList = function(node){
    return Node._all.push(node);
  }

  Node.find_by_id = function(id){
    for (var i =0; i < Node._all.length; i++){
      if (Node._all[i].node_id == id){
        return Node._all[i];
      }
    }
    return null;
  }
  
  Node.find_by = function(obj) {
    
    var key = Object.keys(obj)[0];
    
    for (var i =0; i < Node._all.length; i++){
      if (Node._all[i][key] == obj[key]){
        return Node._all[i];
      }
    }
    return null;
  }


  Node.getCurrentForcus = function() {
    return Node.find_by_id(Node.current_focus[0][0].id);
  }


  Node.getWorkflowFrom = function(node_id) {
    var node_list = [];

    var start = Node.find_by_id(node_id);
    // if (start.getOutputPath() == undefined) {
    //   node_list.push(start);
    //   return node_list;
    // }

    for ( var i = start; ;
      i = Node.find_by_id(parseInt(i.getOutputPath().attr('to_id')))) {
      console.log(i);
      node_list.push(i);
      if (i.getOutputPath() == undefined) { break; };
    }
    console.log("----------------");
    console.log(node_list);
    return node_list;
  }

  return Node;
})();