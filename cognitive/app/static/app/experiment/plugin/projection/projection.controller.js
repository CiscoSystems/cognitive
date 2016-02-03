(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller("ProjectionController", ProjectionController);

  function ProjectionController(
    $location, UserService, ProjectionService, $mdDialog, WhiteboardService) {
    var vm = this;
    vm.experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = WhiteboardService.getDataFields();
    vm.targets = [0];

    vm.createNode = function() {
      var targets = "[" + vm.targets.toString() + "]";
      ProjectionService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        component_id: targets
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: ProjectionService.definition
        });
      });
    };

    vm.addTarget = function () {
      vm.targets.push(0)
    }

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();
