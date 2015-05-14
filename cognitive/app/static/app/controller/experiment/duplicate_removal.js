cognitive.controller('RemoveDuplicateController', function(
    $scope, CognitiveWorkspaceService, DuplicateRemovalService) {

    $scope.columns = parsed_file[0];
    $scope.targets = [0];

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        DuplicateRemovalService.createNode(
            $scope.user.id, workspace.id,
            $scope.user.token, $scope.targets);
    };

    $scope.addTarget = function () {
        $scope.targets.push(0)
    }

    $scope.uploadExist = function () {
        return $scope.columns.length !== 0;
    }
});
