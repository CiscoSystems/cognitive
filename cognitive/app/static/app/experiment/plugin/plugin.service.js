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

    function fetchNode(nodeType, nodeId) {
      switch (nodeType) {
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

    function getPluginResource(pluginKey) {
      return pluginResource[pluginKey]
    }

    PluginService = {
      getPluginList: getPluginList,
      fetchNode: fetchNode,
      getPluginResource: getPluginResource
    }

    return PluginService
  }

})()
