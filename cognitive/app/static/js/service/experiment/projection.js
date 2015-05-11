cognitive.factory('ProjectionService', function ($http, CognitiveWorkspaceService) {
    var ProjectionService = {};
    var definition = {
        name:"projection",
        title:"Column Selection",
        icon_class:"fa fa-cogs",
        template: "/partial/whiteboard/projection"
    };

    var createNode = function(user_id, experiment_id, token) {
        $http.post('/api/v1/operations/projection/', {
            user_id: user_id, token: token, experiment: experiment_id
            //component_id: string; // component_ids <- : string;
            ,component_id: ""
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });

    };

    ProjectionService = {
        definition: definition,
        createNode: createNode
    }

    return ProjectionService;
});