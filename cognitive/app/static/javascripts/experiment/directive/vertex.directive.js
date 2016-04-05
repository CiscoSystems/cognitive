(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .directive('vertex', ['vertexUtils', vertex])
    .factory('vertexUtils', vertexUtils)

  function vertex(vertexUtils) {
    return {
      restrict: 'EA',
      scope: {
        clickNode: '&',
        clickCloseButton: '&',
        createEdge: '=',
        node: '=',
        sourcePoint: '=',
        targetPoint: '='
      },
      link: function (scope, element) {
        var g = d3.select(element[0]).append('g')

        scope.clickNode = scope.clickNode || function(){}

        g.attr('class', 'node-group')
          .attr('x', 0).attr('y', 0)
          .on('click', scope.clickNode)
          .call(d3.behavior.drag().on('drag', dragVertex))

        scope.render = function () {
          g.selectAll('g').remove()
          var node_g = g.append('g')

          node_g.append('rect')
            .attr('x', scope.node.x)
            .attr('y', scope.node.y)
            .attr('width', 180)
            .attr('height', 40)
            .attr('class', 'node rect-node')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '3')

          node_g.append('text')
            .attr('x', scope.node.x + 90)
            .attr('y', scope.node.y + 25)
            .attr('fill', 'black')
            .style('stroke-width', 1)
            .style({
              'font-size': '14px',
              'z-index': '9999999'
            })
            .style('text-anchor', 'middle')
            .text(scope.node.name)

          node_g.append('circle')
            .attr('cx', scope.node.x + 90)
            .attr('cy', scope.node.y)
            .attr('r', 5)
            .attr('node', scope.node.id)
            .attr('class', 'connection-point dataIn')
            .attr('fill', 'white')
            .attr('stroke', 'gray')
            .style('stroke-width', 1)
            .on('mouseenter', connectionPointMouseEnter)
            .on('mouseout', connectionPointMouseLeave)
            .call(d3.behavior.drag()
              .on('dragstart', function () {
                d3.event.sourceEvent.stopPropagation()
                scope.sourcePoint = d3.select(this)
              })
              .on('drag', drawingConnection)
              .on('dragend', finishDrawingConnection))


          node_g.append('circle')
            .attr('cx', scope.node.x + 90)
            .attr('cy', scope.node.y + 40)
            .attr('r', 5)
            .attr('node', scope.node.id)
            .attr('class', 'connection-point dataOut')
            .attr('fill', 'white')
            .attr('stroke', 'gray')
            .style('stroke-width', 1)
            .on('mouseenter', connectionPointMouseEnter)
            .on('mouseout', connectionPointMouseLeave)
            .call(d3.behavior.drag()
              .on('dragstart', function () {
                d3.event.sourceEvent.stopPropagation()
                scope.sourcePoint = d3.select(this)
              })
              .on('drag', drawingConnection)
              .on('dragend', finishDrawingConnection)

          )

          node_g.append('text')
            .attr('x', scope.node.x - 15)
            .attr('y', scope.node.y - 5)
            .attr('font-family', 'FontAwesome')
            .attr('class', 'node close-icon')
            .attr('node', scope.node.id)
            .attr('font-size', '12pt')
            .text('\uf00d') // icon: fa-close
            .on('click', scope.clickCloseButton)
        }

        scope.$watch('node', function () {
          scope.render()
        }, true)

        function finishDrawingConnection() {
          var sourceId = vertexUtils.nodeId(scope.sourcePoint)
          var targetId = vertexUtils.nodeId(scope.targetPoint)

          d3.select('#tempolaryLine').remove()

          // If source node and destination node are the same, just return
          if (sourceId == targetId) return

          // Do not create an edge when the types of connection points (in, out) are the same
          if (vertexUtils.isDataOutPoint(scope.sourcePoint)) {
            if (vertexUtils.isDataInPoint(scope.targetPoint)) {
              scope.createEdge(sourceId, targetId)
            }
          } else if (vertexUtils.isDataOutPoint(scope.targetPoint)) {
            scope.createEdge(targetId, sourceId)
          }
        }

        function dragVertex() {
          d3.event.sourceEvent.stopPropagation()
          var group = d3.select(this)
          scope.$apply(function() {
            scope.node.x += parseInt(group.attr('x')) + parseInt(d3.event.dx)
            scope.node.y += parseInt(group.attr('y')) + parseInt(d3.event.dy)
          })
        }

        function connectionPointMouseLeave() {
          d3.select(this).attr('r', 5).style('fill', '')
          d3.select('.focus').classed('focus', false)
        }

        function connectionPointMouseEnter() {
          d3.select(this)
            .attr('r', 15)
            .style('fill', 'yellow')
            .classed('focus', true)

          scope.$apply(function() { scope.targetPoint = d3.select(this) }.call(this))
        }
      }
    }

    function drawingConnection() {
      d3.select('#tempolaryLine').remove()

      var start = d3.select(this)
      var current_x = d3.event.x
      var current_y = d3.event.y
      var g = d3.select('.temporary-layer')
        .append('g').attr('id', 'tempolaryLine')

      g.append('line')
        .attr('x1', parseInt(start.attr('cx')))
        .attr('y1', parseInt(start.attr('cy')))
        .attr('x2', current_x + 1)
        .attr('y2', current_y + 1)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '2')
    }
  }

  function vertexUtils() {
    return {
      isDataInPoint: function (d3Obj) { return (d3Obj.attr('class')).includes('dataIn') },
      isDataOutPoint: function (d3Obj) { return (d3Obj.attr('class')).includes('dataOut') },
      nodeId: function(d3Obj) { return parseInt(d3Obj.attr('node')) }
    }
  }

})()
