(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('FormulaController', FormulaController);

  function FormulaController ($mdDialog, $location, UserService, FormulaService, WhiteboardService) {
    var vm = this;

    vm.experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = WhiteboardService.getDataFields();
    vm.formula = 'Add'
    vm.target_column = 0;
    vm.constant_number = 0;

    var search = $location.search()
    console.log(search)

    if (search['node']) {
      vm.nodeId = search['node']
      load()
    }

    function load() {
      console.log('testtest')
      FormulaService.fetch(vm.nodeId).then(function (info) {
        console.log(info)
        vm.formula = info.op_type;
        vm.target_column = parseInt(info.component_id)
        vm.constant_number = parseInt(info.op_constant);
      })
    }

    vm.createNode = function() {
      FormulaService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        component_type: 'Column',
        component_id: vm.target_column,
        op_type: vm.formula,  // Add or Sub, Mul, Div
        op_constant: vm.constant_number
      })
        .then(function(response){
          $mdDialog.hide({
            data: response,
            definition: FormulaService.definition
          });
        })
    };

    vm.updateNode = function () {
      console.log(vm.nodeId, {
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        component_type: 'Column',
        component_id: vm.target_column,
        op_type: vm.formula,  // Add or Sub, Mul, Div
        op_constant: vm.constant_number
      })
      FormulaService.update(vm.nodeId, {
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        component_type: 'Column',
        component_id: vm.target_column,
        op_type: vm.formula,  // Add or Sub, Mul, Div
        op_constant: vm.constant_number
      }).then(function (res) {
        console.log(res)
      });
    }
  }
})();
