(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .directive('cognitiveNode', cognitiveNode);

    function cognitiveNode(
        $compile, CognitiveWorkspaceService) {

        return {
            restrict: 'AEC',
            replace: 'true',
            link: function(scope, element, attrs) {
                var g = d3.select(element[0]).append('g')
                    .attr('class', 'node-group')
                    .attr('ng-class', '{active: vm.isActiveCognitiveNode(workspace.id, node.id)}')
                    .attr('x', 0).attr('y', 0)
                    .attr('node', '{{node.id}}')
                    .attr('id', 'node-group-{{node.id}}')
                    .attr('ng-click', "vm.clickCognitiveNode($event, workspace.id, node.id)")
                    .call(d3.behavior.drag()
                        .on("drag", dragCognitiveNode))
                    .on("mouseenter", function() {
                        var id = this.id.split("-")[2];
                        $("#close-icon-id-" + 1).css("display", "block");
                        $("#edit-icon-id-" + 1).css("display", "block");})
                    .on("mouseover", function () {});

                g.append('rect')
                    .attr('x', '{{node.x}}')
                    .attr('y', '{{node.y}}')
                    .attr('width', 180)
                    .attr('height', 40)
                    .attr('class', "node base-node")
                    .attr('stroke', "steelblue")
                    .attr('stroke-width', "3");

                g.append('text')
                    .attr('x', '{{node.x + 90}}')
                    .attr('y',  '{{node.y + 25}}')
                    .attr('fill', 'black')
                    .style('stroke-width', 1)
                    .style({"font-size":"14px","z-index":"9999999"} )
                    .style('text-anchor', "middle")
                    .text("{{node.name}}");

                g.append('circle')
                    .attr('cx', '{{node.x + 90}}')
                    .attr('cy', '{{node.y}}')
                    .attr('r', 5)
                    .attr('node', '{{node.id}}')
                    .attr("class", "cognitive-node-input-circle")
                    .attr('fill', 'white')
                    .attr('stroke', 'gray')
                    .style('stroke-width', 1)
                    .on('mouseenter', connectionPointMouseEnter)
                    .on('mouseover', connectionPointMouseOver)
                    .on('mousemove', connectionPointMouseMove)
                    .on('mouseleave', connectionPointMouseLeave)
                    .on('mouseout', connectionPointMouseOut)
                    .call(d3.behavior.drag()
                        .on("dragstart", prepareDrawingConnection)
                        .on("drag", drawingConnection)
                        .on("dragend", finishDrawingConnection));

                g.append('text')
                    .attr('x', '{{node.x - 15}}')
                    .attr('y', '{{node.y - 5}}')
                    .attr('font-family', 'FontAwesome')
                    .attr('class', 'node close-icon')
                    .attr('node', '{{node.id}}')
                    .attr('font-size', '12pt')
                    .text('\uf00d')  // icon: fa-close
                    .on('click', clickCloseIcon);

                g.append('circle')
                    .attr('cx', '{{node.x + 90}}')
                    .attr('cy', '{{node.y + 40}}')
                    .attr('r', 5 )
                    .attr('node', '{{node.id}}')
                    .attr("class", "cognitive-node-output-circle")
                    .attr('fill', 'white')
                    .attr('stroke', 'gray')
                    .style('stroke-width', 1)
                    .on('mouseenter', connectionPointMouseEnter)
                    .on('mouseover', connectionPointMouseOver)
                    .on('mousemove', connectionPointMouseMove)
                    .on('mouseleave', connectionPointMouseLeave)
                    .on('mouseout', connectionPointMouseOut)
                    .call(d3.behavior.drag()
                        .on("dragstart", prepareDrawingConnection)
                        .on("drag", drawingConnection)
                        .on("dragend", finishDrawingConnection));

                element.removeAttr("cognitive-node");
                $compile(element)(scope);
            }
        };

        function clickCloseIcon() {
            d3.event.stopPropagation();
            var scope = angular.element($('.whiteboard-draw-area-wrapper')[0]).scope();
            var close_icon = d3.select(this);
            var node_id = close_icon.attr('node');
            //var edges = CognitiveWorkspaceService.getEdgesOfNode(node_id);
            CognitiveWorkspaceService.removeNode(node_id, scope.user);
            $('#node-group-'+node_id).parent().remove();
            scope.$apply();
        }

        function dragCognitiveNode() {
            var group = d3.select(this);
            var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
            var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);
            var node_id = d3.select(this).attr('node');
            var scope = angular.element(this).scope();
            var workspace = CognitiveWorkspaceService
                .currentWorkspace();
            var cognitive_node = CognitiveWorkspaceService
                .getNodeByWorkspaceAndIndex(workspace.id, node_id);

            cognitive_node.x += sx;
            cognitive_node.y += sy;
            scope.$apply();
        }

        function prepareDrawingConnection(){}

        function drawingConnection() {
            $('.tempolary-line').remove();
            var workspace = CognitiveWorkspaceService.currentWorkspace();
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

        function finishDrawingConnection() {
            $('.tempolary-line').remove();
            var scope = angular.element(this).scope();
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

            CognitiveWorkspaceService.appendEdgeOnCurrentWorkspace(src_node_id, dest_node_id);
            scope.$apply();

            d3.select(this).classed('src', false);

        }

        function connectionPointMouseLeave() {
            d3.select(this).attr("r", 5).style('fill', '');
            d3.select($('.focus')[0]).classed('focus', false);
        }

        function connectionPointMouseOut() {}

        function connectionPointMouseMove() {}

        function connectionPointMouseEnter(){}

        function connectionPointMouseOver() {
            d3.select(this)
                .attr('r', 10).classed('focus', true)
                .style('fill', 'yellow');
        }
    };
})();
