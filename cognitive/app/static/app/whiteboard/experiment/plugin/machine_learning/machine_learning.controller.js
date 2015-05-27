(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .controller('MachineLearningController', MachineLearningController);

    function MachineLearningController (
        $scope, CognitiveWorkspaceService, MachineLearningService) {
        var vm = this;

        vm.algorithm = "Linear_SVM";
        vm.target = 0;
        vm.trainning_percentage = 10;
        vm.columns = parsed_file[0];

        vm.createNode = function() {
            var workspace = CognitiveWorkspaceService.getCurrentWorkspace()
            MachineLearningService.createNode(
                $scope.user.id, workspace.id, $scope.user.token,
                vm.algorithm,
                vm.target,
                vm.trainning_percentage);
        };

        vm.uploadExist = function () {
            return vm.columns.length !== 0;
        }
    };
})();
