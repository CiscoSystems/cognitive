cognitive.directive('cognitiveNode', function($compile, CognitiveNodeEventHandlerService) {
    return {
        restrict: 'AEC',
        replace: 'true',
        link: function(scope, element, attrs) {
            var g = d3.select(element[0]).append('g')
                .attr('class', 'node-group')
                .attr('ng-class', '{active: isActiveCognitiveNode(workspace.id, node.id)}')
                //.attr('abs_x', '{node.x}')
                //.attr('abs_y', this.y)
                //.attr('x', '{{node.x}}').attr('y', '{{node.y}}')
                //.attr('x', '{{node.x}}').attr('y', '{{node.y}}')
                .attr('x', 0).attr('y', 0)
                .attr('node', '{{node.id}}')
                .attr('id', 'node-group-{{node.id}}')
                .attr('ng-click', "clickCognitiveNode($event, workspace.id, node.id)")
                //.attr('ng-mousedown', "mouseDownCognitiveNode($event, workspace.id, $index)")
                //.attr('ng-mousemove', "mouseMoveCognitiveNode($event, workspace.id, $index)")
                //.attr('ng-mouseup', "mouseUpCognitiveNode($event, workspace.id, $index)")
                //.attr('ng-mouseleave', "mouseLeaveCognitiveNode($event, workspace.id, $index)")
                .call(d3.behavior.drag().on("drag", CognitiveNodeEventHandlerService.dragCognitiveNode))
                //.on("click", function () {_click(this)})
                .on("mouseenter", function() {
                    var id = this.id.split("-")[2];
                    $("#close-icon-id-" + 1).css("display", "block");
                    $("#edit-icon-id-" + 1).css("display", "block");})
                .on("mouseover", function () {
                });

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
                .on('mouseenter', CognitiveNodeEventHandlerService.connectionPointMouseEnter)
                .on('mouseover', CognitiveNodeEventHandlerService.connectionPointMouseOver)
                .on('mousemove', CognitiveNodeEventHandlerService.connectionPointMouseMove)
                .on('mouseleave', CognitiveNodeEventHandlerService.connectionPointMouseLeave)
                .on('mouseout', CognitiveNodeEventHandlerService.connectionPointMouseOut)
                .call(d3.behavior.drag()
                    .on("dragstart", CognitiveNodeEventHandlerService.prepareDrawingConnection)
                    .on("drag", CognitiveNodeEventHandlerService.drawingConnection)
                    .on("dragend", CognitiveNodeEventHandlerService.finishDrawingConnection));

            g.append('circle')
                .attr('cx', '{{node.x + 90}}')
                .attr('cy', '{{node.y + 40}}')
                .attr('r', 5 )
                .attr('node', '{{node.id}}')
                .attr("class", "cognitive-node-output-circle")
                .attr('fill', 'white')
                .attr('stroke', 'gray')
                .style('stroke-width', 1)
                .on('mouseenter', CognitiveNodeEventHandlerService.connectionPointMouseEnter)
                .on('mouseover', CognitiveNodeEventHandlerService.connectionPointMouseOver)
                .on('mousemove', CognitiveNodeEventHandlerService.connectionPointMouseMove)
                .on('mouseleave', CognitiveNodeEventHandlerService.connectionPointMouseLeave)
                .on('mouseout', CognitiveNodeEventHandlerService.connectionPointMouseOut)
                .call(d3.behavior.drag()
                    .on("dragstart", CognitiveNodeEventHandlerService.prepareDrawingConnection)
                    .on("drag", CognitiveNodeEventHandlerService.drawingConnection)
                    .on("dragend", CognitiveNodeEventHandlerService.finishDrawingConnection));

            element.removeAttr("cognitive-node");
            $compile(element)(scope);
        }
    };
});
