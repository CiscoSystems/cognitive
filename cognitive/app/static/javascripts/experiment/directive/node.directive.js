(function () {
  'use strict'
  angular.module('cognitive.experiment')
    .directive('cognitiveNode', cognitiveNode)

  function cognitiveNode() {
    return {
      restrict: 'EA',
      replace: false,
      scope: {
        clickNode: '&',
        clickCloseButton: '&',
        createEdge: '=',
        node: '='
      },
      link: function (scope, element) {
        var g = d3.select(element[0]).append('g')
        g.attr('class', 'node-group')
          .attr('x', 0).attr('y', 0)
          .call(d3.behavior.drag()
            .on('dragstart', function () {
              d3.event.sourceEvent.stopPropagation()
            })
            .on('drag', dragCognitiveNode))
          .on('mouseenter', function () {
            $('#close-icon-id-' + 1).css('display', 'block')
            $('#edit-icon-id-' + 1).css('display', 'block')
          })
          .on('click', scope.clickNode)

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
            .attr('class', 'node-in')
            .attr('fill', 'white')
            .attr('stroke', 'gray')
            .style('stroke-width', 1)
            .on('mouseenter', connectionPointMouseEnter)
            .on('mouseleave', connectionPointMouseLeave)
            .call(d3.behavior.drag()
              .on('dragstart', function () {
                d3.event.sourceEvent.stopPropagation()
              })
              .on('drag', drawingConnection)
              .on('dragend', finishDrawingConnection))

          node_g.append('circle')
            .attr('cx', scope.node.x + 90)
            .attr('cy', scope.node.y + 40)
            .attr('r', 5)
            .attr('node', scope.node.id)
            .attr('class', 'node-out')
            .attr('fill', 'white')
            .attr('stroke', 'gray')
            .style('stroke-width', 1)
            .on('mouseenter', connectionPointMouseEnter)
            .on('mouseleave', connectionPointMouseLeave)
            .call(d3.behavior.drag()
              .on('dragstart', function () {
                d3.event.sourceEvent.stopPropagation()
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
          $('#tempolaryLine').remove()
          var dest = $('.focus')

          if (dest.length !== 1) {
            d3.select(this).classed('src', false)
            return
          }

          dest = d3.select(dest[0])

          var srcNodeId = d3.select(this).attr('node')
          var destNodeId = dest.attr('node')

          if (dest.attr('class').match(/node-in/) == null) {
            srcNodeId = [destNodeId, destNodeId = srcNodeId][0]
          }

          scope.createEdge(srcNodeId, destNodeId)
          d3.select(this).classed('src', false)
        }
      }
    }

    function dragCognitiveNode() {
      d3.event.sourceEvent.stopPropagation()
      event.stopPropagation()
      event.preventDefault()

      var group = d3.select(this)
      var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx)
      var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy)
      var scope = angular.element(this).scope()

      scope.node.x += sx
      scope.node.y += sy
      scope.$apply()
    }

    function drawingConnection() {
      $('#tempolaryLine').remove()
      var start = d3.select(this)
      var current_x = d3.event.x
      var current_y = d3.event.y
      var g = d3.select($('.layer-3')[0])
        .append('g').attr('id', 'tempolaryLine')

      g.append('line')
        .attr('x1', parseInt(start.attr('cx')))
        .attr('y1', parseInt(start.attr('cy')))
        .attr('x2', current_x + 1)
        .attr('y2', current_y + 1)
        .attr('stroke', 'steelblue').attr('stroke-width', '2')
    }

    function connectionPointMouseLeave() {
      d3.select(this).attr('r', 5).style('fill', '')
      d3.select($('.focus')[0]).classed('focus', false)
    }

    function connectionPointMouseEnter() {
      d3.select(this)
        .attr('r', 13).classed('focus', true)
        .style('fill', 'yellow')
    }
  }

})()
