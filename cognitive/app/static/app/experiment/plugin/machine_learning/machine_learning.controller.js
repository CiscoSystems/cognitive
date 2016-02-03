(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('MachineLearningController', MachineLearningController);

  function MachineLearningController (
    $location, UserService, MachineLearningService, $mdDialog, WhiteboardService) {
    var vm = this;
    vm.experiment_id = $location.search()['id'];

    vm.user = UserService.getCurrentUser();
    vm.algorithm = 'Linear_SVM';
    vm.target = 0;
    vm.trainning_percentage = 10;
    vm.columns = WhiteboardService.getDataFields();

    vm.createNode = function() {
      MachineLearningService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        model_type: vm.algorithm,
        train_data_percentage: vm.trainning_percentage,
        target_column: vm.target
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: MachineLearningService.definition
        });
      });
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == 'object') ? true : false;
    }
  };
})();
