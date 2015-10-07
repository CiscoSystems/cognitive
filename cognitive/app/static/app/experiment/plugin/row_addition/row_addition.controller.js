(function () {
  'use strict';
  angular.module('cognitive.experiment')
      .controller('AddRowController', AddRowController);

  function AddRowController(
    UserService, CognitiveWorkspaceService, RowAdditionService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.values = [];

    if (typeof(vm.columns) == "function") {
      for (var i = 0; i < vm.columns.length; ++i) {
        vm.values.push("")
      }
    }

    vm.createNode = function() {
      var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
      RowAdditionService.createNode(vm.user.id, workspace.id,  vm.user.token, vm.values);
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();
