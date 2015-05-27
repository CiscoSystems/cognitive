(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .factory('FormulaService', FormulaService);

    function FormulaService (
        $http, CognitiveWorkspaceService) {

        var FormulaService = {};
        var definition = {
            name: "Math formula",
            type: "add_math_fomula",
            icon_class: "fa fa-subscript",
            template: "/static/app/whiteboard/experiment/plugin/formula/formula.html"
        };

        var createNode = function(user_id, experiment_id, token, formula, target_column, constant_number) {
            $http.post('/api/v1/operations/math_formula/', {
                user_id: user_id,
                token: token,
                experiment: experiment_id,
                component_type: "Column",
                component_id: target_column,
                op_type: formula,  // Add or Sub, Mul, Div
                op_constant: constant_number
            }).success(function (data, status, headers, config) {
                console.log(data);
                CognitiveWorkspaceService
                    .appendNode(data.id, definition)
            });
        };

        FormulaService = {
            definition: definition,
            createNode: createNode
        }

        return FormulaService;
    };
})();