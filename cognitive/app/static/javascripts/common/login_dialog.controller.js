(function () {
  'use strict'

  angular.module('cognitive')
    .controller('LoginDialogController', LoginDialogController)

  function LoginDialogController(UserService, $mdDialog) {
    var vm = this

    vm.signInFailure = false
    vm.signUpFailure = false

    vm.loginUser = {
      username_or_email: null,
      password: null
    }

    vm.registeringUser = {
      name: null,
      email: null,
      password: null
    }

    vm.login = function () {
      UserService.login({
        username_or_email: vm.loginUser.username_or_email,
        password: vm.loginUser.password
      }).then(function () {
        $mdDialog.hide()
      }).catch(function (error) {
        if (error.status == 401 && error.data) {
          vm.signInFailure = true
        }
      })
    }

    vm.register = function () {
      UserService.register({
        "username": vm.registeringUser.name,
        "email": vm.registeringUser.email,
        "password": vm.registeringUser.password
      }).then(function () {
        $mdDialog.hide()
      }).catch(function (error) {
        console.log(error)
        vm.signUpFailure = true
      })
    }
  }

})()
