(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveDuplicateController', RemoveDuplicateController);

  function RemoveDuplicateController (
    UserService, DuplicateRemovalService, $mdDialog, WhiteboardService) {

    var vm = this;
    vm.experiment_id = WhiteboardService.experiment.id;

    vm.user = UserService.getCurrentUser();
    vm.columns = WhiteboardService.getDataFields();
    vm.targets = [0];

    vm.createNode = function() {
      var targets = "[" + vm.targets.toString() + "]";

      DuplicateRemovalService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
        component_id: targets
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: DuplicateRemovalService.definition
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
