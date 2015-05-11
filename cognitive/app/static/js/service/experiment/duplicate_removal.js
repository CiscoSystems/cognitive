cognitive.factory('DuplicateRemovalService', function (
    $http, CognitiveWorkspaceService) {

    var DuplicateRemovalService = {};
    var definition = {
        name:"remove_column",
        title:"Remove Duplicates",
        icon_class:"fa fa-cut",
        template: "/partial/whiteboard/remove_column"
    };

    var createNode = function(user_id, experiment_id, token) {
        $http.post('/api/v1/operations/remove_duplicates/', {
            user_id: user_id, token: token, experiment: experiment_id
            //    component_ids: string;
            ,component_ids: ""
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