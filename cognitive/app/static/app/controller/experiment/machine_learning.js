cognitive.controller('MachineLearningController', function(
    $scope, CognitiveWorkspaceService, MachineLearningService) {

    $scope.algorithm = "Linear_SVM";
    $scope.target = 1;
    $scope.trainning_percentage = 10;
    $scope.columns = parsed_file[0];

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        MachineLearningService.createNode(
            $scope.user.id, workspace.id, $scope.user.token,
            $scope.algorithm,
            $scope.target,
            $scope.trainning_percentage);
    };

    $scope.uploadExist = function () {
        return $scope.columns.length !== 0;
    }
});