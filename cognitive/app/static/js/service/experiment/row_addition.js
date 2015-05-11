cognitive.factory('RowAdditionService', function ($http, CognitiveWorkspaceService) {
    var RowAdditionService = {};
    var definition = {
        name:"add_row",
        title:"Add Row",
        icon_class:"fa fa-list-ol",
        template: "/partial/whiteboard/add_row"
    }

    var createNode = function(user_id, experiment_id, token) {

        console.log(user_id, experiment_id, token)

        $http.post('/api/v1/operations/row/', {
            user_id: user_id, token: token, experiment: experiment_id, row_values: []
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });
    };

    RowAdditionService = {
        definition: definition,
        createNode: createNode
    }

    return RowAdditionService;
});