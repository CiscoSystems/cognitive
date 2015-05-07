//var cognitive = angular.module("cognitive",['ui.router', 'ui.bootstrap']);
//
//cognitive.controller('CognitiveController', function($scope, $http){
//
//    $scope.current_user = {}
//
//    $scope.CognitiveRegister = function (username, email, password) {
//        $http.post("/api/v1/users/", {username: username, email: email, password:password})
//            .success(function (data, status, headers, config) {
//                console.log(data)
//                $scope.current_user = data;
//        })
//    }
//
//    $scope.isAuthenticated = function () {
//        return $.isEmptyObject($scope.user) ? false: true;
//    }
//
//    $scope.CognitiveLogin = function(username_or_email, password) {
//        $http.get("/api/v1/user/login/?username_or_email=" + username_or_email + "&password=" + password)
//            .success(function (data, status, headers, config) {
//                console.log(data)
//                $scope.current_user = data;
//            })
//    }
//
//    $scope.CognitiveLogout = function () {
//        $scope.current_user = {};
//    }
//
//});
//
//cognitive.controller('CognitiveHeaderController', ['$scope', function($scope){
//
//}]);
//
//cognitive.controller('CognitiveContentController', ['$scope', function($scope){
//
//}]);
//
//cognitive.controller('CognitiveFooterController', ['$scope', function($scope){
//
//}]);
