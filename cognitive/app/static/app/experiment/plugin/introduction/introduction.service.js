(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('IntroductionService', IntroductionService);

  function IntroductionService() {
    var IntroductionService = {};
    IntroductionService.definition = {
      name:"Introduction",
      type:"introduction",
      icon_class:"fa fa-file-text-o",
      template: "/static/app/experiment/plugin/introduction/introduction.html"
    }

    return IntroductionService;
  };
})();
