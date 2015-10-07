(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('NormalizationController', NormalizationController);

  function NormalizationController (
    UserService, CognitiveWorkspaceService, NormalizationService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.component_type = "Column",
    vm.component_id = 0;
    vm.op_type = "";

    vm.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        NormalizationService.createNode(
            vm.user.id, workspace.id, vm.user.token,
            vm.component_type, vm.component_id, vm.op_type);
    };

    vm.uploadExist = function () {
        return (typeof(vm.columns) == "object") ? true : false;
      }
  };
})();
