(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .factory('CognitiveComponentService', CognitiveComponentService);

  function CognitiveComponentService(
    IntroductionService, FileInputService,
    RowAdditionService, NormalizationService,
    ProjectionService, DuplicateRemovalService,
    MissingDataRemovalService,
    FormulaService, MachineLearningService) {

    var CognitiveComponentService = {};

    var pluginList = [
      IntroductionService.definition,
      FileInputService.definition,
      RowAdditionService.definition,
      FormulaService.definition,
      NormalizationService.definition,
      ProjectionService.definition,
      DuplicateRemovalService.definition,
      MissingDataRemovalService.definition,
      MachineLearningService.definition,
    ];

    CognitiveComponentService = {
      getCognitiveComponents: function () {
        return pluginList
      },
      pushCognitiveComponent: function (component) {
        pluginList.push(component)
      },
      fetchDefinitionByType: function (pluginType) {
        return _.find(pluginList, function (plugin) {
          return plugin.type == pluginType;
        })
      },

      fetchNode: function (nodeType, nodeId) {
        switch (nodeType) {
          case RowAdditionService.definition.type:
            return RowAdditionService.fetch(nodeId)
          case FormulaService.definition.type:
            return FormulaService.fetch(nodeId)
          case NormalizationService.definition.type:
            return NormalizationService.fetch(nodeId)
          case ProjectionService.definition.type:
            return ProjectionService.fetch(nodeId)
          case DuplicateRemovalService.definition.type:
            return DuplicateRemovalService.fetch(nodeId)
          case MissingDataRemovalService.definition.type:
            return MissingDataRemovalService.fetch(nodeId)
          case MachineLearningService.definition.type:
            return MachineLearningService.fetch(nodeId)
        }
      }
    };



    return CognitiveComponentService;
  };

})();
