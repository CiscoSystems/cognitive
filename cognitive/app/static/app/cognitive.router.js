(function () {
    'use strict';
    angular.module('cognitive')
        .config(CognitiveConfig);

    function CognitiveConfig(
        $stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("index");
        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "/",
                views: {
                    main: {
                        templateUrl: "/static/app/home/home.html"
                    }
                }
            }).state('whiteboard', {
                url: "/whiteboard",
                templateUrl: "/",
                views: {
                    "main": {
                        templateUrl: "/static/app/whiteboard/whiteboard.html"
                    },
                }
            }).state('whiteboard.experiment', {
                url: "/experiment",
                templateUrl: "/",
                views: {
                    "whiteboard_content": {
                        templateUrl: "/static/app/whiteboard/experiment/experiment.html"
                    },
                }
            }).state('whiteboard.setting', {
                url: "/setting",
                templateUrl: "/",
                views: {
                    "whiteboard_content": {
                        templateUrl: "/static/app/whiteboard/setting/setting.html"
                    },
                }
            }).state('whiteboard.workspace_manager', {
                url: "/workspace_manager",
                templateUrl: "/",
                views: {
                    "whiteboard_content": {
                        templateUrl: "/static/app/whiteboard/workspace_manager/workspace_manager.html"
                    },
                }
            });
    };
})();


