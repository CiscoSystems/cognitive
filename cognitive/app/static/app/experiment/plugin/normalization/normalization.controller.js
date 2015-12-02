(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('NormalizationController', NormalizationController);

  function NormalizationController (
    UserService, NormalizationService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];
    vm.component_type = "Column",
    vm.component_id = 0;
    vm.op_type = "";

    vm.createNode = function() {
      NormalizationService.create({
        user_id: vm.user.id,
        token: vm.user.token,
        experiment: experiment_id,
        component_type: vm.component_type,
        component_id: vm.component_id,
        op_type: vm.op_type
      }).then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: NormalizationService.definition
        });
      });
    };

    vm.uploadExist = function () {
      return (typeof(vm.columns) == "object") ? true : false;
    }
  };

})();
