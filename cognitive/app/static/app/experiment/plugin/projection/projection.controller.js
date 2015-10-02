(function () {
    'use strict';
    angular.module('cognitive.experiment')
      .controller("ProjectionController", ProjectionController);

    function ProjectionController(
        $scope, CognitiveWorkspaceService, ProjectionService) {

        var vm = this;
        vm.columns = parsed_file[0];
        vm.targets = [0];

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            ProjectionService.createNode($scope.user.id, workspace.id, $scope.user.token, vm.targets);
        };

        vm.addTarget = function () {
            vm.targets.push(0)
        }

        vm.uploadExist = function () {
            return (typeof(vm.columns) == "object") ? true : false;
        }
    };
})();
