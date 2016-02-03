(function () {
  'use strict'

  angular.module('cognitive.whiteboard')
    .controller('WhiteboardController', WhiteboardController)

  function WhiteboardController($mdDialog, UserService, ExperimentsService){

    var vm = this
    vm.experiments = []

    function initialize() {
      ExperimentsService.query().then(
        function(experiments) {
          vm.experiments = experiments
        })
    }

    vm.createExperiment = function(ev) {
      $mdDialog.show({
        controller: ExperimentDialogController,
        templateUrl: '/static/app/whiteboard/experiment_dialog.html',
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function(experimentInfo) {
        var currentUser = UserService.getCurrentUser()

        ExperimentsService.save({
          name: experimentInfo['title'],
          user: currentUser['id'],
          token: currentUser['token']
        }).then(function (data) {
          var experimentId = data['id']
          location.href = '/#/experiment?id=' + experimentId
        })
      })
    }

    vm.editExperiment = function (experiment) {
      var index = vm.experiments.indexOf(experiment)
      if (index < 0) return

      $mdDialog.show({
        controller: ExperimentDialogController,
        templateUrl: '/static/app/whiteboard/experiment_dialog.html',
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

    vm.moveToExperiment = function(index) {
      var experimentId = vm.experiments[index]['id']
      location.href = '/#/experiment?id=' + experimentId
    }

    initialize()
  }

  angular.module('cognitive.whiteboard')
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
