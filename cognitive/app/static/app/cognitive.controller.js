(function () {
    'use strict';
    angular.module('cognitive')
        .controller('CognitiveController', CognitiveController)

    function CognitiveController(
        $scope, $sessionStorage) {
        $scope.user = $sessionStorage
            .$default({id: -1, name: "", token: ""});
    };
})();
