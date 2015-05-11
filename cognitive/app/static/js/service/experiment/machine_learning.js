cognitive.factory('MachineLearningService', function (
    $http, CognitiveWorkspaceService) {

    var MachineLearningService = {};
    var definition = {
        title:"Machine Learning" ,
        icon_class:"fa fa-spinner",
        name:"machine_learning",
        template: "/partial/whiteboard/machine_learning"
    };

    var createNode = function(
        user_id, experiment_id, token,
        machine_learning_algorithm,
        target_column, trainning_percentage) {

        $http.post('/api/v1/operations/machine_learning/', {
            user_id: user_id,
            token: token, experiment: experiment_id,
            model_type:machine_learning_algorithm,
            train_data_percentage: trainning_percentage,
            target_column: target_column
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });
    };

    MachineLearningService = {
        definition: definition,
        createNode: createNode
    };

    return MachineLearningService;
});