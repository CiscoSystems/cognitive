(function () {
    'use strict';

    angular.module('cognitive.whiteboard.experiment')
        .controller('MetadataController', MetadataController);

    function MetadataController (
        $scope, CognitiveWorkspaceService, MetaDataService) {

        var vm = this;
        vm.columns = parsed_file[0];

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            MetaDataService.createNode($scope.user.id, workspace.id, $scope.user.token);
        };
    };
})();

