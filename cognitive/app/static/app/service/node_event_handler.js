cognitive.factory('CognitiveNodeEventHandlerService', function () {
    var CognitiveNodeEventService = {};

    var dragCognitiveNode = function dragCognitiveNode() {
        var group = d3.select(this);
        var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
        var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);
        var node_id = d3.select(this).attr('node');
        var scope = angular.element(this).scope();
        var workspace = scope.currentWorkspace();
        var cognitive_node = scope.getNodeByWorkspaceAndIndex(workspace.id, node_id);

        cognitive_node.x += sx;
        cognitive_node.y += sy;
        scope.$apply();

        //d3.selectAll('g[from_id="' + group.attr('id') + '"]').selectAll('line')
        //    .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
        //    .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);

        //d3.selectAll('g[to_id="' + group.attr('id') + '"]').selectAll('line')
        //    .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
        //    .attr('y2', sy + parseInt(group.attr('abs_y')));

        //var node_id = group.attr('id').split("-")[2];
        //var scope = d3.selectAll($('#scope-' + node_id));
        //
        //scope
        //    .attr('x', sx - 30 + parseInt(group.attr('abs_x')))
        //    .attr('y', sy - 30 + parseInt(group.attr('abs_y')));
        //
        //var functionality_group = d3.selectAll($('#close-icon-id-' + node_id));
        //
        //functionality_group
        //    .attr('x', sx - 20 + parseInt(group.attr('abs_x')))
        //    .attr('y', sy - 5 + parseInt(group.attr('abs_y')));
        //
        //var edit_icon = d3.selectAll($('#edit-icon-id-' + node_id));
        //
        //edit_icon
        //    .attr('x', sx + parseInt(group.attr('abs_x')))
        //    .attr('y', sy - 5 + parseInt(group.attr('abs_y')));
    }

    var prepareDrawingConnection = function prepareDrawingConnection(){
    }

    var drawingConnection = function drawingConnection() {
        $('.tempolary-line').remove();
        var workspace = angular.element(this).scope().currentWorkspace();
        var start = d3.select(this);
        var current_x = d3.event.x;
        var current_y = d3.event.y;
        var node = $("#node-group-" + start.attr('node'));
        var g= d3.select($(".layer-4[workspace=" + workspace.id + "]")[0])
            .append('g').attr('class', 'tempolary-line');

        g.append("line")
            .attr('x1', parseInt(start.attr('cx')) + parseInt(node.attr('x')))
            .attr('y1', parseInt(start.attr('cy')) + parseInt(node.attr('y')))
            .attr('x2', current_x + parseInt(node.attr('x')) + 1)
            .attr('y2', current_y + parseInt(node.attr('y')) + 1)
            .attr('stroke', 'steelblue').attr('stroke-width', '2');
    }

    var finishDrawingConnection = function finishDrawingConnection() {
        $('.tempolary-line').remove();
        var dest = $(".focus")
        if (dest.length !== 1) {
            d3.select(this).classed('src', false);
            return;
        }

        dest = d3.select(dest[0]);
        var src_node_id = d3.select(this).attr('node');
        var dest_node_id = dest.attr('node');
        angular.element(this).scope().appendEdgeOnCurrentWorkspace(src_node_id, dest_node_id);
        d3.select(this).classed('src', false);
    }

    var connectionPointMouseLeave = function connectionPointMouseLeave() {
        d3.select(this).attr("r", 5).style('fill', '');
        d3.select($('.focus')[0]).classed('focus', false);
    }

    var connectionPointMouseOut = function connectionPointMouseOut() {
    }

    var connectionPointMouseMove = function connectionPointMouseMove() {
    }

    var connectionPointMouseEnter = function connectionPointMouseEnter(){
    }

    var connectionPointMouseOver = function connectionPointMouseOver() {
        d3.select(this).attr('r', 10).classed('focus', true).style('fill', 'yellow');
    }

    CognitiveNodeEventService = {
        dragCognitiveNode: dragCognitiveNode,
        prepareDrawingConnection: prepareDrawingConnection,
        drawingConnection: drawingConnection,
        finishDrawingConnection: finishDrawingConnection,
        connectionPointMouseLeave: connectionPointMouseLeave,
        connectionPointMouseOut: connectionPointMouseOut,
        connectionPointMouseMove: connectionPointMouseMove,
        connectionPointMouseEnter: connectionPointMouseEnter,
        connectionPointMouseOver:connectionPointMouseOver
    }

    return CognitiveNodeEventService;
})
