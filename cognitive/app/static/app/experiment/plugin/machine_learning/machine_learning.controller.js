(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('MachineLearningController', MachineLearningController);

  function MachineLearningController (
    UserService, CognitiveWorkspaceService, MachineLearningService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.algorithm = "Linear_SVM";
    vm.target = 0;
    vm.trainning_percentage = 10;
    vm.columns = parsed_file[0];

    vm.createNode = function() {
      var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
      MachineLearningService.createNode(
        vm.user.id, workspace.id, vm.user.token,
        vm.algorithm,
        vm.target,
        vm.trainning_percentage);
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };
})();
