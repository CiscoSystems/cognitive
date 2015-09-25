(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .controller('AddRowController', AddRowController);

    function AddRowController(
        $scope, CognitiveWorkspaceService, RowAdditionService) {

        var vm = this;
        vm.columns = parsed_file[0];
        vm.values = [];

        if (typeof(vm.columns) == "function") {
            for (var i = 0; i < vm.columns.length; ++i) {
                vm.values.push("")
            }
        }

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace();
            RowAdditionService.createNode($scope.user.id, workspace.id,  $scope.user.token, vm.values);
        };

        vm.uploadExist = function () {
            return (typeof(vm.columns) == "object") ? true : false;
        }
    };

})();
