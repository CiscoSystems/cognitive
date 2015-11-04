(function () {
    'use strict';

    angular.module('cognitive.experiment')
        .factory('DuplicateRemovalService', DuplicateRemovalService);

    function DuplicateRemovalService (
        $http, ExperimentService) {

        var DuplicateRemovalService = {};
        var definition = {
            name:"Remove Duplicates",
            type: "remove_column",
            icon_class: "fa fa-cut",
            template: "/static/app/experiment/plugin/duplication_removal/duplication_removal.html"
        };

        var createNode = function(user_id, experiment_id, token, targets) {
            targets = "["+targets.toString()+"]";
            console.log(targets)
            $http.post('/api/v1/operations/remove_duplicates/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                component_id: targets
            }).success(function (data, status, headers, config) {
                console.log(data);
                ExperimentService
                    .appendNode(data.id, definition)
            });
        }

        DuplicateRemovalService = {
            definition: definition,
            createNode: createNode
        }

        return DuplicateRemovalService;
    };
})();