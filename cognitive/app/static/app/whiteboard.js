// Will remove these global variables
var file_body = "";
var file_name = "";
var parsed_file = [];


cognitive.controller("WhiteboardMainController", function () {

});


cognitive.controller('ComponentController', function(
    $scope, $location, CognitiveComponentService) {

    $scope.parsed_file = [];
    $scope.file_body = "";
    $scope.file_name = "";
    $scope.components = CognitiveComponentService.getCognitiveComponents();
});


cognitive.controller('MetadataController', function(
    $scope, CognitiveWorkspaceService, MetaDataService) {

    $scope.columns = parsed_file[0];
    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        MetaDataService.createNode($scope.user.id, workspace.id, $scope.user.token);
    };
});


cognitive.controller("WhiteboardTabController", function (
    $scope, $modal, $log, $http) {

    $scope.open = function() {
        var modal_instance = $modal.open({
            animation: true,
            templateUrl: "/static/app/partial/whiteboard/experiment/workspace_modal.html",
            controller: "WhiteboardTabModalController",
            size: "",
            resolve: {
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
        })
    };
});


cognitive.controller("WhiteboardBottomMenuController", function (
    $scope, $modal, $log, $http, CognitiveWorkspaceService) {

    $scope.run = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
        var topology = CognitiveWorkspaceService.getTopology();

        if (topology === "") {
            $("#danger-message")[0].innerHTML = " There are no input source or topology have something wrong.";
            var alert_area = $("#cognitiveAlert");
            var danger = alert_area.find("> #template-alert-danger").clone();
            danger.attr("id", "");
            alert_area.append(danger);
            danger.show();
            //danger.fadeOut(30000);
            return;
        }

        $.ajax({
            url: '/api/v1/workflows/',
            type: "POST", data: {
                user_id: $scope.user.id,
                token: $scope.user.token,
                experiment: workspace.id,
                graph_data: topology
            },
            success: function (result) {
                console.log(result);
            }
        });
    }

    $scope.show = function () {
        var focused_node = CognitiveWorkspaceService.getCurrentFocus()
        if (focused_node == null) { return; }  // will show error message
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace();

        $http.get("/api/v1/results/?experiment=" + workspace.id + "&component_id=" + focused_node.id)
            .success(function (data, status, headers, config) {
                console.log(data)

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
                    templateUrl: 'modal-show',
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
});

cognitive.controller('ResultDisplayModalController', function ($scope, $modalInstance, data) {
    $scope.data = data;

     $scope.cancel = function() {
        $modalInstance.dismiss({
            action: "cancel"
        });
    };
    $scope.isMachineLearningResult = function () {
        return typeof ($scope.data['output']) !== "undefined";
    }
});


cognitive.controller('WhiteboardTabModalController', function (
    $scope, $modalInstance, $http) {

    $scope.user_workspace_list = [];

    $http.get("/api/v1/experiments").success(function (data, status, headers, config) {
        data.forEach(function(datum) {
            $scope.user_workspace_list.push({id: datum.id, name: datum.name});
        })
    });

    $scope.create_whiteboard = function() {
        $http.post("/api/v1/experiments/", {
            name: $scope.create_name, user: 1, token: "aaaa"
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
});
