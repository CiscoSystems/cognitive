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

    //$mdThemingProvider.definePalette('cognitivePalette', {
    //  '50': 'ffebee',
    //  '100': 'ffcdd2',
    //  '200': 'ef9a9a',
    //  '300': 'e57373',
    //  '400': '022222',
    //  '500': '022222',
    //  '600': '022222',
    //  '700': 'd32f2f',
    //  '800': 'c62828',
    //  '900': 'b71c1c',
    //  'A100': 'ff8a80',
    //  'A200': 'ff5252',
    //  'A400': 'ff1744',
    //  'A700': 'd50000',
    //  'contrastDefaultColor': 'light',
    //  'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
    //  'contrastLightColors': undefined
    //})

    $mdThemingProvider.theme('cognitive').primaryPalette('blue')

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
