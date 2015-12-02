(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .controller('ExperimentController', ExperimentController);

  function ExperimentController (
    $scope, $location, $modal, $http, $mdDialog, $mdToast, UserService,
    WorkflowService, CognitiveComponentService, ExperimentsService,
    WhiteboardService, FileInputService) {

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

    vm.showComponentCreationDialog = function(ev, index) {
      $mdDialog.show({
        templateUrl: CognitiveComponentService.getCognitiveComponents()[index].template,
        locals: {user: vm.user},
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function(result) {
        WhiteboardService.appendNode(result.data.id, result.definition);
      }, function() {});
    };

    vm.clickNone = function () {
      WhiteboardService.clickBackground()
    };

    function focusedNode() {
      var node = vm.experiment.nodes.filter(
        function (node) { return node.focus; });
      if (node.length == 0) { return null; }
      return node[0];
    };

    vm.isActiveNode = function (index) {
      var focused_node = focusedNode()
      if (focused_node == null) return false;
      return focused_node.id == index;
    };

    vm.clickNode = function (event, index) {
      event.stopPropagation();
      var node = WhiteboardService.getNodeByIndex(index);
      if (node.focus) {
        node.focus = false;
        return;
      }

      var current_focus_node = focusedNode();

      if (current_focus_node != null) {
        current_focus_node.focus = false;
      }

      node.focus = true;
    };

    vm.getNodeByIndex = function (index) {
      return WhiteboardService.getNodeByIndex(index);
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
            $mdToast.show($mdToast.simple()
              .content('Error: No Input data or RUN is not executed')
              .position($scope.getToastPosition())
              .hideDelay(3000)
            );
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

    initialize();
  };

})();
