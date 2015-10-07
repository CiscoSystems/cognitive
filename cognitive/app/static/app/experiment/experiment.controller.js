(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .controller('ExperimentController', ExperimentController);

  function ExperimentController (
    $scope, $location, $modal, $log, $http, $mdDialog, $mdToast, UserService,
    CognitiveComponentService, CognitiveWorkspaceService, FileInputService, MessageService) {

    var vm = this;
    vm.components = CognitiveComponentService.getCognitiveComponents();
    vm.detail_template_url = '';
    vm.toggled_menu_idx = -1;
    vm.workspaces = CognitiveWorkspaceService.getWorkspaces();

    function initialize() {
      vm.experimentId = $location.search()['id'];
      vm.user = UserService.getCurrentUser();

      if (typeof (vm.experimentId) == 'string') {
        $http.get('/api/v1/experiments/' + vm.experimentId)
          .success(function(data,status, headers, config){
            vm.workspaces.push({
              id: data.id,
              name: data.name,
              nodes:[],
              edges: [],
              active: true
            });
        })
        return;
      }

      if (vm.workspaces.length === 0) {
        // Make default workspace
        console.log(vm.user.id, vm.user.token)
        $http.post("/api/v1/experiments/", {
          name: "default",
          user: vm.user.id,
          token: vm.user.token
        }).success(function (data, status, headers, config) {
          console.log(data)
          vm.workspaces.push({
            id: data.id,
            name: data.name,
            nodes:[],
            edges: [],
            active: true
          });
        });
      }
    };

    vm.appendCognitiveNode = function (id, name, type, x, y) {
      var workspace = vm.currentWorkspace();
      x = parseInt(x);
      y = parseInt(y);
      workspace.nodes.push({
        id: id, workspace_id: workspace.id,
        name: name, type: type, x: x, y: y,
        focus: false, mouse: ""
      });
    }

    vm.currentWorkspace = function () {
      return CognitiveWorkspaceService.getCurrentWorkspace();
    };

    vm.getCurrentFocusNode = function () {
      return CognitiveWorkspaceService.getCurrentFocusNode();
    }

    vm.createEdge = function (workspace_id, src_node_id, dest_node_id) {
      CognitiveWorkspaceService.getCurrentFocusNode();
      $scope.$apply();
    }

    vm.appendEdgeOnCurrentWorkspace = function (src_node_id, dest_node_id) {
      return CognitiveWorkspaceService.appendEdgeOnCurrentWorkspace(src_node_id, dest_node_id);
    }

    vm.focusNode = {};

    vm.isActivated = function (index) {
      return index === vm.toggled_menu_idx;
    };

    vm.add = function () {
      vm.contacts.push(vm.contact);
      vm.contact = "";
    };

    vm.showComponentCreationDialog = function(ev, index) {
      $mdDialog.show({
        controller: ComponentCreationDialogController,
        templateUrl: CognitiveComponentService.getCognitiveComponents()[index].template,
        locals: {user: vm.user},
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
          console.log(answer);
        }, function() {
          console.log("some error");
      });
    };

    vm.clickNone = function () {
      var current_node = vm.getCurrentFocusNode()
      if (typeof current_node !== "undefined") {
        current_node.focus = false;
      }
    };

    vm.existFocusedNodeOnCurrentWorkspace = function () {
        var workspace = vm.currentWorkspace();
        return findFocusedNodeByWorkspace(workspace.id) !== null;
    };

    function findFocusedNodeByWorkspace(workspace_id) {
      var workspace = vm.workspaces.filter(function (workspace) {
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

    vm.isActiveCognitiveNode = function (workspace_id, index) {
        return vm.getNodeByWorkspaceAndIndex(workspace_id, index).focus;
    };

    vm.clickCognitiveNode = function (event, workspace_id, index) {
      event.stopPropagation();
      var node = vm.getNodeByWorkspaceAndIndex(workspace_id, index);
      if (node.focus) {
        node.focus = false;
        //vm.closeRightMenu();
        return;
      }

      var current_focus_node = findFocusedNodeByWorkspace(workspace_id);

      if (current_focus_node === null) {
        //vm.openRightMenu();
      } else {
        current_focus_node.focus = false;
      }

      node.focus = true;
    };

    vm.getNodeByWorkspaceAndIndex = function (workspace_id, index) {
      return CognitiveWorkspaceService.getNodeByWorkspaceAndIndex(workspace_id, index);
    };

    vm.mouseDownCognitiveNode = function (event, workspace_id, idx) {
      vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "down";
    };

    vm.mouseMoveCognitiveNode = function (event, workspace_id, idx) {
      switch (vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
        case "down":
          vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "drag";
          break;
        case "drag":
          vm.getNodeByWorkspaceAndIndex(workspace_id, idx).x = event.offsetX - 70;
          vm.getNodeByWorkspaceAndIndex(workspace_id, idx).y = event.offsetY - 15;
          break;
      }
    };

    vm.mouseUpCognitiveNode = function (event, workspace_id, idx) {
      switch (vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
        case "drag":
          break;
        case "down":
          break;
      }
      vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "";
    };

    vm.mouseLeaveCognitiveNode = function (event, workspace_id, idx) {
      switch (vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse) {
        case "drag":
          vm.getNodeByWorkspaceAndIndex(workspace_id, idx).mouse = "";
          break;
      }
    }

    vm.run = function () {
      var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
      var topology = CognitiveWorkspaceService.getTopology();

      if (topology === "") {
        $mdToast.show(
          $mdToast.simple()
            .content('Error: InputSource must do exist')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
        return;
      }

      $http.post("/api/v1/workflows/", {
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: workspace.id,
        graph_data: topology
      }).success(function (data, status, headers, config) {
        console.log(data);
      })
    };

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
      }

    vm.show = function () {
      var focused_node = CognitiveWorkspaceService.getCurrentFocus()
      if (focused_node == null) {
        console.log("testtest")
        $mdToast.show(
          $mdToast.simple()
            .content('Error: A target component must be selected')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
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
            templateUrl: '/static/app/experiment/result_modal.html',
            controller: 'ResultModalController',
            controllerAs: 'vm',
            size: '',
            windowClass: 'cognitive-modal-window',
            resolve: {
              data: function () {
                return data;
              }
            }
          });
        })
    };

    vm.save = function () {
      console.log("workspace save has not been implemented yet")
    };

    vm.open = function() {
      var modal_instance = $modal.open({
        animation: true,
        templateUrl: '/static/app/experiment/workspace_modal.html',
        controller: 'WorkspaceModalController',
        controllerAs: 'vm',
        size: '',
        resolve: {
          current_user: function(){
            return vm.user;
          }
        }
      });

      modal_instance.result.then(function (res) {
        switch (res.action) {
          case "create":
            vm.workspaces.push({
              id: res.whiteboard.id, name: res.whiteboard.name, nodes:[], edges: [], active: true
            });

            break;
          case "open":
            vm.workspaces.push({
              id: res.whiteboard.id, name: res.whiteboard.name, nodes:[], edges: [], active: true
            });
            break;
          default:
            break;
        }
      });
    };

    initialize();
  };

  angular.module('cognitive.experiment')
    .controller('ComponentCreationDialogController', ComponentCreationDialogController);

  function ComponentCreationDialogController($scope, $mdDialog, user) {
    var vm = this;
    $scope.user = user;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  };

})();
