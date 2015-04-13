var Node = (function() {

    // class variable
    var functionality_layer, node_layer, connection_layer, scope_layer;

    // class function
    var generate_id = (function(){
        var gen = 1;
        return function() {return gen++;};
    })();

    function Node(options) {

        functionality_layer = $('#layer-4')
        node_layer = $('#layer-3');
        connection_layer = $('#layer-2');
        scope_layer = $('#layer-1');

        this._id = generate_id();
        this._width = 180;
        this._height = 40;
        this.name = options.name;
        this._input = options.input;
        this._output = options.output;
        this.component_id = 0;
        this._x = 0;
        this._y = 0;

        _create_node.call(this);
        _create_scope.call(this);
        _append_functionality.call(this);
    }

    // private function
    function _create_node() {

        // Just adding an element of randomity so things don't appear on top of each other.
        this._x = $('.detail').width() + (Math.random() * 400);
        this._y = 50 + (Math.random() * 400);

        // Lets compensate for smaller window widths, just in case.
        if (this._x > window.innerWidth - 350) { this._x = window.innerWidth - 500; console.log("Too big, making " + _x);}
        if (this._y > window.innerHeight) { this._y = window.innerHeight - 300;}

        var svg = d3.selectAll(node_layer);
        var g = svg.append('g')
            .attr('class', 'node-group')
            .attr('x', 0)
            .attr('y', 0)
            .attr('abs_x', this._x)
            .attr('abs_y', this._y)
            .attr('id', 'node-group-' + this._id)
            .call(d3.behavior.drag().on("drag", _drag))
            .on("click", function () { clicked(this); })
            .on("mouseenter", function() {
                var id = this.id.split("-")[2];
                $("#close-icon-id-" + id).css("display", "block");
            });

        g.append('rect')
            .attr('x', this._x)
            .attr('y', this._y)
            .attr('width',  this._width)
            .attr('height', this._height)
            .attr('class', "node base-node")
            .attr('stroke', "steelblue" )
            .attr('stroke-width', "3" );

        g.append('text')
            .attr('x', this._x + 90)
            .attr('y', this._y + 25)
            .attr('fill', 'black')
            .style('stroke-width', 1)
            .style({"font-size":"14px","z-index":"9999999"} )
            .style('text-anchor', "middle")
            .text(this.name);

        if (this._input > 0) {
            g.append('circle')
                .attr('cx', this._x + 90)
                .attr('cy', this._y)
                .attr('r', 4)
                .attr('fill', '#fd8d3c')
                .style('stroke-width', 1);
        }

        if (this._output > 0) {
            g.append('circle')
                .attr('cx', this._x + 90 )
                .attr('cy', this._y + 40 )
                .attr('r', 4 )
                .attr('fill', '#5264ae')
                .style('stroke-width', 1);
        }

    }

    // private function
    function _create_scope() {

        var scope = d3.selectAll(scope_layer)
            .append('g').attr('id', "scope-group-" + this._id)
            .on("mouseleave", function(){
                var id = this.id.split("-")[2];
                $("#close-icon-id-" + id).css("display", "none");
            });

        console.log(this._width);
        scope.append('rect')
            .attr('x', this._x - 35)
            .attr('y', this._y - 35)
            .attr('width',  this._width + 70)
            .attr('height', this._height + 70)
            .attr('class', "scope")
            .attr('id', "scope-" + this._id)
            .attr('fill', 'white');
    }

    // private function
    function _append_functionality() {
        var svg = d3.selectAll(functionality_layer);
        var g = svg.append('g').attr('id', 'functionality-group-' + this._id);

        g.append('text')
            .attr('x',this. _x - 20)
            .attr('y', this._y - 5)
            .attr('class', 'close-icon')
            .attr('id', 'close-icon-id-' + this._id)
            .text('\uf00d')  // icon: fa-close
            .on("click", function() { erase(this); return false; })
            .on("mouseenter", function(){$(this).css("display", "block")});
    }

    function erase(elm) {

        var g = d3.select(elm);
        var id = g.attr('id').split("-")[3];

        Node.current_focus = null;

        $('#scope-group-' + id).remove();
        $('#node-group-' + id).remove();
        $('g[from_id="' + "node-group-" + id +'"]').remove();
        $('g[to_id="' + "node-group-" + id +'"]').remove();
        $('#functionality-group-' + id).remove();

        /*
        *  TODO: remove from Node.all tables otherwise cannot calculate path information
        * */

        var self_node_idx = Node.find_by_id(this._id);
        if (self_node_idx > -1) { Node._all.splice(self_node_idx, 1); }

        return false;
    }

    function _drag() {

        /*
         * TODO: should separate each drag functions for each part
         *       or should make some group which can control entire node
         */

        var group = d3.select(this);

        var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
        var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);

        group.attr('x', sx).attr('y', sy)
            .attr('transform', 'translate(' + sx + ',' + sy + ')');

        d3.selectAll('g[from_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);

        d3.selectAll('g[to_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y2', sy + parseInt(group.attr('abs_y')));

        var node_id = group.attr('id').split("-")[2];

        var scope = d3.selectAll($('#scope-' + node_id));

        scope
            .attr('x', sx - 30 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 30 + parseInt(group.attr('abs_y')));

        var functionality_group = d3.selectAll($('#close-icon-id-' + node_id));
        console.log(functionality_group);
        functionality_group
            .attr('x', sx - 20 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 5 + parseInt(group.attr('abs_y')));

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

    function getOutputPath() {
        return this.output_path;
    }

    function clicked(elm){

        if (d3.event.defaultPrevented) return;
        var node = d3.select(elm);

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

        var svg = d3.selectAll(connection_layer);
        var g = svg.append('g')
            .attr('from_id', Node.current_focus.attr('id'))
            .attr('to_id', node.attr('id'));

        line  = g.append("line")
            .attr('x1',  parseInt(Node.current_focus.attr('x')) +  parseInt(Node.current_focus.attr('abs_x')) + 90)
            .attr('y1',  parseInt(Node.current_focus.attr('y')) +  parseInt(Node.current_focus.attr('abs_y')) + 40)
            .attr('x2',  parseInt(node.attr('x')) +  parseInt(node.attr('abs_x'))+ 90)
            .attr('y2',  parseInt(node.attr('y')) +  parseInt(node.attr('abs_y')))
            .attr("stroke", "gray")
            .attr('stroke-width', 2);

        var current_focus_node_id = Node.current_focus.attr('id').split("-")[2];
        var next_node_id = node.attr('id').split("-")[2];

        Node.find_by_id(current_focus_node_id).setOutputPath(g);
        Node.find_by_id(next_node_id).setInputPath(g);
        Node.current_focus.classed('clicked', false);

        node.classed('clicked', false);
        Node.current_focus = null;
    }

    function setComponentId(id) {
        this.component_id = id;
    }

    function getComponentId(id) {
        return this.component_id;
    }

    function getId() {
        return this._id;
    }

    //Node.disableUIFocus = function disableUIFocus() {
    //
    //    var target = $('.clicked');
    //    var class_list = target.attr('class').split(" ,");
    //    var idx = class_list.indexOf("clicked");
    //
    //    if (idx > -1) {
    //        class_list.splice(idx, 1);
    //    }
    //
    //    var without_clicked = class_list
    //        .reduce(function(result, x){return result + " " + x}, "");
    //
    //    target.attr('class', without_clicked);
    //};

    Node.prototype = {
        constructor:    Node,
        getId:          getId,
        setComponentId: setComponentId,
        getComponentId: getComponentId,
        setInputPath:   setInputPath,
        setOutputPath:  setOutputPath,
        getInputPath:   getInputPath,
        getOutputPath:  getOutputPath
    };

    Node.current_focus = null;

    Node._all = [];

    Node.getAll = function(){
        return Node._all;
    };

    Node.appendToList = function(node){
        return Node._all.push(node);
    };

    Node.find_by_id = function(id) {
        for (var i =0; i < Node._all.length; i++){
            if (Node._all[i]._id == id){
                return Node._all[i];
            }
        }
        return null;
    };

    Node.find_by = function(obj) {

        var key = Object.keys(obj)[0];

        for (var i =0; i < Node._all.length; i++){
            if (Node._all[i][key] == obj[key]){
                return Node._all[i];
            }
        }
        return null;
    };

    Node.getCurrentFocus = function () {
        var focus_node_id = Node.current_focus[0][0].id.split("-")[2];
        return Node.find_by_id(focus_node_id);
    };

    Node.getWorkflowFrom = function(node_id) {

        var node_list = [];
        var start = Node.find_by_id(node_id);

        for ( var i = start;;
              i = Node.find_by_id(parseInt(i.getOutputPath().attr('to_id').split("-")[2]))) {
            node_list.push(i);
            if (i.getOutputPath() === undefined) {
                break;
            }
        }

        return node_list;
    };

    return Node;

})();
