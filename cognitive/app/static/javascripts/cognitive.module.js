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

  angular.module('cognitive').constant('OAUTH_INFO', {
    client_id:'UuGiXEm6FVAqeZr0tra1OEXv2WI8BhZPRbLKOSnY',
    client_secret: '1rpAxKup939rfvuIj1vN4KRS7HafHw02gFIrKNloCTzPxeoBEKtYdu703P0XEpv6sUWNj4ZIQIRthxaT1WRJzlkxNqXcqjItNGxJuyhPTqMVkJRrdv4wjCS6HLRQAzeW',
    token_header: {
      Authorization: 'Basic VXVHaVhFbTZGVkFxZVpyMHRyYTFPRVh2MldJOEJoWlBSYkxLT1NuWToxcnBBeEt1cDkzOXJmdnVJajF2TjRLUlM3SGFmSHcwMmdGSXJLTmxvQ1R6UHhlb0JFS3RZZHU3MDNQMFhFcHY2c1VXTmo0WklRSVJ0aHhhVDFXUkp6bGt4TnFYY3FqSXROR3hKdXloUFRxTVZrSlJyZHY0d2pDUzZITFJRQXplVw=='
    }
  })

  angular.module('cognitive').run(function($http, $cookies) {
    var oauthToken = $cookies.getObject('oauthToken')
    if (oauthToken != undefined || oauthToken != null) {
      $http.defaults.headers.common['Authorization'] = oauthToken['Authorization']
    }
  })

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
