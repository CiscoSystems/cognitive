(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .controller('ExperimentController', ExperimentController)

  function ExperimentController(
    $scope, $location, $modal, $http, $mdDialog, $mdToast, UserService, $mdSidenav,
    WorkflowService, PluginService, ExperimentsService, WhiteboardService) {

    var vm = this
    vm.loading = false
    vm.pluginList = []
    vm.rightNavTemplateUrl = ''
    vm.experiment = {nodes: [], edges: []}

    function initialize() {
      vm.pluginList = PluginService.getPluginList()
      vm.experimentId = $location.search()['id']
      vm.user = UserService.getCurrentUser()

      if (typeof (vm.experimentId) == 'string') {
        ExperimentsService.get(vm.experimentId).then(
          function (experiment) {
            vm.experiment = experiment
            vm.experiment['nodes'] = []
            vm.experiment['edges'] = []
          })
      }
    }

    vm.showComponentCreationDialog = function (ev, key) {
      var scope = $scope.$new()
      scope.pluginKey = key
      scope.experimentId = vm.experimentId

      $mdDialog.show({
        templateUrl: 'static/app/experiment/plugin/plugin_form.html',
        scope: scope,
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function (result) {
        var xy = WhiteboardService.nextNodeCoordination()
        vm.experiment.nodes.push({
          id: result.data.id,
          name: result.definition.name,
          type: result.definition.type,
          x: xy[0], y: xy[1],
          focus: false,
          mouse: ''
        })
      })
    }

    function focusedNode() {
      return vm.experiment['nodes'].find(function (node) {
        return node.focus
      })
    }

    vm.isActiveNode = function (index) {
      return vm.experiment.nodes[index].focus
    }

    vm.clickNone = function () {
      vm.experiment['nodes'].forEach(function (node) {
        if (node.focus) { node.focus = false }
      })
    }

    vm.clickNode = function (nodeIndex) {
      event.stopPropagation()

      if (vm.experiment.nodes[nodeIndex].focus) {
        $scope.$apply(function () {
          vm.experiment.nodes[nodeIndex].focus = false
        })
        return
      }

      var currentActiveNode = focusedNode()

      if (currentActiveNode != null) {
        currentActiveNode.focus = false
      }

      $scope.$apply(function () {
        vm.experiment.nodes[nodeIndex].focus = true
      })
    }

    vm.clickCloseButton = function (nodeIndex, nodeId) {
      event.stopPropagation()

      var user = UserService.getCurrentUser(),
        node = vm.experiment.nodes[nodeIndex],
        node_type = node.type

      vm.experiment.edges.forEach(function (edge, i) {
        if (edge.to == nodeId || edge.from == nodeId) {
          vm.experiment.edges.splice(i, 1)
        }
      })

      $http.delete('/api/v1/operations/' + node_type + '/' + nodeId, {
        user_id: user.id, token: user.token
      }).success(function () {
        vm.experiment.nodes.splice(nodeIndex, 1)
      })
    }

    vm.createEdge = function (srcNodeId, destNodeId) {
      vm.experiment.edges.push({
        from: srcNodeId,
        to: destNodeId
      })
    }

    vm.getNodeById = function (index) {
      return vm.experiment['nodes'].find(function (node) {
        return node.id == index
      })
    }

    function getTopology() {
      var start_node = _.find(vm.experiment.nodes, function (node) {
        return node.type == 'file_input'
      })

      if (typeof start_node === 'undefined') return ''

      var topology = ''
      var s = start_node.id

      /* eslint-disable */
      while (true) {
        var edgeList = vm.experiment.edges.filter(function (edge) {
          return edge.from == s
        })
        if (edgeList.length == 0) break
        topology += edgeList[0].from + ':' + edgeList[0].to + ','
        s = edgeList[0].to
      }
      /* eslint-enable */

      if (topology ==='') return start_node.id.toString()
      topology = topology.substr(0, topology.length - 1)
      return topology
    }

    vm.run = function () {
      var workspace = vm.experiment
      var topology = getTopology()

      if (topology ==='') {
        $mdToast.show(
          $mdToast.simple()
            .content('Error: InputSource must do exist')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        )
        return
      }

      vm.loading = true
      WorkflowService.create({
        experiment: {id: workspace.id},
        topology: topology
      }).then(function () {
        vm.loading = false
      })
    }

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    }

    $scope.toastPosition = angular.extend({}, last)
    $scope.getToastPosition = function () {
      sanitizePosition()
      return Object.keys($scope.toastPosition)
        .filter(function (pos) {
          return $scope.toastPosition[pos]
        })
        .join(' ')
    }

    function sanitizePosition() {
      var current = $scope.toastPosition
      if (current.bottom && last.top) current.top = false
      if (current.top && last.bottom) current.bottom = false
      if (current.right && last.left) current.left = false
      if (current.left && last.right) current.right = false
      last = angular.extend({}, current)
    }

    vm.show = function () {
      var focused_node = _.find(vm.experiment.nodes, function (node) { return node.focus })
      if (focused_node == null) {
        $mdToast.show(
          $mdToast.simple()
            .content('Error: A target component must be selected')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        )
        return
      }

      $http.get('/api/v1/results/?experiment=' + vm.experiment.id + '&component_id=' + focused_node.id)
        .success(function (data) {
          if (data.status !== 'success') {
            $mdToast.show($mdToast.simple()
                .content('Error: No Input data or RUN is not executed')
                .position($scope.getToastPosition())
                .hideDelay(3000)
            )
            return
          }

          for (var i = 0; i < data['feature_names'].length; i++) {
            var dataset = data.graph_data[i][1]

            if (d3.max(dataset) == d3.min(dataset)) {
              dataset = [100, 100, 100, 100]
            }

            for (var j = 0; j < dataset.length; j++) {
              if (dataset[j] >= 86) {
                dataset[j] -= 14
              }
            }

            var _t
            if (dataset.length == 3) {
              dataset.push(0)
            } else if (dataset.length == 2) {
              _t = [0]
              _t.push(dataset[0])
              _t.push(0)
              _t.push(dataset[1])
              dataset = _t
            } else if (dataset.length == 1) {
              _t = [0]
              _t.push(dataset[0])
              _t.push(0)
              _t.push(0)
              dataset = _t
            }

            data.graph_data[i][1] = dataset
          }

          $modal.open({
            animation: true,
            templateUrl: '/static/app/experiment/result_modal.html',
            controller: 'ResultModalController',
            controllerAs: 'vm',
            size: '',
            windowClass: 'cognitive-modal-window',
            resolve: {
              data: function () {
                return data
              }
            }
          })
        })
    }

    initialize()
  }

})()
