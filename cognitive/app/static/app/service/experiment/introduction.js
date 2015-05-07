cognitive.factory('IntroductionService', function() {
    var IntroductionService = {};

    var definition = {
        name:"introduction",
        icon_class:"fa fa-file-text-o",
        title:"Introduction",
        template: "/static/app/partial/whiteboard/experiment/introduction.html"
    }

    IntroductionService = {
        definition: definition
    };

    return IntroductionService;
});

