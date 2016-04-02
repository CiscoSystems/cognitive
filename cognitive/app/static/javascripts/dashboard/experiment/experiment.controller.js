(function(){
  'use strict'

  angular.module('cognitive.dashboard')
    .controller('DashboardExperimentController', DashboardExperimentController)

  function DashboardExperimentController(
    $state, $mdDialog, UserService, ExperimentsService) {
    var vm = this

    vm.experiments = []
    vm.selectedExperiments = []
    vm.statusChartData = []
    vm.statusChartOptions = {
      chart: {
        type: 'pieChart',
        height: 300,
        donut: true,
        x: function (d) {
          return d.key
        },
        y: function (d) {
          return d.y
        },
        showLabels: true,

        pie: {
          startAngle: function (d) {
            return d.startAngle
          },
          endAngle: function (d) {
            return d.endAngle
          }
        },
        duration: 500,
        legend: {
          margin: {
            top: 5,
            right: 70,
            bottom: 5,
            left: 0
          }
        }
      }
    }

    // Default values are for the first look
    vm.statusChartData = [
      {
        key: 'Draft',
        y: 0
      }, {
        key: 'Others',
        y: 0
      }
    ]

    vm.executionHistoryChartData = []
    vm.executionHistoryChartOptions = {
      chart: {
        type: 'historicalBarChart',
        height: 300,
        margin : {
          top: 20,
          right: 20,
          bottom: 65,
          left: 50
        },
        x: function(d){return d[0]},
        y: function(d){return d[1]},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.1f')(d)
        },
        duration: 100,
        xAxis: {
          axisLabel: 'Timestamp',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          },
          rotateLabels: 30,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Created Experiments(n)',
          axisLabelDistance: -10,
          tickFormat: function(d){
            return d3.format(',.1f')(d)
          }
        },
        tooltip: {
          keyFormatter: function(d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    }

    // TODO: Support for Pagination
    vm.experimentQuery = {
      order: '',
      limit: 100,
      page: 1
    }

    function calcStatusChart(experiments) {
      var grouped = _.groupBy(experiments, function(experiment){
        return experiment.status
      })
      vm.statusChartData = []
      for (var key in grouped) {
        vm.statusChartData.push({
          key: key,
          y: grouped[key].length
        })
      }
      if (vm.statusChartData.length == 1) {
        // It has an error when the chart data length eq to 1
        vm.statusChartData.push({
          key: 'others',
          y: 0
        })
      }
    }

    vm.getExperiments = function() {
      vm.loading = ExperimentsService.query(vm.experimentQuery)
      vm.loading.then(function(experiments){
        vm.experiments = experiments

        calcStatusChart(experiments)
        var acm = [], val = []

        experiments.forEach(function(experiment) {
          var date = (Math.floor(Date.parse(experiment.created_time)/1000000)*1000000).toString()
          acm[date] = acm[date]+1 || 1
        })

        Object.keys(acm).forEach(function(k){
          val.push([parseInt(k), acm[k]])
        })


        vm.executionHistoryChartData.push({
          key: 'Quantity',
          bar: true,
          values: val
        })
      })
    }

    vm.getExperiments()

    vm.createExperiment = function(ev) {
      $mdDialog.show({
        controller: ExperimentDialogController,
        templateUrl: '/static/javascripts/dashboard/experiment/experiment_dialog.html',
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function(experimentInfo) {
        var currentUser = UserService.getCurrentUser()
        ExperimentsService.save({
          name: experimentInfo['title'],
          user: currentUser['id'],
          token: currentUser['token']
        }).then(function (experiment) {
          vm.linkToExperiment(experiment)
        })
      })
    }

    vm.editExperiment = function (experiment) {
      var index = vm.experiments.indexOf(experiment)
      if (index < 0) return

      $mdDialog.show({
        controller: ExperimentDialogController,
        templateUrl: '/static/javascripts/dashboard/experiment/experiment_dialog.html',
        clickOutsideToClose: true
      }).then(function(experimentInfo) {
        var currentUser = UserService.getCurrentUser()
        ExperimentsService.update({
          id: experiment.id,
          name: experimentInfo['title'],
          user: currentUser['id'],
          token: currentUser['token']
        }).then(function (data) {
          vm.experiments[index] = data
        })
      })

      ExperimentsService.update(experiment).then(function (data) {
        vm.experiments[index] = data
      })
    }

    vm.deleteExperiment = function (experiment) {
      var index = vm.experiments.indexOf(experiment)
      if (index < 0) return
      $mdDialog.show(
        $mdDialog.confirm()
          .title('Would you like to delete this Experiment?')
          //.content('name: ' + experiment.name)
          .ariaLabel('experiment-removal-confirmation')
          .ok('Remove')
          .cancel('Cancel')
      ).then(function() {
        ExperimentsService.remove(experiment.id)
        vm.experiments.splice(index, 1)
      })
    }

    vm.linkToExperiment = function(experiment) {
      $state.go('experiment', {
        experimentId: experiment['id']
      })
    }
  }

  angular.module('cognitive.dashboard')
    .controller('ExperimentDialogController', ExperimentDialogController)

  function ExperimentDialogController($mdDialog){
    var vm = this
    vm.experimentInfo = {
      title: ''
    }
    vm.cancel = function() { $mdDialog.cancel() }
    vm.close = function() { $mdDialog.cancel() }
    vm.create = function() { $mdDialog.hide(vm.experimentInfo) }
  }

})()
