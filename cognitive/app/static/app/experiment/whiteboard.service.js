(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory("WhiteboardService", WhiteboardService);

  function WhiteboardService($resource, $http, UserService) {
    var WhiteboardService = {}

    var experiment = {};
    WhiteboardService.experiment = experiment;

    var getCurrentWorkspace = function () {
      if (typeof (WhiteboardService.experiment.nodes) == 'undefined') {
        WhiteboardService.experiment['nodes'] = [];
      }
      if (typeof (WhiteboardService.experiment.edges) == 'undefined') {
        WhiteboardService.experiment['edges'] = [];
      }
      return WhiteboardService.experiment;
    };

    var appendNode = function (id, definition) {
      var workspace = getCurrentWorkspace();
      var xy = nextNodeCoordination()
      if (typeof (WhiteboardService.experiment.nodes) == 'undefined') {
        WhiteboardService.experiment['nodes'] = [];
      }

      WhiteboardService.experiment.nodes.push({
        id: id, workspace_id: workspace.id,
        name: definition.name, type: definition.type, x: xy[0], y: xy[1],
        focus: false, mouse: ''});
    }

    var nextNodeCoordination = function () {
      var x = (Math.random() * 300) - 300;
      var y = 50 + (Math.random() * 400);
      if (x > window.innerWidth - 350) {x = window.innerWidth - 500;}
      if (y > window.innerHeight) { y = window.innerHeight - 300;}
      return [x, y];
    }

    var getTopology = function () {
      var experiment = getCurrentWorkspace()
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
      var workspace = getCurrentWorkspace();
      var nodes = workspace.nodes
        .filter(function (node) {return node.focus;});
      return nodes[0];
    }

    var createEdge = function (workspace_id, src_node_id, dest_node_id) {
      var experiment = getCurrentWorkspace();
      experiment.edges.push({
        workspace_id: workspace_id,
        from: src_node_id,
        to: dest_node_id});
    }

    var appendEdgeOnCurrentWorkspace = function (src_node_id, dest_node_id) {
      var workspace = getCurrentWorkspace();
      return createEdge(workspace.id, src_node_id, dest_node_id);
    }

    var getNodeByWorkspaceAndIndex = function (workspace_id, index) {
      var experiment = getCurrentWorkspace();
      console.log(experiment);

      return experiment.nodes.filter(function (node) {
        return node.id == index;
      })[0];
    };

    var getWorkspaceById = function (workspace_id) {
      return getCurrentWorkspace();
    }

    var getEdgesOfNode = function (node_id) {
        var edges = getCurrentWorkspace().edges;
        return edges.filter(function (edge) {
            return edge.to === node_id || edge.from === node_id;
        });
    }

    var removeNode = function (node_id) {
      var user = UserService.getCurrentUser();

      var workspace = getCurrentWorkspace();
      var nodes = workspace.nodes;
      var edges = workspace.edges;
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

    WhiteboardService = {
      getCurrentWorkspace: getCurrentWorkspace,
      appendNode: appendNode,
      nextNodeCoordination: nextNodeCoordination,
      getTopology: getTopology,
      getFocusedNode: getFocusedNode,
      getNodeByWorkspaceAndIndex: getNodeByWorkspaceAndIndex,
      createEdge: createEdge,
      appendEdgeOnCurrentWorkspace: appendEdgeOnCurrentWorkspace,
      removeNode: removeNode,
      getEdgesOfNode: getEdgesOfNode
    }

    return WhiteboardService;
  };
})();
