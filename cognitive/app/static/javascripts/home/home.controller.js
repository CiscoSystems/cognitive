(function () {
  'use strict'

  angular.module('cognitive.home')
    .controller('HomeController', HomeController)

  function HomeController($mdDialog, $state, UserService) {
    var vm = this

    if (UserService.isLoggedIn()) {
      $state.go('dashboard.experiment')
    }

    vm.openLoginDialog = function () {
      $mdDialog.show({
        templateUrl: '/static/javascripts/common/login_dialog.html',
        controller: 'LoginDialogController',
        controllerAs: 'vm',
        clickOutsideToClose: true
      }).then(function(){
        $state.go('dashboard.experiment')
      })
    }
  }

})()
