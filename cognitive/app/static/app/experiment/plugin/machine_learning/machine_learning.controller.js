(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('MachineLearningController', MachineLearningController);

  function MachineLearningController (
    UserService, ExperimentService,
    MachineLearningService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];

    vm.user = UserService.getCurrentUser();
    vm.algorithm = "Linear_SVM";
    vm.target = 0;
    vm.trainning_percentage = 10;
    vm.columns = parsed_file[0];

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      MachineLearningService.createNode(
        vm.user.id, experiment_id, vm.user.token,
        vm.algorithm,
        vm.target,
        vm.trainning_percentage);
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };
})();
