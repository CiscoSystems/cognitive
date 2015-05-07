cognitive.controller('MathFormulaController', function($scope, CognitiveWorkspaceService, FormulaService) {
    $scope.columns = parsed_file[0];
    $scope.formula = ""
    $scope.target_column = -1;
    $scope.constant_number = 1;

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        FormulaService.createNode(
            $scope.user.id, workspace.id, $scope.user.token,
            $scope.formula, $scope.target_column, $scope.constant_number
        );
    };

    $scope.uploadExist = function () {
        return $scope.columns.length !== 0;
    }
});