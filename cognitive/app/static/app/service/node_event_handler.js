(function() {
    angular.module("cognitive")
        .factory('CognitiveNodeEventHandlerService', CognitiveNodeEventHandlerService);

    function CognitiveNodeEventHandlerService() {
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

            if (dest.attr("class").match(/input/) == null) {
                var t = src_node_id;
                src_node_id = dest_node_id;
                dest_node_id = t;
            }

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
    };


})();
