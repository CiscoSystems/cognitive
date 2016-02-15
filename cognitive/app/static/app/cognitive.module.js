(function () {
  'use strict'

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
    'ngResource'
  ])

  angular.module('cognitive').config(CognitiveConfig)

  function CognitiveConfig($mdThemingProvider, $resourceProvider, $stateProvider, $urlRouterProvider) {

    $mdThemingProvider.definePalette('cognitivePalette', {
      '50': 'ffebee',
      '100': 'ffcdd2',
      '200': 'ef9a9a',
      '300': 'e57373',
      '400': 'ef5350',
      '500': 'f44336',
      '600': 'e53935',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': 'd50000',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
      'contrastLightColors': undefined
    })

    $mdThemingProvider.theme('cognitive')
      .primaryPalette('cognitivePalette')

    // To enable trailing slash on $resource urls
    $resourceProvider.defaults.stripTrailingSlashes = false

    $urlRouterProvider.otherwise('index')
    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: '/',
        views: {
          main: {
            templateUrl: '/static/app/home/home.html'
          }
        }
      }).state('dashboard', {
        url: '/whiteboard',
        templateUrl: '/',
        views: {
          'main': {
            templateUrl: '/static/app/whiteboard/whiteboard.html'
          }
        }
      }).state('dashboard.experiment', {
        url: '/experiment',
        templateUrl: '/',
        views: {
          content: {
            templateUrl: '/static/app/whiteboard/experiment/experiment.html'
          }
        }
      }).state('dashboard.data', {
        url: '/data',
        templateUrl: '/',
        views: {
          content: {
            templateUrl: '/static/app/whiteboard/data/data.html'
          }
        }
      }).state('experiment', {
        url: '/experiment',
        templateUrl: '/',
        views: {
          main: {
            templateUrl: '/static/app/experiment/experiment.html'
          }
        }
      })
  }

})()
