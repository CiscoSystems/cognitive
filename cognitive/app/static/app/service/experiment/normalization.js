cognitive.factory('NormalizationService', function ($http, CognitiveWorkspaceService) {
    var NormalizationService = {};
    var definition = {
        name:"normalization",
        title:"Normalization",
        icon_class:"fa fa-align-center",
        template: "/static/app/partial/whiteboard/experiment/normalization.html"
    }

    var createNode = function(
        user_id, experiment_id, token, component_type, component_id, op_type) {
        $http.post('/api/v1/operations/normalization/', {
            user_id: user_id, token: token, experiment: experiment_id,
            component_type: component_type,
            component_id: component_id,
            op_type: op_type
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });
    };

    NormalizationService = {
        definition: definition,
        createNode: createNode
    }

    return NormalizationService;
});