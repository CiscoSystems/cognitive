cognitive.controller('RemoveMissingValueController', function(
    $scope, CognitiveWorkspaceService, MissingDataRemovalService) {

    $scope.columns = parsed_file[0];
    $scope.method = "";

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        MissingDataRemovalService.createNode($scope.user.id, workspace.id, $scope.user.token, $scope.method);
    };

    $scope.uploadExist = function () {
        return $scope.columns.length !== 0;
    }
});