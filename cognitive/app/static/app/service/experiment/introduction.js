cognitive.factory('IntroductionService', function() {
    var IntroductionService = {};

    var definition = {
        name:"Introduction",
        type:"introduction",
        icon_class:"fa fa-file-text-o",
        template: "/static/app/partial/whiteboard/experiment/introduction.html"
    }

    IntroductionService = {
        definition: definition
    };

    return IntroductionService;
});

