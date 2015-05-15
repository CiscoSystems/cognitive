cognitive.controller('ProjectionController', function(
    $scope, CognitiveWorkspaceService, ProjectionService) {

    $scope.columns = parsed_file[0];
    $scope.targets = [0];

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        ProjectionService.createNode($scope.user.id, workspace.id, $scope.user.token, $scope.targets);
    };

    $scope.addTarget = function () {
        $scope.targets.push(0)
    }

    $scope.uploadExist = function () {
        console.log($scope.columns)
        return $scope.columns.length !== "undefined";
    }
});