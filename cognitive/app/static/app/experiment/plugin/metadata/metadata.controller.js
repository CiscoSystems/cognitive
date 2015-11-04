(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .controller('MetadataController', MetadataController);

  function MetadataController (
    UserService, ExperimentService,
    MetaDataService, $location, $mdDialog) {
    var vm = this;
    var experiment_id = $location.search()['id'];
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];

    vm.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      MetaDataService.createNode(vm.user.id, experiment_id, vm.user.token);
      $mdDialog.cancel();
    };
  };
})();

