(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveMissingValueController', RemoveMissingValueController);

  function RemoveMissingValueController (
    UserService, ExperimentService,
    MissingDataRemovalService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.method = "Replace_mean";

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      MissingDataRemovalService
        .createNode(vm.user.id, experiment_id, vm.user.token, vm.method);
      $mdDialog.cancel();
    };

    vm.uploadExist = function () {
        return (typeof(vm.columns) == "object") ? true : false;
      }
  };

})();
