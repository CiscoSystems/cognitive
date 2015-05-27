(function() {
    'use strict';
    angular.module('cognitive')
        .controller('HeaderController', HeaderController);

    function HeaderController(
        $scope, $http, $sessionStorage, $state, $modal) {
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
                    $state.go("whiteboard.experiment");
                }
            });
        };

        vm.logout = function() {
            $scope.user.id ="";
            $scope.user.name ="";
            $scope.user.token = "";
            $state.go("index");
        };

        vm.isAuthenticated = function () {
            var user = $scope.user;
            return user.id !== -1 && user.name !== "" && user.token !== "";
        };
    };

})();
