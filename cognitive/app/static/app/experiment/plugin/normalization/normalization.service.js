(function () {
    'use strict';
    angular.module('cognitive.experiment')
        .factory('NormalizationService', NormalizationService);

    function NormalizationService($http, ExperimentService) {
        var NormalizationService = {};
        var definition = {
            name: "Normalization",
            type:"normalization",
            icon_class:"fa fa-align-center",
            template: "/static/app/experiment/plugin/normalization/normalization.html"
        }

        var createNode = function(
            user_id, experiment_id, token, component_type, component_id, op_type) {
            $http.post('/api/v1/operations/normalization/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                component_type: component_type,
                component_id: component_id,
                op_type: op_type
            }).success(function (data, status, headers, config) {
                console.log(data);
                ExperimentService
                    .appendNode(data.id, definition)
            });
        };

        NormalizationService = {
            definition: definition,
            createNode: createNode
        }

        return NormalizationService;
    };
})();
