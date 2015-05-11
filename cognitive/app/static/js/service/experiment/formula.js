cognitive.factory('FormulaService', function (
    $http, CognitiveWorkspaceService) {

    var FormulaService = {};
    var definition = {
        name:"add_math_fomula",
        title:"Math formula",
        icon_class:"fa fa-subscript",
        template: "/partial/whiteboard/formula"
    };

    var createNode = function(user_id, experiment_id, token) {
        $http.post('/api/v1/operations/math_formula/', {
            user_id: user_id, token: token, experiment: experiment_id
            //    component_type: string; component_id: number; op_type: string;  // Add or Sub, Mul, Div op_constant: number;
            ,component_type: "", component_id: 0, op_type: ""
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