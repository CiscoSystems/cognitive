(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory('RowAdditionService', RowAdditionService);

    function RowAdditionService (
        $http, CognitiveWorkspaceService) {

        var RowAdditionService = {};
        var definition = {
            name: "Add Row",
            icon_class:"fa fa-list-ol",
            type: "add_row",
            template: "/static/app/experiment/plugin/row_addition/row_addition.html"
        }

        var createNode = function(user_id, experiment_id, token, values) {
            console.log(values);
            values = "[" + values.toString() + "]";
            console.log(values);

            $http.post('/api/v1/operations/row/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                row_values: values
            }).success(function (data, status, headers, config) {
                console.log(data);
                CognitiveWorkspaceService
                    .appendNode(data.id, definition)
            });
        };

        RowAdditionService = {
            definition: definition,
            createNode: createNode
        }

        return RowAdditionService;
    };
})();
