(function () {
    'use strict';
    angular.module("cognitive")
        .controller("AuthenticationController", AuthenticationController);

    function AuthenticationController (
        $scope, $http, $state) {

        $scope.name = ""
        $scope.pass = ""
        $scope.registerForm = {name:"", email:"", password:"", password_confirm:""}

        $scope.login = function(username_or_email, password) {
            $http.get("/api/v1/users/login?username_or_email=" + username_or_email + "&password=" + password)
                .success(function (data, status, headers, config) {
                    if (data.status !== "success") {
                        // some error suggestion
                        return;
                    }
                    $scope.user.id = data.id;
                    $scope.user.name = data.username;
                    $scope.user.token = data.token;
                    $state.go("whiteboard.experiment");
            })
        }

        $scope.register = function (username, email, password) {
            $http.post("/api/v1/users/", {username: username, email: email, password:password})
                .success(function (data, status, headers, config) {
                    console.log(data)
                    if (data.status !== "success") {
                        // some error suggestion
                        return;
                    }
                    $scope.user.id = data.id;
                    $scope.user.name = data.username;
                    $scope.user.token = data.token;
                    $state.go("whiteboard.experiment");
            })
        }

        $scope.logout = function() {
            $scope.user.id ="";
            $scope.user.name ="";
            $scope.user.token = "";
            $state.go("index");
        }
    };
})();