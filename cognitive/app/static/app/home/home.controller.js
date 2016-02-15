(function () {
  'use strict'

  angular.module('cognitive.home')
    .controller('HomeController', HomeController)

  function HomeController($mdDialog, $state) {
    var vm = this

    vm.openLoginDialog = function () {
      $mdDialog.show({
        templateUrl: '/static/app/common/login_dialog.html',
        controller: 'LoginDialogController',
        controllerAs: 'vm',
        clickOutsideToClose: true
      }).then(function(){
        $state.go('dashboard.experiment')
      })
    }
  }

})()
