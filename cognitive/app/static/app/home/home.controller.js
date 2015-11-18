(function() {
  'use strict';

  angular.module('cognitive.home')
    .controller('HomeController', HomeController);

  function HomeController($modal, $state){
    var vm = this;

    vm.openLoginModal = function () {
      var login_modal = $modal.open({
        animation: true,
        templateUrl: '/static/app/common/login_modal.html',
        controller: 'LoginModalController',
        controllerAs: 'vm',
        windowClass: 'login-modal-window',
        resolve: {}
      });

      login_modal.result.then(function (result) {
        if (result.status == "success") {
          $state.go("dashboard.experiment");
        }
      });

    };
  };
})();
