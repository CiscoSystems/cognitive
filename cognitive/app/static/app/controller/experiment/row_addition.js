cognitive.controller('AddRowController', function($scope, CognitiveWorkspaceService, RowAdditionService) {

    $scope.columns = parsed_file[0];
    $scope.values = [];


    for(var i=0; i<$scope.columns.length; ++i) {
        $scope.values.push("")
    }

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
        RowAdditionService.createNode($scope.user.id, workspace.id,  $scope.user.token, $scope.values);
    };

    $scope.uploadExist = function () {
        return $scope.values.length !== 0;
    }
});
