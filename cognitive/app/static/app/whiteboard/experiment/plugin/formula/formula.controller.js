(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .controller('FormulaController', FormulaController);

    function FormulaController (
        $scope, CognitiveWorkspaceService, FormulaService) {
        var vm = this;

        vm.columns = parsed_file[0];
        vm.formula = "Add"
        vm.target_column = 0;
        vm.constant_number = 0;

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            FormulaService.createNode(
                $scope.user.id, workspace.id, $scope.user.token,
                vm.formula, vm.target_column, vm.constant_number
            );
        };

        vm.uploadExist = function () {
            return (typeof(vm.columns) == "object") ? true : false;
        }
    }

})();