(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .directive('cognitiveEdge', cognitiveEdge);
  function cognitiveEdge($compile) {
    return {
      restrict: 'AEC',
      replace: 'true',
      link: function(scope, element) {
        d3.select(element[0]).append("line")
          .attr('ng-attr-x1', '{{vm.getNodeByIndex(edge.from).x + 90}}')
          .attr('ng-attr-y1', '{{vm.getNodeByIndex(edge.from).y + 43}}')
          .attr('ng-attr-x2', '{{vm.getNodeByIndex(edge.to).x + 90}}')
          .attr('ng-attr-y2', '{{vm.getNodeByIndex(edge.to).y}}')
          .attr('stroke', 'gray')
          .attr('stroke-width', 2);
        element.removeAttr("cognitive-edge");
        $compile(element)(scope);
      }
    };
  };
})();
