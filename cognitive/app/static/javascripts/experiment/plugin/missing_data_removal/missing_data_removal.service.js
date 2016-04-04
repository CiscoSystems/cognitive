(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('MissingDataRemovalService', MissingDataRemovalService)

  function MissingDataRemovalService ($resource) {
    var MissingDataRemovalService = {}

    var resource = $resource('remove_missing', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/remove_missing/:id'
      },
      list: {
        method:'GET',
        url: '/api/v1/operations/remove_missing/',
        isArray: true
      },
      create: {
        method: 'POST',
        url: '/api/v1/operations/remove_missing/'
      },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/remove_missing/:id/'
      },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/remove_missing/:id/'
      }
    })

    var definition = {
      name: 'Empty Data Elimination',
      type: 'remove_missing_value',
      iconClass: 'fa fa-sliders',
      template: '/static/javascripts/experiment/plugin/missing_data_removal/missing_data_removal.html',
      form: {
        op_action: {
          label: 'Method',
          type: 'select',
          options: {
            Replace_mean: 'ReplaceByMean',
            Replace_median: 'ReplaceByMedian',
            Replace_mode: 'ReplaceByMode',
            Drop_row: 'DropRow'
          }
        }
      }
    }

    MissingDataRemovalService = {
      resource: resource,
      definition: definition
    }

    return MissingDataRemovalService
  }

})()
