(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller("ProjectionController", ProjectionController);

  function ProjectionController(
    UserService, WhiteboardService,
    ProjectionService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.targets = [0];

    vm.createNode = function() {
      var targets = "[" + vm.targets.toString() + "]";
      ProjectionService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
        component_id: targets
      }).then(function (response) {
        WhiteboardService.appendNode(
          response.id, ProjectionService.definition)
      });
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
