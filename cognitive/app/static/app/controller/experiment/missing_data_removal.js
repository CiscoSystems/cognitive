(function () {
    'use strict';
    angular.module("cognitive")
        .controller('RemoveMissingValueController', RemoveMissingValueController);

    function RemoveMissingValueController (
        $scope, CognitiveWorkspaceService, MissingDataRemovalService) {

        $scope.columns = parsed_file[0];
        $scope.method = "Replace_mean";

        $scope.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            MissingDataRemovalService.createNode($scope.user.id, workspace.id, $scope.user.token, $scope.method);
        };

        $scope.uploadExist = function () {
            return $scope.columns.length !== 0;
        }
    };

})();
