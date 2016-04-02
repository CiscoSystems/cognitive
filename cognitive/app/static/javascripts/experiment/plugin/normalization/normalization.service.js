(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('NormalizationService', NormalizationService)

  function NormalizationService($resource) {
    var NormalizationService = {}

    var resource = $resource('normalization', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/normalization/:id' },
      list: {
        method:'GET',
        url: '/api/v1/operations/normalization/',
        isArray: true },
      create: {
        method: 'POST',
        url: '/api/v1/operations/normalization/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/normalization/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/normalization/:id'
      }
    })

    var definition = {
      name: 'Normalization',
      type: 'normalization',
      iconClass: 'fa fa-align-center',
      form: {
        component_type: {
          label: 'Type',
          type: 'select',
          options: {
            Column: 'Column'
          }
        },
        component_id: {
          label: 'Target Schema',
          type: 'previousNodeSchemaIndex',
          options: {}
        },
        op_type: {
          label: 'Method',
          type: 'select',
          options: {
            0: 'Standard'
          }
        }
      }
    }

    NormalizationService = {
      resource: resource,
      definition: definition
    }

    return NormalizationService
  }

})()
