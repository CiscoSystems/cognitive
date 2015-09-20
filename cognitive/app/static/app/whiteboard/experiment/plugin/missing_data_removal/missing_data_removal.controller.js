(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .controller('RemoveMissingValueController', RemoveMissingValueController);

    function RemoveMissingValueController (
        $scope, CognitiveWorkspaceService, MissingDataRemovalService) {

        var vm = this;
        vm.columns = parsed_file[0];
        vm.method = "Replace_mean";

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            MissingDataRemovalService
                .createNode($scope.user.id, workspace.id, $scope.user.token, vm.method);
        };

        vm.uploadExist = function () {
            return (typeof(vm.columns) == "object") ? true : false;
        }
    };

})();
