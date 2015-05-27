(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
      .controller('NormalizationController', NormalizationController);

    function NormalizationController (
        $scope, CognitiveWorkspaceService, NormalizationService) {
        var vm = this;

        vm.columns = parsed_file[0];
        vm.component_type = "Column",
        vm.component_id = 0;
        vm.op_type = "";

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            NormalizationService.createNode(
                $scope.user.id, workspace.id, $scope.user.token,
                vm.component_type, vm.component_id, vm.op_type);
        };

        vm.uploadExist = function () {
            return vm.columns.length !== 0;
        }
    };
})();
