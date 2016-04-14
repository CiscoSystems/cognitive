(function () {
  'use strict'

  angular.module('cognitive').service('UserService', UserService)

  function UserService($cookies, $http, $resource, OAUTH_INFO) {
    var UserService = {}

    var resource = $resource('users', null, {
      get: {
        method: 'GET',
        url: '/api/v1/users/:id'
      },
      query: {
        method: 'GET',
        url: '/api/v1/users/',
        isArray: true
      },
      save: {
        method: 'POST',
        url: '/api/v1/users/'
      },
      update: {
        method: 'PUT',
        url: '/api/v1/users/:id'
      },
      delete: {
        method: 'DELETE',
        url: '/api/v1/users/:id'
      },
      me: {
        method: 'GET',
        url: '/api/v1/users/me'
      },
      token: {
        method: 'POST',
        url: '/oauth/token/',
        headers: OAUTH_INFO.token_header
      }
    })

    UserService.token = function(params) {
      /* params['username'] params['password'] */
      var _params = angular.merge({}, params, {grant_type: 'password'})
      return resource.token(_params).$promise
        .then(function (response) {
          var _token = response['token_type'] + ' ' + response['access_token']
          $http.defaults.headers.common['Authorization'] = _token
          $cookies.putObject('oauthToken', {Authorization: _token})
        })
    }

    UserService.me = function() {
      return resource.me().$promise.then(function(response){
        $cookies.putObject('me', response)
      })
    }

    UserService.login = function (params) {
      /* params['username'] params['password'] */
      return UserService.token(params).then(UserService.me)
    }

    UserService.register = function (params) {
      /* params['username'] params['email'] params['password'] */
      return resource.save(params).$promise.then(function(response){
        UserService.token(params).then(UserService.me)
      })
    }

    UserService.logout = function () {
      $cookies.remove('me')
    }

    UserService.isLoggedIn = function () {
      var currentUser = $cookies.getObject('me')
      return Boolean(currentUser)
    }

    UserService.getCurrentUser = function () {
      return $cookies.getObject('me')
    }

    return UserService
  }
})()
