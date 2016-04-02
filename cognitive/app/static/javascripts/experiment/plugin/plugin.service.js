(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('PluginService', PluginService)

  function PluginService(
    FileInputService,
    NormalizationService, ProjectionService, DuplicateRemovalService,
    MissingDataRemovalService, FormulaService, MachineLearningService) {

    var PluginService = {}

    var pluginList = {
      'file_input': FileInputService.definition,
      'formula': FormulaService.definition,
      'normalizatoin': NormalizationService.definition,
      'projection': ProjectionService.definition,
      'duplication_removal': DuplicateRemovalService.definition,
      'missing_data_removal': MissingDataRemovalService.definition,
      'machine_learning': MachineLearningService.definition
    }

    var pluginResource = {
      'file_input': FileInputService.resource,
      'formula': FormulaService.resource,
      'normalizatoin': NormalizationService.resource,
      'projection': ProjectionService.resource,
      'duplication_removal': DuplicateRemovalService.resource,
      'missing_data_removal': MissingDataRemovalService.resource,
      'machine_learning': MachineLearningService.resource
    }

    function getPluginList() {
      return pluginList
    }

    function fetchPluginByType(nodeType) {
      // This should be removed
      switch (nodeType) {
      case FileInputService.definition.type:
        return FileInputService
      case FormulaService.definition.type:
        return FormulaService
      case NormalizationService.definition.type:
        return NormalizationService
      case ProjectionService.definition.type:
        return ProjectionService
      case DuplicateRemovalService.definition.type:
        return DuplicateRemovalService
      case MissingDataRemovalService.definition.type:
        return MissingDataRemovalService
      case MachineLearningService.definition.type:
        return MachineLearningService
      }
    }

    function getPluginResource(pluginKey) {
      return pluginResource[pluginKey]
    }

    PluginService = {
      getPluginList: getPluginList,
      fetchPluginByType: fetchPluginByType,
      getPluginResource: getPluginResource
    }

    return PluginService
  }

})()
