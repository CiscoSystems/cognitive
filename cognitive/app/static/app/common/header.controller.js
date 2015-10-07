(function() {
  'use strict';

  angular.module('cognitive')
    .controller('HeaderController', HeaderController);

  function HeaderController(UserService) {
    var vm = this;

    function initialize() {
      if (!UserService.isLoggedIn()) { return; }
      vm.user = UserService.getCurrentUser();
    }

    vm.isLoggedIn = function(){
      return UserService.isLoggedIn();
    }

    vm.logout = function() {
      UserService.logout();
    }

    initialize();
  };

})();
