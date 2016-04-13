(function() {
  'use strict'

  angular.module('cognitive').service('UserService', UserService)

  function UserService($cookies, $http, $resource){
    // TODO: $http will be replaced by $resource

    var UserService = {}

    var resource = $resource('users', null, {
      get: {
        method: 'GET',
        url: '/api/v1/users/:id'
      },
      query: {
        method:'GET',
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
      token: {
        method: 'GET',
        url: '/oauth/token/'
      }
    })


    UserService.login = function(userInfo) {
      var username = userInfo['name'] || userInfo['email'] || userInfo['username_or_email']
      var password = userInfo['password']

      return $http.get('/api/v1/users/login?username_or_email=' + username + '&password=' + password)
        .success(function (data) {
          if (data.status !== 'success') {
            $cookies.putObject('currentUser', {status: 'error'})
            return
          }
          $cookies.putObject('currentUser', {
            id: data.id,
            name: data.username,
            token: data.token
          })
        })
    }

    UserService.register = function(params) {
      /* params['username'] params['email'] params['password'] */
      return $http.post('/api/v1/users/', params)
        .success(function (data) {
          if (data.status !== 'success') {
            return
          }
          $cookies.putObject('currentUser', {
            id: data.id,
            name: data.username,
            token: data.token
          })
        })
    }

    UserService.logout = function() {
      $cookies.remove('currentUser')
    }

    UserService.isLoggedIn = function() {
      var currentUser = $cookies.getObject('currentUser')
      return Boolean(currentUser)
    }

    UserService.getCurrentUser = function() {
      return $cookies.getObject('currentUser')
    }

    return UserService
  }
})()
