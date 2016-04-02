(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('DuplicateRemovalService', DuplicateRemovalService)

  function DuplicateRemovalService ($resource) {
    var DuplicateRemovalService = {}

    var resource = $resource('duplication_removal', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/duplication_removal/:id' },
      list: {
        method:'GET',
        url: '/api/v1/operations/duplication_removal/',
        isArray: true },
      create: {
        method: 'POST',
        url: '/api/v1/operations/duplication_removal/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/duplication_removal/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/duplication_removal/:id'
      }
    })

    var definition = {
      name: 'Remove Duplicates',
      type: 'remove_column',
      iconClass: 'fa fa-cut',
      form: {
        component_id: {
          label: 'Target Schemas',
          type: 'previousNodeSchemaIndexes',
          is_array: true
        }
      }
    }

    DuplicateRemovalService = {
      resource: resource,
      definition: definition
    }

    return DuplicateRemovalService
  }

})()
