(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('FormulaController', FormulaController);

  function FormulaController (
    UserService, FormulaService, $mdDialog, WhiteboardService) {
    var vm = this;
    vm.experiment_id = WhiteboardService.experiment.id;

    vm.user = UserService.getCurrentUser();
    vm.columns = WhiteboardService.getDataFields();
    vm.formula = "Add"
    vm.target_column = 0;
    vm.constant_number = 0;

    vm.createNode = function() {
      FormulaService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        component_type: "Column",
        component_id: vm.target_column,
        op_type: vm.formula,  // Add or Sub, Mul, Div
        op_constant: vm.constant_number
      }).then(function(response){
        $mdDialog.hide({
          data: response,
          definition: FormulaService.definition
        });
      })
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  }

})();
