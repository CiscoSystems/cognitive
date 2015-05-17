// Will remove these global variables
var file_body = "";
var file_name = "";
var parsed_file = [];

(function () {
    "use strict";

    angular.module("cognitive")
        .controller("WhiteboardMainController", WhiteboardMainController)
        .controller('ComponentController', ComponentController)
        .controller('MetadataController', MetadataController)
        .controller("WhiteboardTabController", WhiteboardTabController)
        .controller("WhiteboardBottomMenuController", WhiteboardBottomMenuController)
        .controller('ResultDisplayModalController', ResultDisplayModalController)
        .controller('WhiteboardTabModalController', WhiteboardTabModalController)
        .controller("MessageController", MessageController);

    function WhiteboardMainController(){};

    function ComponentController (
        $scope, $location, CognitiveComponentService) {

        $scope.parsed_file = [];
        $scope.file_body = "";
        $scope.file_name = "";
        $scope.components = CognitiveComponentService.getCognitiveComponents();
    };

    function MetadataController (
        $scope, CognitiveWorkspaceService, MetaDataService) {

        $scope.columns = parsed_file[0];
        $scope.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            MetaDataService.createNode($scope.user.id, workspace.id, $scope.user.token);
        };
    };


    function WhiteboardTabController (
        $scope, $modal, $log, $http) {

        function init() {
            if ($scope.workspaces.length === 0) {
                // Make default workspace
                $http.post("/api/v1/experiments/", {
                    name: "default",
                    user: $scope.user.id,
                    token: $scope.user.token
                }).success(function (data, status, headers, config) {
                    console.log(data)
                    $scope.workspaces.push({
                        id: data.id,
                        name: data.name,
                        nodes:[],
                        edges: [],
                        active: true
                    });
                });
            }
        };

        init();

        $scope.open = function() {
            var modal_instance = $modal.open({
                animation: true,
                templateUrl: "/static/app/partial/whiteboard/experiment/workspace_modal.html",
                controller: "WhiteboardTabModalController",
                size: "",
                resolve: {
                    current_user: function(){
                        return $scope.user;
                    }
                }
            });

            modal_instance.result.then(function (res) {
                switch (res.action) {
                    case "create":
                        $scope.workspaces.push({
                            id: res.whiteboard.id, name: res.whiteboard.name, nodes:[], edges: [], active: true
                        });

                        break;
                    case "open":
                        $scope.workspaces.push({
                            id: res.whiteboard.id, name: res.whiteboard.name, nodes:[], edges: [], active: true
                        });
                        break;
                    default:
                        break;
                }
            });
        };
    };


    function WhiteboardBottomMenuController(
        $scope, $modal, $log, $http, CognitiveWorkspaceService, MessageService) {

        $scope.run = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
            var topology = CognitiveWorkspaceService.getTopology();

            if (topology === "") {
                MessageService.
                    pushDangerMessage("No input source")
                return;
            }

            $http.post("/api/v1/workflows/", {
                user_id: $scope.user.id,
                token: $scope.user.token,
                experiment: workspace.id,
                graph_data: topology
            }).success(function(data, status, headers, config) {
                console.log(data);
            })

        }

        $scope.show = function () {
            var focused_node = CognitiveWorkspaceService.getCurrentFocus()
            if (focused_node == null) {
                MessageService.
                    pushDangerMessage("No component is selected")
                return;
            }
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace();

            $http.get("/api/v1/results/?experiment=" + workspace.id + "&component_id=" + focused_node.id)
                .success(function (data, status, headers, config) {
                    console.log(data)
                    if (data.status !== "success") {
                        MessageService.pushDangerMessage("No Input data or RUN is not executed")
                        return;
                    }

                    for (var i = 0; i < data['feature_names'].length; i++) {
                        var target_area = d3.select("svg[class='graph column_" + i + "']");
                        var dataset = data.graph_data[i][1];

                        if (d3.max(dataset) == d3.min(dataset)) {
                            dataset = [100, 100, 100, 100];
                        }

                        for (var j = 0; j < dataset.length; j++) {
                            if (dataset[j] >= 86) {
                                dataset[j] -= 14;
                            }
                        }

                        if (dataset.length == 3) {
                            dataset.push(0);
                        } else if (dataset.length == 2) {
                            var _t = [0];
                            _t.push(dataset[0]);
                            _t.push(0);
                            _t.push(dataset[1]);
                            dataset = _t;
                        } else if (dataset.length == 1) {
                            var _t = [0];
                            _t.push(dataset[0]);
                            _t.push(0);
                            _t.push(0);
                            dataset = _t;
                        }

                        data.graph_data[i][1] = dataset;
                    }

                    console.log(data.graph_data)

                    var modal_instance = $modal.open({
                        animation: true,
                        templateUrl: '/static/app/partial/whiteboard/experiment/result_modal.html',
                        controller: "ResultDisplayModalController",
                        size: "",
                        windowClass:"cognitive-modal-window",
                        resolve: {
                            data: function(){ return data; }
                        }
                    });
            })
        };

        $scope.save = function () { console.log("workspace save has not been implemented yet") };
    };

    function ResultDisplayModalController($scope, $modalInstance, data) {
        $scope.data = data;

         $scope.cancel = function() {
            $modalInstance.dismiss({
                action: "cancel"
            });
        };
        $scope.isMachineLearningResult = function () {
            return typeof ($scope.data['output']) !== "undefined";
        }
    };

    function WhiteboardTabModalController(
        $scope, $modalInstance, $http, current_user) {

        $scope.user_workspace_list = [];

        $http.get("/api/v1/experiments").success(function (data, status, headers, config) {
            data.forEach(function(datum) {
                $scope.user_workspace_list.push({id: datum.id, name: datum.name});
            })
        });

        $scope.create_whiteboard = function() {
            $http.post("/api/v1/experiments/", {
                name: $scope.create_name, user: current_user.id, token: current_user.token
            }).success(function (data, status, headers, config) {
                $modalInstance.close({
                    action: "create",
                    whiteboard: {
                        id: data.id, name: data.name
                    }
                });
            });
       };

        $scope.open_whiteboard = function() {
            var whiteboard = {id: $scope.saved_whiteboard};

            for (var i in $scope.user_workspace_list){
                if ($scope.user_workspace_list[i].id == $scope.saved_whiteboard) {
                    whiteboard["name"] = $scope.user_workspace_list[i].name;
                }
            }
            $modalInstance.close({
                action: "open",
                whiteboard: whiteboard
            })
        };

        $scope.cancel = function() {
            $modalInstance.dismiss({
                action: "cancel"
            });
        };
    };

    function MessageController($scope, MessageService) {
        $scope.messages = MessageService.getMessages();
        $scope.closeMessage = MessageService.closeMessage;
    }
})()

