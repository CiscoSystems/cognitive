(function () {
    'use strict';
    angular.module('cognitive.whiteboard.experiment')
        .factory('IntroductionService', IntroductionService);

    function IntroductionService() {
        var IntroductionService = {};
        var definition = {
            name:"Introduction",
            type:"introduction",
            icon_class:"fa fa-file-text-o",
            template: "/static/app/whiteboard/experiment/plugin/introduction/introduction.html"
        }

        IntroductionService = {
            definition: definition
        };

        return IntroductionService;
    };
})();
