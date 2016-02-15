(function () {
  'use strict'

  angular.module('cognitive')
    .controller('LoginDialogController', LoginDialogController)

  function LoginDialogController(UserService, $mdDialog) {
    var vm = this

    vm.loginFormValues = {
      username_or_email: null,
      password: null
    }

    vm.registerFormValues = {
      username: null,
      email: null,
      password: null
    }

    vm.login = function () {
      if (!vm.loginForm.$valid) return

      UserService.login({
        username_or_email: vm.loginFormValues.username_or_email,
        password: vm.loginFormValues.password
      }).then(function () {
        $mdDialog.hide()
      }).catch(function (error) {
        if (error.status == 401 && error.data) {
          // TODO: show error message when the login is not successed
          vm.loginForm.password.$error = false
          vm.loginForm.password.$setValidity('wrongCredential', false)
          vm.loginFormValues.password = ''
        }
      })
    }

    vm.register = function () {
      if (!vm.registerForm.$valid) return

      UserService.register({
        username: vm.registerFormValues.username,
        email: vm.registerFormValues.email,
        password: vm.registerFormValues.password
      }).then(function () {
        $mdDialog.hide()
      }).catch(function () {
        // TODO: show error message when the registeration is not successed
      })
    }
  }

})()
