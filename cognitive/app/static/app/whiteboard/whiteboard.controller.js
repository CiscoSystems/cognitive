// Will remove these global variables
var file_body = "";
var file_name = "";
var parsed_file = [];

(function () {
    'use strict';

    angular.module('cognitive.whiteboard')
        .controller('WhiteboardController', WhiteboardController)

    function WhiteboardController($resource){
        var vm = this;
        vm.experiments = [];

        initialize();

        function initialize() {
            var Experiment = $resource('/api/v1/experiments/:experimentId', {experimentId: '@id'});
            Experiment.query()
                .$promise.then(function(experiments) {
                    console.log(experiments);
                    vm.experiments = experiments;
                });
        }
    };
})()
