(function () {
    "use strict";
    angular.module("cognitive")
        .factory('FileInputService', FileInputService);

    function FileInputService (
        $http, CognitiveWorkspaceService) {

        var FileInputService = {};
        var definition =  {
            name:"File Input",
            type:"file_input",
            icon_class:"fa fa-arrow-up",
            template: "/static/app/partial/whiteboard/experiment/file_input.html"
        }

         var createNode = function(user_id, experiment_id, token, file_name, file_text) {
            $http.post('/api/v1/operations/input/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                input_file: file_name,
                input_file_type: "csv",
                data_values: file_text
            }).success(function (data, status, headers, config) {
                console.log(data);
                //CognitiveWorkspaceService
                //    .appendNode(data.id, "input data", definition.title)
                CognitiveWorkspaceService
                    .appendNode(data.id, definition)
            });
        };

        // this is temporal implementation, will be removed to
        // support for multiple input sources
        var file_name = ""
        var file_text = ""
        var file_parsed_text = [];

        FileInputService = {
            definition: definition,
            createNode: createNode,
            filename: file_name,
            filetext: file_text,
            parsedtext: file_parsed_text
        }

        return FileInputService;
    };
})();
