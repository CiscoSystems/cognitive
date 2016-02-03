(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveMissingValueController', RemoveMissingValueController);

  function RemoveMissingValueController (
    $location, UserService, MissingDataRemovalService, $mdDialog, WhiteboardService) {
    var vm = this;
    vm.experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = WhiteboardService.getDataFields();
    vm.method = "Replace_mean";

    vm.createNode = function() {
      MissingDataRemovalService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: vm.experiment_id,
        op_action: vm.method,
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: MissingDataRemovalService.definition
        });
      });
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();
