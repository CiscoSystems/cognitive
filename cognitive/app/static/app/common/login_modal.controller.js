(function () {
  'use strict';

  angular.module('cognitive')
    .controller('LoginModalController', LoginModalController);

  function LoginModalController(
    $state, $modalInstance, UserService) {
    var vm = this;

    vm.register_error = 0;
    vm.login_error = 0;
    vm.message = '';

    vm.loginForm = {
        username_or_email: '',
        password: ''
    }

    vm.registerForm = {
        username: '',
        email: '',
        password: ''
    }

    vm.isRegisterError = function () {
        return vm.register_error !== 0;
    }

    vm.isLoginError = function () {
        return vm.login_error !== 0;
    }

    vm.login = function (username_or_email, password) {
      var userInfo = {username_or_email: username_or_email, password: password};
      UserService.login(userInfo).then(function(){
        if (UserService.isLoggedIn()) {
          $modalInstance.close({ status: 'success'});
          return;
        }
        vm.login_error = 1;
      });
    }

    vm.register = function (username, email, password) {
      var userInfo = {username: username, email: email, password:password}
      UserService.register(userInfo).then(function(response){
        if (UserService.isLoggedIn()) {
          $modalInstance.close({status: 'success'})
          return;
        }
        vm.register_error = 1;
        vm.message = response.data.message;
      });
    }
  }
})();
