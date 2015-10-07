(function() {
  'use strict';
  angular.module('cognitive')
    .service('UserService', UserService);

  function UserService($cookies, $http){
    var UserService = {};

    UserService.login = function(userInfo) {
      var username = userInfo['name'] || userInfo['email'] || userInfo['username_or_email'];
      var password = userInfo['password'];

      return $http.get("/api/v1/users/login?username_or_email=" + username + "&password=" + password)
        .success(function (data, status, headers, config) {
          if (data.status !== "success") {
            $cookies.putObject('currentUser', {status: 'error'});
            return;
          }
          $cookies.putObject('currentUser', {
            id: data.id,
            name: data.username,
            token: data.token,
            status: 'success'
          });
        })
    }

    UserService.register = function(userInfo) {
      /* userInfo['username'] userInfo['email'] userInfo['password'] */
      return $http.post("/api/v1/users/", userInfo)
        .success(function (data, status, headers, config) {
          if (data.status !== "success") { return; }
          $cookies.putObject('currentUser', {
            id: data.id,
            name: data.username,
            token: data.token,
            status: 'success'
          });
        })
    }

    UserService.logout = function() {
      $cookies.remove('currentUser')
    }

    UserService.isLoggedIn = function() {
      var currentUser = $cookies.getObject('currentUser');
      return Boolean(currentUser) && currentUser['status'] == 'success';
    }

    UserService.getCurrentUser = function() {
      return $cookies.getObject('currentUser');
    }

    return UserService;
  }
})();
