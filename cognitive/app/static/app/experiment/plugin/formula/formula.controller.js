(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('FormulaController', FormulaController);

  function FormulaController (
    UserService, ExperimentService,
    FormulaService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];

    vm.user = UserService.getCurrentUser();

    vm.columns = parsed_file[0];
    vm.formula = "Add"
    vm.target_column = 0;
    vm.constant_number = 0;



    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      FormulaService.createNode(
        vm.user.id, experiment_id, vm.user.token,
        vm.formula, vm.target_column, vm.constant_number
      );
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  }

})();
