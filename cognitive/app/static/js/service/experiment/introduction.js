cognitive.factory('IntroductionService', function() {
    var IntroductionService = {};

    var definition = {
        name:"introduction",
        icon_class:"fa fa-file-text-o",
        title:"Introduction",
        template: "/partial/whiteboard/introduction"
    }

    IntroductionService = {
        definition: definition
    };

    return IntroductionService;
});

