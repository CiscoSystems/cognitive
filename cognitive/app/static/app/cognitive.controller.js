(function () {
    "use strict";
    angular.module("cognitive")
        .controller('CognitiveController', CognitiveController)


    function CognitiveController(
        $scope, $http, $sessionStorage){
        $scope.user = $sessionStorage
            .$default({id: -1, name: "", token: ""});
    };
})();
