(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveMissingValueController', RemoveMissingValueController);

  function RemoveMissingValueController (
    UserService, CognitiveWorkspaceService, MissingDataRemovalService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.method = "Replace_mean";

    vm.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        MissingDataRemovalService
            .createNode(vm.user.id, workspace.id, vm.user.token, vm.method);
    };

    vm.uploadExist = function () {
        return (typeof(vm.columns) == "object") ? true : false;
      }
  };

})();
