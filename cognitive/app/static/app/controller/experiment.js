(function () {
    'use strict';

    angular.module("cognitive")
        .controller('ExperimentController', ExperimentController);

    function ExperimentController (
        $scope, CognitiveComponentService, CognitiveWorkspaceService, FileInputService) {

        //$scope.file_name= FileInputService.filename;
        //$scope.file_text= FileInputService.filetext;
        //$scope.file_text_array = FileInputService.file_text_array;

        $scope.detail_template_url = ""
        $scope.toggled_menu_idx = -1;
        $scope.workspaces = CognitiveWorkspaceService.getWorkspaces();

        $scope.appendCognitiveNode = function (id, name, type, x, y) {
            var workspace = $scope.currentWorkspace();
            x = parseInt(x);
            y = parseInt(y);
            workspace.nodes.push({
                id: id, workspace_id: workspace.id,
                name: name, type: type, x: x, y: y,
                focus: false, mouse: ""
            });
        }

        $scope.currentWorkspace = function () {
            return $scope.workspaces.filter(function (workspace) {
                return workspace.active;
            })[0];
        };

        $scope.getCurrentFocusNode = function () {
            var workspace = $scope.currentWorkspace();
            var nodes = workspace.nodes
                .filter(function (node) {
                    return node.focus;
                });
            return nodes[0];
        }

        $scope.createEdge = function (workspace_id, src_node_id, dest_node_id) {
            var workspace = $scope.workspaces.filter(function (workspace) {
                return workspace.id == workspace_id;
            })[0];

            workspace.edges.push({id: 10, workspace_id: workspace_id, from: src_node_id, to: dest_node_id});
            $scope.$apply();
        }

        $scope.appendEdgeOnCurrentWorkspace = function (src_node_id, dest_node_id) {
            var workspace = $scope.currentWorkspace();
            $scope.createEdge(workspace.id, src_node_id, dest_node_id);
        }

        $scope.focusNode = {};

        $scope.isActivated = function (index) {
            return index === $scope.toggled_menu_idx;
        };

        $scope.add = function () {
            $scope.contacts.push($scope.contact);
            $scope.contact = "";
        };

        $scope.openDescription = function (index) {
            switch ($scope.toggled_menu_idx) {
                case -1:
                    $scope.detail_template_url = CognitiveComponentService
                        .getCognitiveComponents()[index].template
                    var current_workspace = $scope.currentWorkspace()
                    $scope.toggled_menu_idx = index;
                    $(".left-menu-detail-cognitive")
                        .toggle("slide", {direction: "left"}, 700);
                    $(".root[workspace=" + current_workspace.id + "]")
                        .animate({"left": 430}, 700);
                    break;
                case index:
                    $scope.detail_template_url = CognitiveComponentService
                        .getCognitiveComponents()[index].template
                    $scope.closeDescription();
                    break;
                default :
                    $scope.detail_template_url = CognitiveComponentService
                        .getCognitiveComponents()[index].template
                    $scope.toggled_menu_idx = index;
            }
        };

        $scope.closeDescription = function () {
            if ($scope.toggled_menu_idx === -1) {
                return;
            }
            var current_workspace = $scope.currentWorkspace();
            $scope.toggled_menu_idx = -1;
            $(".left-menu-detail-cognitive")
                .toggle("slide", {direction: "left"}, 700);
            $(".root[workspace=" + current_workspace.id + "]")
                .animate({"left": 0}, 700);
        };

        $scope.clickNone = function () {
            $scope.closeDescription();
            var current_node = $scope.getCurrentFocusNode()
            if (typeof current_node !== "undefined") {
                current_node.focus = false;
            }
        };

        $scope.existFocusedNodeOnCurrentWorkspace = function () {
            var workspace = $scope.currentWorkspace();
            return findFocusedNodeByWorkspace(workspace.id) !== null;
        };

        function findFocusedNodeByWorkspace(workspace_id) {
            var workspace = $scope.workspaces.filter(function (workspace) {
                return workspace.id === workspace_id;
            });
            if (workspace.length === 0) {
                return null;
            }
            var node = workspace[0].nodes.filter(function (node) {
                return node.focus;
            });
            if (node.length == 0) {
                return null;
            }
            return node[0];
        };

        $scope.isActiveCognitiveNode = function (workspace_id, index) {
            return $scope.getNodeByWorkspaceAndIndex(workspace_id, index).focus;
        };

        //$scope.openRightMenu = function() {
        //    $(".whiteboard-right-menu")
        //        .toggle("slide", {direction: "right"}, 300);
        //};
        //
        //$scope.closeRightMenu = function() {
        //    $(".whiteboard-right-menu")
        //        .toggle("slide", {direction: "right"}, 300);
        //};

        $scope.clickCognitiveNode = function (event, workspace_id, index) {
            event.stopPropagation();
            var node = $scope.getNodeByWorkspaceAndIndex(workspace_id, index);
            if (node.focus) {
                node.focus = false;
                //$scope.closeRightMenu();
                return;
            }

            var current_focus_node = findFocusedNodeByWorkspace(workspace_id);

            if (current_focus_node === null) {
                //$scope.openRightMenu();
            } else {
                current_focus_node.focus = false;
            }

            node.focus = true;
        };

        $scope.getNodeByWorkspaceAndIndex = function (workspace_id, index) {
            var nodes = $scope.workspaces
                .filter(function (workspace) {
                    return workspace.id === workspace_id;
                })
                [0].nodes;
            return nodes.filter(function (node) {
                return node.id == index;
            })[0]
        };

        $scope.mouseDownCognitiveNode = function (event, workspace_id, idx) {
            $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "down";
        };

        $scope.mouseMoveCognitiveNode = function (event, workspace_id, idx) {
            switch ($scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
                case "down":
                    $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "drag";
                    break;
                case "drag":
                    $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).x = event.offsetX - 70;
                    $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).y = event.offsetY - 15;
                    break;
            }
        };

        $scope.mouseUpCognitiveNode = function (event, workspace_id, idx) {
            switch ($scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
                case "drag":
                    break;
                case "down":
                    break;
            }
            $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "";
        };

        $scope.mouseLeaveCognitiveNode = function (event, workspace_id, idx) {
            switch ($scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
                case "drag":
                    $scope.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "";
                    break;
            }
        }
    };
})();
