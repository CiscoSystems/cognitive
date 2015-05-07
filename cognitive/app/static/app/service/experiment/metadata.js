cognitive.factory('MetaDataService', function (
    $http, CognitiveWorkspaceService) {

    var MetaDataService = {};
    var definition = {
        name:"metadata",
        title:"Metadata Editor",
        icon_class:"fa fa-share-alt",
        template: "/static/app/partial/whiteboard/experiment/metadata.html"
    }

    var createNode = function(user_id, experiment_id, token) {
        $http.post('/api/v1/operations/metadata/', {
            user_id: user_id, token: token, experiment: experiment_id
            //op_action: string; //"Replace_mean" or Drop_row
            ,op_action: ""
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService.appendNode(
                data.id, definition.title, definition.name)
        });
    };

    MetaDataService = {
        definition: definition,
        createNode: createNode
    };

    return MetaDataService;
});