cognitive.controller('NormalizationController', function(
    $scope, CognitiveWorkspaceService, NormalizationService) {

    $scope.columns = parsed_file[0];
    $scope.component_type = "Column",
    $scope.component_id =- 1;
    $scope.op_type = "";

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        NormalizationService.createNode(
            $scope.user.id, workspace.id, $scope.user.token,
            $scope.component_type,$scope.component_id, $scope.op_type);
    };

    $scope.uploadExist = function () {
        return $scope.columns.length !== 0;
    }
});