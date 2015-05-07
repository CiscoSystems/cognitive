cognitive.factory('DuplicateRemovalService', function (
    $http, CognitiveWorkspaceService) {

    var DuplicateRemovalService = {};
    var definition = {
        name:"remove_column",
        title:"Remove Duplicates",
        icon_class:"fa fa-cut",
        template: "/static/app/partial/whiteboard/experiment/duplication_removal.html"
    };

    var createNode = function(user_id, experiment_id, token, targets) {
        targets = "["+targets.toString()+"]";
        console.log(targets)
        $http.post('/api/v1/operations/remove_duplicates/', {
            user_id: user_id, token: token, experiment: experiment_id, component_id: targets
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });
    }

    DuplicateRemovalService = {
        definition: definition,
        createNode: createNode
    }

    return DuplicateRemovalService;
});