(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory('MetaDataService', MetaDataService);

    function MetaDataService (
        $http, ExperimentService) {

        var MetaDataService = {};
        var definition = {
            name: "Metadata Editor",
            type: "metadata",
            icon_class:"fa fa-share-alt",
            template: "/static/app/experiment/plugin/metadata/metadata.html"
        }

        var createNode = function(user_id, experiment_id, token) {
            $http.post('/api/v1/operations/metadata/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                op_action: ""
            }).success(function (data, status, headers, config) {
                console.log(data);
                ExperimentService.appendNode(
                    data.id, definition)
            });
        };

        MetaDataService = {
            definition: definition,
            createNode: createNode
        };

        return MetaDataService;
    };
})();
