(function () {
  'use strict'

  angular.module('cognitive', [
    'cognitive.home',
    'cognitive.dashboard',
    'cognitive.experiment',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngFileUpload',
    'ngMaterial',
    'ngMessages',
    'ngMdIcons',
    'ngResource',
    'nvd3',
    'md.data.table'
  ])

  angular.module('cognitive').config(CognitiveConfig)

  function CognitiveConfig($mdThemingProvider, $resourceProvider, $stateProvider, $urlRouterProvider) {

    $mdThemingProvider.theme('default').primaryPalette('blue')

    // To enable trailing slash on $resource urls
    $resourceProvider.defaults.stripTrailingSlashes = false

    $urlRouterProvider.otherwise('index')

    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: '/',
        views: {
          main: {
            templateUrl: '/static/javascripts/home/home.html'
          }
        }
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: '/',
        views: {
          'main': {
            templateUrl: '/static/javascripts/dashboard/dashboard.html'
          }
        }
      }).state('dashboard.experiment', {
        url: '/experiment',
        templateUrl: '/',
        views: {
          content: {
            templateUrl: '/static/javascripts/dashboard/experiment/experiment.html'
          }
        }
      }).state('dashboard.data', {
        url: '/data',
        templateUrl: '/',
        views: {
          content: {
            templateUrl: '/static/javascripts/dashboard/data/data.html'
          }
        }
      }).state('experiment', {
        url: '/experiments/{experimentId}',
        templateUrl: '/',
        views: {
          main: {
            templateUrl: '/static/javascripts/experiment/experiment.html'
          },
          rightNav: {
            templateUrl: '/static/javascripts/experiment/right_nav_default.html'
          }
        }
      }).state('experiment.node', {
        url: '/nodes/{nodeId}',
        templateUrl: '/',
        views: {
          main: {
            templateUrl: '/static/javascripts/experiment/experiment.html'
          },
          rightNav: {
            templateUrl: '/static/javascripts/experiment/plugin/plugin_form.html'
          }
        }
      })
  }

})()
