(function () {
    'use strict';

    angular.module('cognitive.whiteboard.experiment')
        .controller('RemoveDuplicateController', RemoveDuplicateController);

    function RemoveDuplicateController (
        $scope, CognitiveWorkspaceService, DuplicateRemovalService) {
        var vm = this;

        vm.columns = parsed_file[0];
        vm.targets = [0];

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            DuplicateRemovalService.createNode(
                $scope.user.id, workspace.id,
                $scope.user.token, vm.targets);
        };

        vm.addTarget = function () {
            vm.targets.push(0)
        }

        vm.uploadExist = function () {
            return vm.columns.length !== 0;
        }
    };

})();