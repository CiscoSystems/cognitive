(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .controller('MetadataController', MetadataController);

  function MetadataController (
    UserService, CognitiveWorkspaceService, MetaDataService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.columns = parsed_file[0];

    vm.createNode = function() {
      var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
      MetaDataService.createNode(vm.user.id, workspace.id, vm.user.token);
    };
  };
})();

