cognitive.factory('FormulaService', function (
    $http, CognitiveWorkspaceService) {

    var FormulaService = {};
    var definition = {
        name:"add_math_fomula",
        title:"Math formula",
        icon_class:"fa fa-subscript",
        template: "/static/app/partial/whiteboard/experiment/formula.html"
    };

    var createNode = function(user_id, experiment_id, token, formula, target_column, constant_number) {
        $http.post('/api/v1/operations/math_formula/', {
            user_id: user_id, token: token, experiment: experiment_id
            //    component_type: string; component_id: number; op_type: string;  // Add or Sub, Mul, Div op_constant: number;
            ,component_type: "Column", component_id: target_column, op_type: formula, op_constant: constant_number
        }).success(function (data, status, headers, config) {
            console.log(data);
            CognitiveWorkspaceService
                .appendNode(data.id, definition.title, definition.name)
        });
    };

    FormulaService = {
        definition: definition,
        createNode: createNode
    }

    return FormulaService;
});