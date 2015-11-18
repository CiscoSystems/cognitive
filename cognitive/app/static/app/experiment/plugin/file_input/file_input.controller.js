(function() {
  'use strict';
  angular.module('cognitive.experiment')
    .controller('DataInputController', DataInputController);

  function DataInputController (
    $scope, ExperimentService,
    FileInputService, UserService, $location, $mdDialog, DataService) {

    var vm = this;
    vm.user = UserService.getCurrentUser();

    var definition =  {
      name:"File Input",
      type:"file_input",
      icon_class:"fa fa-arrow-up",
      template: "/static/app/experiment/plugin/file_input/file_input.html"
    }

    var experiment_id = $location.search()['id'];

    $scope.createNode = function() {
      var workspace = ExperimentService.getCurrentWorkspace()
      FileInputService.createNode(
        vm.user.id, experiment_id,
        vm.user.token, file_name, file_body)
        .success(function (data, status, headers, config) {
        console.log(data);
        ExperimentService.appendNode(data.id, definition)
        $mdDialog.cancel();
      });;
    };

    $scope.uploadFile = function (event) {
      var file = event.target.files[0];
      $scope.file_name = file.name;
      var reader = new FileReader();
      reader.onload = function (event) {
        file_body = event.target.result;
        $scope.file_body = file_body
        parsed_file = $.csv.toArrays(file_body);
        $scope.parsed_file = parsed_file
      };
      reader.readAsText(file);
      file_name = file.name;
    }
  };

})();
