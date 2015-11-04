(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller("ProjectionController", ProjectionController);

  function ProjectionController(
    UserService, ExperimentService,
    ProjectionService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.targets = [0];

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      ProjectionService.createNode(vm.user.id, experiment_id, vm.user.token, vm.targets);
      $mdDialog.cancel();
    };

    vm.addTarget = function () {
      vm.targets.push(0)
    }

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }

  };
})();
