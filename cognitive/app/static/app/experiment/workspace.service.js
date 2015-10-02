(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory("CognitiveWorkspaceService", CognitiveWorkspaceService);

    function CognitiveWorkspaceService(
        $http, $sessionStorage) {

        var CognitiveWorkspaceService = {}
        var workspaces = [
            //{
            //    id: 1, name: "Workspace 1",
            //    nodes: [
            //    ],
            //    edges: [{id:1, to:1, from:2}],
            //    active: false},
            //{
            //    id: 2, name: "Workspace 2",
            //    nodes: [
            //        {id:2, workspace_id:2, name:"testname", type:"input_data", x: 300, y: 200, focus: false, mouse:""},
            //        {id:3, workspace_id:2, name:"testname", type:"input_data", x: 50, y: 200, focus: false, mouse:""}
            //    ],
            //    edges: [],
            //    active: false},
            //{
            //    id: 3, name: "Workspace 3",
            //    nodes: [],
            //    edges: [],
            //    active: false
            //}
        ];

        var getWorkspaces = function() {return workspaces;}

        var pushWorkspace = function(workspace) {workspaces.push(workspace);}

        var getCurrentWorkspace = function () {
            return workspaces.filter(function (workspace) {
                return workspace.active;
            })[0];
        };

        var currentWorkspace = function () {
            return getCurrentWorkspace();
        };

        //var appendNode = function (id, name, type) {
        var appendNode = function (id, definition) {
            var workspace = getCurrentWorkspace();
            var xy = nextNodeCoordination()
            workspace.nodes.push({
                id: id, workspace_id: workspace.id,
                name: definition.name, type: definition.type, x: xy[0], y: xy[1],
                focus: false, mouse: ""});
        }

        var nextNodeCoordination = function () {
            var x = $('.detail').width() + (Math.random() * 300) - 300;
            var y = 50 + (Math.random() * 400);
            if (x > window.innerWidth - 350) {x = window.innerWidth - 500;}
            if (y > window.innerHeight) { y = window.innerHeight - 300;}
            return [x, y];
        }

        var getTopology = function () {
            var workspace = getCurrentWorkspace()
            var start_node = workspace.nodes.filter(function(node) {
                return node.type === "file_input";
            })[0]
            var topology = ""
            if (typeof start_node === "undefined") return "";
            var s = start_node.id

            while (true) {
                var edge = workspace.edges.filter(function (edge) {
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

        var getCurrentFocusNode = function() {
            var workspace = getCurrentWorkspace();
            var nodes =  workspace.nodes
                .filter(function (node) {return node.focus;});
            return nodes[0];
        }

        var getCurrentFocus = function () {
            return getCurrentFocusNode();
        }

        var createEdge = function (workspace_id, src_node_id, dest_node_id) {
            var workspace = getWorkspaceById(workspace_id);
            workspace.edges.push({id: 10, workspace_id: workspace_id, from: src_node_id, to: dest_node_id});
        }

        var appendEdgeOnCurrentWorkspace = function (src_node_id, dest_node_id) {
            var workspace = getCurrentWorkspace();
            return createEdge(workspace.id, src_node_id, dest_node_id);
        }

        var getNodeByWorkspaceAndIndex = function (workspace_id, index) {
            var nodes = getWorkspaceById(workspace_id).nodes;

            return nodes.filter(function (node) {
                return node.id == index;
            })[0];
        };

        var getWorkspaceById = function (workspace_id) {
            return workspaces.filter(function (workspace) {
                return workspace.id === workspace_id;
            })[0];
        }

        var getEdgesOfNode = function (node_id) {
            var edges = getCurrentWorkspace().edges;
            return edges.filter(function (edge) {
                return edge.to === node_id || edge.from === node_id;
            });
        }

        var removeNode = function (node_id, user) {
            console.log(workspaces)
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

        CognitiveWorkspaceService = {
            getWorkspaces: getWorkspaces,
            pushWorkspace: pushWorkspace,
            getCurrentWorkspace: getCurrentWorkspace,
            currentWorkspace: currentWorkspace,
            appendNode: appendNode,
            nextNodeCoordination: nextNodeCoordination,
            getTopology: getTopology,
            getCurrentFocusNode: getCurrentFocusNode,
            getCurrentFocus: getCurrentFocus,
            getNodeByWorkspaceAndIndex: getNodeByWorkspaceAndIndex,
            createEdge: createEdge,
            appendEdgeOnCurrentWorkspace: appendEdgeOnCurrentWorkspace,
            removeNode: removeNode,
            getEdgesOfNode: getEdgesOfNode
        }

        return CognitiveWorkspaceService;
    };
})();
