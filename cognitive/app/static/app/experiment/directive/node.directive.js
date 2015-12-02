(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .directive('cognitiveNode', cognitiveNode);

  function cognitiveNode($compile, WhiteboardService) {
    return {
      restrict: 'AEC',
      replace: true,
      link: function(scope, element) {
        var g = d3.select(element[0]).append('g')
          .attr('class', 'node-group')
          .attr('ng-class', '{active: vm.isActiveNode(node.id)}')
          .attr('x', 0).attr('y', 0)
          .attr('node', '{{node.id}}')
          .attr('id', 'node-group-{{node.id}}')
          .attr('ng-click', "vm.clickNode($event, node.id)")
          .call(d3.behavior.drag()
            .on('dragstart', function () {
              d3.event.sourceEvent.stopPropagation();
            })
            .on('drag', dragCognitiveNode)
            .on("dragend", function () {
              d3.event.sourceEvent.stopPropagation();
            })
          )
          .on("mouseenter", function() {
            var id = this.id.split("-")[2];
            $("#close-icon-id-" + 1).css("display", "block");
            $("#edit-icon-id-" + 1).css("display", "block");})
          .on("mouseover", function () {})

        g.append('rect')
          .attr('ng-attr-x', '{{node.x}}')
          .attr('ng-attr-y', '{{node.y}}')
          .attr('width', 180)
          .attr('height', 40)
          .attr('class', "node rect-node")
          .attr('stroke', "steelblue")
          .attr('stroke-width', "3");

        g.append('text')
          .attr('ng-attr-x', '{{node.x + 90}}')
          .attr('ng-attr-y',  '{{node.y + 25}}')
          .attr('fill', 'black')
          .style('stroke-width', 1)
          .style({
            "font-size":"14px",
            "z-index":"9999999"
          })
          .style('text-anchor', "middle")
          .text("{{node.name}}");

        g.append('circle')
          .attr('ng-attr-cx', '{{node.x + 90}}')
          .attr('ng-attr-cy', '{{node.y}}')
          .attr('r', 5)
          .attr('ng-attr-node', '{{node.id}}')
          .attr("class", "node-in")
          .attr('fill', 'white')
          .attr('stroke', 'gray')
          .style('stroke-width', 1)
          .on('mouseenter', connectionPointMouseEnter)
          .on('mouseleave', connectionPointMouseLeave)
          .call(d3.behavior.drag()
            .on("dragstart", function () {
              d3.event.sourceEvent.stopPropagation();
            })
            .on("drag", drawingConnection)
            .on("dragend", finishDrawingConnection));

        g.append('text')
          .attr('ng-attr-x', '{{node.x - 15}}')
          .attr('ng-attr-y', '{{node.y - 5}}')
          .attr('font-family', 'FontAwesome')
          .attr('class', 'node close-icon')
          .attr('node', '{{node.id}}')
          .attr('font-size', '12pt')
          .text('\uf00d') // icon: fa-close
          .on('click', clickCloseIcon);

        g.append('circle')
          .attr('ng-attr-cx', '{{node.x + 90}}')
          .attr('ng-attr-cy', '{{node.y + 40}}')
          .attr('r', 5 )
          .attr('ng-attr-node', '{{node.id}}')
          .attr("class", "node-out")
          .attr('fill', 'white')
          .attr('stroke', 'gray')
          .style('stroke-width', 1)
          .on('mouseenter', connectionPointMouseEnter)
          .on('mouseleave', connectionPointMouseLeave)
          .call(d3.behavior.drag()
            .on("dragstart", function () {
              d3.event.sourceEvent.stopPropagation();
            })
            .on("drag", drawingConnection)
            .on("dragend", finishDrawingConnection)
          );

        element.removeAttr("cognitive-node");
        $compile(element)(scope);
      }
    };

    function clickCloseIcon() {
      d3.event.stopPropagation();
      var close_icon = d3.select(this);
      var node_id = close_icon.attr('node');
      WhiteboardService.removeNode(node_id);
      $('#node-group-'+node_id).parent().remove();
    }

    function dragCognitiveNode() {
      var group = d3.select(this);
      var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
      var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);
      var node_id = d3.select(this).attr('node');
      var scope = angular.element(this).scope();
      var node = WhiteboardService
        .experiment.nodes.filter(function(node){
          return node.id == node_id;
        })[0];
      node.x += sx;
      node.y += sy;
      scope.$apply();
    }

    function drawingConnection() {
      $('#tempolaryLine').remove();
      var start = d3.select(this);
      var current_x = d3.event.x;
      var current_y = d3.event.y;
      var node = $("#node-group-" + start.attr('node'));
      var g= d3.select($(".layer-3")[0])
        .append('g').attr('id', 'tempolaryLine');

      g.append("line")
        .attr('x1', parseInt(start.attr('cx')) + parseInt(node.attr('x')))
        .attr('y1', parseInt(start.attr('cy')) + parseInt(node.attr('y')))
        .attr('x2', current_x + parseInt(node.attr('x')) + 1)
        .attr('y2', current_y + parseInt(node.attr('y')) + 1)
        .attr('stroke', 'steelblue').attr('stroke-width', '2');
    }

    function finishDrawingConnection() {
      $('#tempolaryLine').remove();

      var scope = angular.element(this).scope();
      var dest = $(".focus")

      if (dest.length !== 1) {
        d3.select(this).classed('src', false);
        return;
      }

      dest = d3.select(dest[0]);

      var srcNodeId = d3.select(this).attr('node');
      var destNodeId = dest.attr('node');

      if (dest.attr("class").match(/node-in/) == null){
        srcNodeId = [destNodeId, destNodeId = srcNodeId][0];
      }

      WhiteboardService.createEdge(srcNodeId, destNodeId);
      scope.$apply();

      d3.select(this).classed('src', false);

    }

    function connectionPointMouseLeave() {
      d3.select(this).attr("r", 5).style('fill', '');
      d3.select($('.focus')[0]).classed('focus', false);
    }
    function connectionPointMouseOver() {
      d3.select(this)
        .attr('r', 13).classed('focus', true)
        .style('fill', 'yellow');
    }

    function connectionPointMouseEnter() {
      d3.select(this)
        .attr('r', 13).classed('focus', true)
        .style('fill', 'yellow');
    }
  };

})();
