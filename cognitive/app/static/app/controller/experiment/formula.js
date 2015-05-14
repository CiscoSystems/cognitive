cognitive.controller('MathFormulaController', function(
    $scope, CognitiveWorkspaceService, FormulaService) {

    $scope.columns = parsed_file[0];
    $scope.formula = "Add"
    $scope.target_column = 0;
    $scope.constant_number = 0;

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