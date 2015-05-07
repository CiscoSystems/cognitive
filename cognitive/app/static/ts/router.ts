cognitive.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("");

    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "/",
            views: {
                main: {templateUrl: "/partial/home/main"}
            }
        }).state('whiteboard', {
            url: "/whiteboard",
            templateUrl: "/",
            views: {
                "main": {templateUrl: "/partial/whiteboard/main"},
            }
        }).state('whiteboard.experiment', {
            url: "/experiment",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/partial/whiteboard/experiment/main"},
            }
        }).state('whiteboard.setting', {
            url: "/setting",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/partial/whiteboard/setting/main"},
            }
        }).state('login', {
            url: "/login",
            templateUrl: "/",
            views: {
                "main": {templateUrl: "/partial/login/main"}
            }
        }).state('join', {
            url: "/join",
            templateUrl: "/",
            views: {
                "main": {templateUrl: "/partial/join/main"}
            }

        }).state('focus_add_row', {
            url:"",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/add_row_right"}
            }
        //}).state('workspace.focus.node.data_input', {
        }).state('focus_data_input', {
            url:"/whiteboard.focus.node.data_input",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/data_input_right"}
            }
        //}).state('workspace.focus.node.add_math_fomula', {
        }).state('focus_add_math_fomula', {
            url:"/whiteboard.focus.node.add_math_fomula",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/formula_right"}
            }
        //}).state('workspace.focus.node.normalization', {
        }).state('focus_normalization', {
            url:"/whiteboard.focus.node.normalization",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/normalization_right"}
            }
        //}).state('workspace.focus.node.machine_learning', {
        }).state('focus_machine_learning', {
            url:"/whiteboard.focus.node.machine_learning",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/machine_learning_right"}
            }
        //}).state('workspace.focus.node.metadata', {
        }).state('focus_metadata', {
            url:"/whiteboard.focus.node.metadata",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/metadata_right"}
            }
        //}).state('workspace.focus.node.projection', {
        }).state('focus_projection', {
            url:"/whiteboard.focus.node.projection",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/projection_right"}
            }
        //}).state('workspace.focus.node.remove_column', {
        }).state('focus_remove_column', {
            url:"/whiteboard.focus.node.remove_column",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/remove_column_right"}
            }
        //}).state('workspace.focus.node.remove_missing_value', {
        }).state('focus_remove_missing_value', {
            url:"/whiteboard.focus.node.remove_missing_value",
            views: {
                "view_right_description": {templateUrl: "/partial/whiteboard/remove_missing_value_right"}
            }
        });
});