(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveDuplicateController', RemoveDuplicateController);

  function RemoveDuplicateController (
    UserService, CognitiveWorkspaceService, DuplicateRemovalService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.targets = [0];

    vm.createNode = function() {
      var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
      DuplicateRemovalService.createNode(
        vm.user.id, workspace.id,
        vm.user.token, vm.targets);
    };

    vm.addTarget = function () {
      vm.targets.push(0)
    }

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();