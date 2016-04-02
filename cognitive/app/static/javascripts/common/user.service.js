(function() {
  'use strict'

  angular.module('cognitive').service('UserService', UserService)

  function UserService($cookies, $http){
    // TODO: $http will be replaced by $resource

    var UserService = {}

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

    UserService.register = function(userInfo) {
      /* userInfo['username'] userInfo['email'] userInfo['password'] */
      return $http.post('/api/v1/users/', userInfo)
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
