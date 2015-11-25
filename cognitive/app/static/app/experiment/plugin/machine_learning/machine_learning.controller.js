(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('MachineLearningController', MachineLearningController);

  function MachineLearningController (
    UserService, WhiteboardService,
    MachineLearningService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];

    vm.user = UserService.getCurrentUser();
    vm.algorithm = "Linear_SVM";
    vm.target = 0;
    vm.trainning_percentage = 10;
    vm.columns = parsed_file[0];

    vm.createNode = function() {
      MachineLearningService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
        model_type: vm.algorithm,
        train_data_percentage: vm.trainning_percentage,
        target_column: vm.target
      }).then(function(response){
        WhiteboardService.appendNode(
          response.id, MachineLearningService.definition);
      });
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };
})();
