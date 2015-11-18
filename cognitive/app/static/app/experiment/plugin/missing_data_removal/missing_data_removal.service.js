(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory('MissingDataRemovalService', MissingDataRemovalService);

    function MissingDataRemovalService (
        $http, ExperimentService) {

        var MissingDataRemovalService = {};
        var definition = {
            name: "Remove Missing Value",
            type:"remove_missing_value",
            icon_class:"fa fa-sliders",
            template: "/static/app/experiment/plugin/missing_data_removal/missing_data_removal.html"
        }

        var createNode = function(user_id, experiment_id, token, method) {
            $http.post('/api/v1/operations/remove_missing/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                op_action: method
            }).success(function (data, status, headers, config) {
                console.log(data);
                ExperimentService.appendNode(
                    data.id, definition)
            });
        };

        MissingDataRemovalService = {
            definition: definition,
            createNode: createNode
        };

        return MissingDataRemovalService;
    };
})();
