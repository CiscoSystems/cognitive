(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('RemoveMissingValueController', RemoveMissingValueController);

  function RemoveMissingValueController (
    UserService, MissingDataRemovalService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.method = "Replace_mean";

    vm.createNode = function() {
      MissingDataRemovalService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
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
