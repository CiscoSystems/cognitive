cognitive.factory('RowAdditionService', function ($http, CognitiveWorkspaceService) {
    var RowAdditionService = {};
    var definition = {
        name:"add_row",
        title:"Add Row",
        icon_class:"fa fa-list-ol",
        template: "/static/app/partial/whiteboard/experiment/row_addition.html"
    }

    var createNode = function(user_id, experiment_id, token, values) {
        console.log(values);
        values = "[" + values.toString() + "]";
        console.log(values);

        $http.post('/api/v1/operations/row/', {
            user_id: user_id, token: token, experiment: experiment_id, row_values: values
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