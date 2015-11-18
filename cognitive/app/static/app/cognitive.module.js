(function () {
  'use strict';

  angular.module('cognitive', [
    'cognitive.home',
    'cognitive.whiteboard',
    'cognitive.experiment',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngFileUpload',
    'ngMaterial',
    'ngMdIcons',
    'ngResource',
  ]);

  angular.module('cognitive').config(CognitiveConfig);

  function CognitiveConfig(
    $resourceProvider, $stateProvider, $urlRouterProvider){

    // To enable trailing slash on $resource urls
    $resourceProvider.defaults.stripTrailingSlashes = false;

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
      }).state('dashboard', {
        url: "/whiteboard",
        templateUrl: "/",
        views: {
          "main": {
            templateUrl: "/static/app/whiteboard/whiteboard.html",
          },
        }
      }).state('dashboard.experiment', {
        url: "/experiment",
        templateUrl: "/",
        views: {
          "content": {
            templateUrl: "/static/app/whiteboard/experiment/experiment.html"
          },
        }
      }).state('dashboard.data', {
        url: "/data",
        templateUrl: "/",
        views: {
          "content": {
            templateUrl: "/static/app/whiteboard/data/data.html"
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
