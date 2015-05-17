(function () {
    "use strict";
    angular.module("cognitive")
        .directive('cognitiveEdge', cognitiveEdge);
    function cognitiveEdge($compile) {
        return {
            restrict: 'AEC',
            replace: 'true',
            link: function(scope, element, attrs) {
                d3.select(element[0]).append("line")
                    .attr('x1', '{{getNodeByWorkspaceAndIndex(workspace.id, edge.from).x + 90}}')
                    .attr('y1', '{{getNodeByWorkspaceAndIndex(workspace.id, edge.from).y + 43}}')
                    .attr('x2', '{{getNodeByWorkspaceAndIndex(workspace.id, edge.to).x + 90}}')
                    .attr('y2', '{{getNodeByWorkspaceAndIndex(workspace.id, edge.to).y}}')
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 2);
                element.removeAttr("cognitive-edge");
                $compile(element)(scope);
            }
        };
    };
})();
