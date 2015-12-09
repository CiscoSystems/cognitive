(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory("WhiteboardService", WhiteboardService);

  function WhiteboardService($resource, $http, UserService) {
    var WhiteboardService = {}

    WhiteboardService.experiment = {
      nodes: [],
      edges: []
    };

    WhiteboardService.dataFields = []

    var appendNode = function (id, definition) {
      var xy = nextNodeCoordination()
      if (typeof (WhiteboardService.experiment.nodes) == 'undefined') {
        WhiteboardService.experiment['nodes'] = [];
      }

      WhiteboardService.experiment.nodes.push({
        id: id,
        name: definition.name,
        type: definition.type,
        x: xy[0], y: xy[1],
        focus: false,
        mouse: ''
      });
    }

    var nextNodeCoordination = function () {
      var x = (Math.random() * 300) + 280;
      var y = 50 + (Math.random() * 400);
      if (x > window.innerWidth - 350) {x = window.innerWidth - 500;}
      if (y > window.innerHeight) { y = window.innerHeight - 300;}
      return [x, y];
    }

    var getTopology = function () {
      var experiment = WhiteboardService.experiment;
      var start_node = experiment.nodes.filter(function(node) {
        return node.type === "file_input";
      })[0]
      var topology = ""
      if (typeof start_node === "undefined") return "";
      var s = start_node.id

      while (true) {
        var edge = experiment.edges.filter(function (edge) {
          return edge.from == s;
        })
        if (edge.length == 0) break;
        topology += edge[0].from + ":" + edge[0].to + ",";
        s = edge[0].to;
      }
      if (topology === "") return start_node.id.toString();
      topology = topology.substr(0, topology.length - 1);
      return topology;
    }

    var getFocusedNode = function() {
      var nodes = WhiteboardService.experiment.nodes
        .filter(function (node) {return node.focus;});
      return nodes[0];
    }

    var createEdge = function (srcNodeId, destNodeId) {
      WhiteboardService.experiment.edges.push({
        from: srcNodeId,
        to: destNodeId
      });
    }

    var getNodeByIndex = function (index) {
      return WhiteboardService.experiment.nodes.filter(function (node) {
        return node.id == index;
      })[0];
    };

    var removeNode = function (node_id) {
      var user = UserService.getCurrentUser();
      var experiment = WhiteboardService.experiment;
      var nodes = experiment.nodes;
      var edges = experiment.edges;
      var node_type;

      for (var i = 0; i < edges.length; ++i) {
        if (edges[i].to === node_id || edges[i].from === node_id) {
          edges.splice(i, 1);
        }
      }

      for (var j = 0; j < nodes.length; ++j) {
        if (nodes[j].id === node_id) {
          node_type = nodes[j].type;
          nodes.splice(j, 1);
          break;
        }
      }

      $http.delete('/api/v1/operations/' + node_type + '/' + node_id, {
        user_id: user.id,
        token: user.token
      }).success(function (data, status, headers, config) {
        console.log(data);
      });
    }

    var clickBackground = function () {
      _.each(WhiteboardService.experiment.nodes, function (node) {
        node.focus = false;
      })
    }

    var setDataFields = function (fields) {
      WhiteboardService.dataFields = fields
    }

    var getDataFields = function (fields) {
      return WhiteboardService.dataFields;
    }

    WhiteboardService = {
      appendNode: appendNode,
      nextNodeCoordination: nextNodeCoordination,
      getTopology: getTopology,
      getFocusedNode: getFocusedNode,
      getNodeByIndex: getNodeByIndex,
      createEdge: createEdge,
      removeNode: removeNode,
      clickBackground: clickBackground,
      setDataFields: setDataFields,
      getDataFields: getDataFields,
    }

    return WhiteboardService;
  };
})();
