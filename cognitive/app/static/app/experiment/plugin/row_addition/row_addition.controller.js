(function () {
  'use strict';
  angular.module('cognitive.experiment')
      .controller('AddRowController', AddRowController);

  function AddRowController(
    UserService, ExperimentService,
    RowAdditionService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.values = [];

    if (typeof(vm.columns) == "function") {
      for (var i = 0; i < vm.columns.length; ++i) {
        vm.values.push("")
      }
    }

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace();
      RowAdditionService.createNode(vm.user.id, experiment_id,  vm.user.token, vm.values);
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();
