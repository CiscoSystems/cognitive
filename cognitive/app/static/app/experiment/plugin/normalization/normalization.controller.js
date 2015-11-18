(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('NormalizationController', NormalizationController);

  function NormalizationController (
    UserService, ExperimentService,
    NormalizationService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.component_type = "Column",
    vm.component_id = 0;
    vm.op_type = "";

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      NormalizationService.createNode(
        vm.user.id, experiment_id, vm.user.token,
        vm.component_type, vm.component_id, vm.op_type);
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
        return (typeof(vm.columns) == "object") ? true : false;
      }
  };
})();
