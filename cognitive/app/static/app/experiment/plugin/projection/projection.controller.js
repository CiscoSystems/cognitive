(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller("ProjectionController", ProjectionController);

  function ProjectionController(
    UserService, CognitiveWorkspaceService, ProjectionService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.targets = [0];

    vm.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        ProjectionService.createNode(vm.user.id, workspace.id, vm.user.token, vm.targets);
    };

    vm.addTarget = function () {
        vm.targets.push(0)
    }

    vm.uploadExist = function () {
        return (typeof(vm.columns) == "object") ? true : false;
    }
  };
})();
