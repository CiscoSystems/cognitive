cognitive.factory('CognitiveWorkspaceService', function(
    $http, $sessionStorage) {

    var CognitiveWorkspaceService = {}
    var workspaces = [
        //{
        //    id: 1, name: "Workspace 1",
        //    nodes: [
        //    ],
        //    edges: [],
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

    var getCurrentWorkspace = function () {
        return workspaces.filter(function (workspace) {
            return workspace.active;
        })[0];
    };

    var appendNode = function (id, name, type) {
        var workspace = getCurrentWorkspace();
        var xy = nextNodeCoordination()
        workspace.nodes.push({
            id: id, workspace_id: workspace.id,
            name: name, type: type, x: xy[0], y: xy[1],
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
            return node.type === "Input Data";
        })[0]
        var topology = ""
        if (typeof start_node === "undefined") return "";
        var s=start_node.id

        while (true) {
            var edge = workspace.edges.filter(function (edge) {
                return edge.from == s;
            })
            if (edge.length == 0) break;
            topology += edge[0].from + ":" + edge[0].to + ",";
            s = edge[0].to;
        }
        if (topology === "") return "";
        topology = topology.substr(0, topology.length - 1);
        return topology;
    }

    var getCurrentFocusNode = function() {
        var workspace = getCurrentWorkspace();
        var nodes =  workspace.nodes
            .filter(function (node) {return node.focus;});
        return nodes[0];
    }


    CognitiveWorkspaceService = {
        getWorkspaces: function() {return workspaces;},
        pushWorkspace: function(workspace) {workspaces.push(workspace);},
        getCurrentWorkspace: getCurrentWorkspace,
        appendNode: appendNode,
        nextNodeCoordination: nextNodeCoordination,
        getTopology: getTopology,
        getCurrentFocus: getCurrentFocusNode
    }

    return CognitiveWorkspaceService;
})