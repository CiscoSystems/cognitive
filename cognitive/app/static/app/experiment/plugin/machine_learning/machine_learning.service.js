(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory('MachineLearningService', MachineLearningService);

    function MachineLearningService(
        $http, CognitiveWorkspaceService) {

        var MachineLearningService = {};
        var definition = {
            name: "Machine Learning",
            type: "machine_learning",
            icon_class: "fa fa-spinner",
            template: "/static/app/experiment/plugin/machine_learning/machine_learning.html"
        };

        var createNode = function(
            user_id, experiment_id, token,
            algorithm, target, trainning_percentage) {

            $http.post('/api/v1/operations/machine_learning/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                model_type: algorithm,
                train_data_percentage: trainning_percentage,
                target_column: target
            }).success(function (data, status, headers, config) {
                console.log(data);
                CognitiveWorkspaceService
                    .appendNode(data.id, definition)
            });
        };

        MachineLearningService = {
            definition: definition,
            createNode: createNode
        };

        return MachineLearningService;
    };
})();
