(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('FormulaController', FormulaController);

  function FormulaController (
    UserService, WhiteboardService,
    FormulaService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];

    vm.user = UserService.getCurrentUser();

    vm.columns = parsed_file[0];
    vm.formula = "Add"
    vm.target_column = 0;
    vm.constant_number = 0;

    vm.createNode = function() {

      FormulaService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
        component_type: "Column",
        component_id: vm.target_column,
        op_type: vm.formula,  // Add or Sub, Mul, Div
        op_constant: vm.constant_number
      }).then(function(response){
        WhiteboardService.appendNode(
          response.id, FormulaService.definition)
      })

      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  }

})();
