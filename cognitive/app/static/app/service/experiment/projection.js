cognitive.factory('ProjectionService', function (
    $http, CognitiveWorkspaceService) {

    var ProjectionService = {};
    var definition = {
        name:"projection",
        title:"Column Selection",
        icon_class:"fa fa-cogs",
        template: "/static/app/partial/whiteboard/experiment/projection.html"
    };

    var createNode = function(user_id, experiment_id, token, targets) {
        targets = "["+targets.toString()+"]";
        $http.post('/api/v1/operations/projection/', {
            user_id: user_id, token: token, experiment: experiment_id
            ,component_id: targets
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