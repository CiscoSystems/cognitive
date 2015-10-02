(function() {
    'use strict';
    angular.module('cognitive.home')
        .controller('HomeController', HomeController);

    function HomeController($modal, $scope, $state){
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

            login_modal.opened.then(function () {
               //if ($.browser.webkit) {
               //   $('input[name="password"]').attr('autocomplete', 'off');
               //}
            });

            login_modal.result.then(function (result) {
                console.log(result)

                if (result.status === "success") {
                    $scope.user.id = result.user.id;
                    $scope.user.name = result.user.name;
                    $scope.user.token = result.user.token;
                    console.log($scope.user)
                    $state.go("whiteboard");
                }
            });
        };
    };
})();
