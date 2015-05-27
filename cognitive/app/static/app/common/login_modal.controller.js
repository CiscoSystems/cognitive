(function () {
    'use strict';

    angular.module('cognitive')
        .controller('LoginModalController', LoginModalController);

    function LoginModalController($http, $state, $modalInstance) {
        var vm = this;
        vm.register_error = 0;
        vm.login_error = 0;
        vm.message = "";

        vm.loginForm = {
            username_or_email: "",
            password: ""
        }

        vm.registerForm = {
            username: "",
            email: "",
            password: ""
        }

        vm.isRegisterError = function () {
            return vm.register_error !== 0;
        }

        vm.isLoginError = function () {
            return vm.login_error !== 0;
        }

        vm.login = function (username_or_email, password) {
            $http.get("/api/v1/users/login?username_or_email=" + username_or_email + "&password=" + password)
                .success(function (data, status, headers, config) {
                    if (data.status !== "success") {
                        // some error suggestion
                        vm.login_error = 1;
                        return;
                    }
                    vm.login_error = 0;
                    $modalInstance.close({
                        status: "success",
                        user: {
                            id: data.id, name: data.username, token: data.token
                        }
                    });
            })
        }

        vm.register = function (username, email, password) {
            $http.post("/api/v1/users/", {username: username, email: email, password:password})
                .success(function (data, status, headers, config) {
                    console.log(data)
                    console.log("test")
                    if (data.status !== "success") {
                        // some error suggestion
                        console.log("error")
                        vm.register_error = 1;
                        vm.message = data.message;
                        return;
                    }
                    vm.error = 0;
                    $modalInstance.close({
                        status: "success",
                        user: {
                            id: data.id, name: data.username, token: data.token
                        }
                    });
                })
        }
    }
})();