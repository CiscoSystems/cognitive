(function() {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('DataInputController', DataInputController);

  function DataInputController ($scope, $location, FileInputService, UserService, $mdDialog, WhiteboardService) {
    var vm = this;
    vm.user = UserService.getCurrentUser();
    vm.experiment_id = $location.search()['id'];

    vm.createNode = function() {
      FileInputService.createNode(
        vm.user.id, vm.experiment_id,
        vm.user.token, vm.file_name, vm.file_body)
      .then(function (response) {
        $mdDialog.hide({
          data: response,
          definition: FileInputService.definition
        });
      });
    };

    $scope.uploadFile = function (event) {
      var file = event.target.files[0];
      vm.file_name = file.name;
      var reader = new FileReader();
      reader.onload = function (event) {
        vm.file_body = event.target.result;
        var parsed_file = $.csv.toArrays(vm.file_body);
        WhiteboardService.setDataFields(parsed_file[0])
      };
      reader.readAsText(file);
      vm.file_name = file.name;
    }
  };

})();
