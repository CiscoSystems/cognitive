(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('ProjectionService', ProjectionService)

  function ProjectionService ($resource) {
    var ProjectionService = {}

    var resource = $resource('projection', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/projection/:id' },
      list: {
        method:'GET',
        url: '/api/v1/operations/projection/',
        isArray: true },
      create: {
        method: 'POST',
        url: '/api/v1/operations/projection/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/projection/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/projection/:id'
      }
    })

    var definition = {
      name: 'Projection',
      type: 'projection',
      iconClass:'fa fa-filter',
      form: {
        component_id: {
          label: 'Target Schemas',
          type: 'previousNodeSchemaIndexes',
          is_array: true
        }
      }
    }

    ProjectionService = {
      resource: resource,
      definition: definition
    }

    return ProjectionService
  }

})()
