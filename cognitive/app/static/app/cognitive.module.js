(function () {
  'use strict';

  angular.module('cognitive', [
    'cognitive.home',
    'cognitive.whiteboard',
    'cognitive.experiment',
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngCookies',
    'ngMaterial',
    'ngMdIcons',
    'ngAria',
    'ngAnimate',
  ]);

  angular.module('cognitive').config(CognitiveConfig);

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
      }).state('experiment', {
        url: "/experiment",
        templateUrl: "/",
        views: {
          main: {
            templateUrl: "/static/app/experiment/experiment.html",
          }
        }
      });
  };
})();
