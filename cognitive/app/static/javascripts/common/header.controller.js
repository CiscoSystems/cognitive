(function () {
  'use strict'

  angular.module('cognitive')
    .controller('HeaderController', HeaderController)

  function HeaderController(UserService, $state) {
    var vm = this
    vm.currentUser = null

    if (UserService.isLoggedIn()) {
      vm.currentUser = UserService.getCurrentUser()
    }

    vm.clickHome = function () {
      if (UserService.isLoggedIn()) {
        $state.go('dashboard.experiment')
      } else {
        window.location.href = '/'
      }
    }

    vm.logout = function () {
      UserService.logout()
      window.location.href = '/'
    }
  }

})()
