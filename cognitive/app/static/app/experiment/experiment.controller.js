(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .controller('ExperimentController', ExperimentController);

  function ExperimentController (
    $scope, $location, $modal, $http, $mdDialog, $mdToast, UserService,
    WorkflowService, CognitiveComponentService, ExperimentsService,
    WhiteboardService, FileInputService, MessageService) {

    var vm = this;
    vm.loading = false;

    function initialize() {
      vm.components = CognitiveComponentService.getCognitiveComponents();
      vm.experimentId = $location.search()['id'];
      vm.user = UserService.getCurrentUser();

      if (typeof (vm.experimentId) == 'string') {
        ExperimentsService.get(vm.experimentId).then(
          function(experiment){
            WhiteboardService.experiment = experiment;
            WhiteboardService.experiment['nodes'] = [];
            WhiteboardService.experiment['edges'] = [];
            vm.experiment = WhiteboardService.experiment;
        })
      } else {
        console.log('invalid access')
      }
    };

    vm.appendCognitiveNode = function (id, name, type, x, y) {
      //var workspace = vm.experiment;
      var experiment = WhiteboardService.experiment;
      x = parseInt(x);
      y = parseInt(y);
      experiment.nodes.push({
        id: id, workspace_id: experiment.id,
        name: name, type: type, x: x, y: y,
        focus: false, mouse: ""
      });
    }

    vm.getCurrentFocusNode = function () {
      var exp = WhiteboardService.experiment;
      return exp.nodes.filter(function (node) { return node.focus; })[0];
    }

    vm.createEdge = function (workspace_id, src_node_id, dest_node_id) {
      WhiteboardService.getFocusedNode();
      $scope.$apply();
    }

    vm.appendEdgeOnCurrentWorkspace = function (src_node_id, dest_node_id) {
      return WhiteboardService.appendEdgeOnCurrentWorkspace(src_node_id, dest_node_id);
    }

    vm.focusNode = {};

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
      }).then(function(answer) {
        $mdDialog.close()
      }, function() {});
    };

    vm.clickNone = function () {
      var current_node = vm.getCurrentFocusNode()
      if (typeof current_node !== "undefined") {
        current_node.focus = false;
      }
    };

    function focusedNode() {
      var node = vm.experiment.nodes.filter(
        function (node) { return node.focus; });
      if (node.length == 0) { return null; }
      return node[0];
    };

    vm.isActiveCognitiveNode = function (workspace_id, index) {
      var focused_node = focusedNode()
      if (focused_node == null) return false;
      return focused_node.id == index;
    };

    vm.clickCognitiveNode = function (event, workspace_id, index) {
      event.stopPropagation();
      var node = vm.getNodeByWorkspaceAndIndex(workspace_id, index);
      if (node.focus) {
        node.focus = false;
        //vm.closeRightMenu();
        return;
      }

      var current_focus_node = focusedNode();

      if (current_focus_node === null) {
        //vm.openRightMenu();
      } else {
        current_focus_node.focus = false;
      }

      node.focus = true;
    };

    vm.getNodeByWorkspaceAndIndex = function (workspace_id, index) {
      return WhiteboardService.getNodeByWorkspaceAndIndex(workspace_id, index);
    };

    vm.run = function () {
      var workspace = vm.experiment;
      var topology = WhiteboardService.getTopology();

      if (topology === "") {
        $mdToast.show(
          $mdToast.simple()
            .content('Error: InputSource must do exist')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
        return;
      }

      vm.loading = true;
      WorkflowService.create({
        experiment: {id: workspace.id},
        topology: topology
      }).then(function(){
        vm.loading = false;
      });
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
      var focused_node = WhiteboardService.getFocusedNode()
      if (focused_node == null) {
        $mdToast.show(
          $mdToast.simple()
            .content('Error: A target component must be selected')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
        return;
      }
      var workspace = vm.experiment;

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
