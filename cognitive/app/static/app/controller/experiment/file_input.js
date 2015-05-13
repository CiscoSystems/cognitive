cognitive.controller('DataInputController', function(
    $scope, CognitiveWorkspaceService, FileInputService) {

    $scope.createNode = function() {
        var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
        FileInputService.createNode(
            $scope.user.id, workspace.id,
            $scope.user.token, file_name, file_body);
    };

    $scope.uploadFile = function (event) {
        var file = event.target.files[0];
        $scope.file_name = file.name;
        var reader = new FileReader();
        reader.onload = function (event) {
            file_body = event.target.result;
            $scope.file_body = file_body
            parsed_file = $.csv.toArrays(file_body);
            $scope.parsed_file = parsed_file
        };
        reader.readAsText(file);
        file_name = file.name;
    }

});