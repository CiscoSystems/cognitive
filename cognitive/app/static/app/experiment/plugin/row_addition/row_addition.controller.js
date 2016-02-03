(function () {
  'use strict'
  angular.module('cognitive.experiment')
    .controller('AddRowController', AddRowController)

  function AddRowController(
    $location, UserService, RowAdditionService, $mdDialog, WhiteboardService) {
    var vm = this
    vm.experiment_id = $location.search()['id']
    vm.user = UserService.getCurrentUser()
    vm.columns = WhiteboardService.getDataFields()
    vm.values = []

    if (typeof(vm.columns) == "function") {
      for (var i = 0; i < vm.columns.length; ++i) {
        vm.values.push("")
      }
    }

    vm.createNode = function() {
      var values = "[" + vm.values.toString() + "]"
      RowAdditionService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        row_values: values
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: RowAdditionService.definition
        })
      })
    }

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false
    }
  };

})();
