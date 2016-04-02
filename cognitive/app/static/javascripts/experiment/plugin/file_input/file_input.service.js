(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('FileInputService', FileInputService)

  function FileInputService ($http, $resource) {

    var FileInputService = {}

    var resource = $resource('input', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/input/:id/'
      },
      list: {
        method:'GET',
        url: '/api/v1/operations/input/',
        isArray: true
      },
      create: {
        method: 'POST',
        url: '/api/v1/operations/input/'
      },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/input/:id/'
      },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/input/:id/'
      }
    })

    var definition =  {
      name: 'Source Data',
      type: 'file_input',
      iconClass: 'fa fa-database',
      template: '/static/javascripts/experiment/plugin/file_input/file_input.html',
      form: {
        input_file: {
          type: 'file'
        }
      }
    }

    var createNode = function(user_id, experiment_id, token, file_name, file_text) {
      return FileInputService.resource.save({
        user_id: user_id,
        token: token,
        experiment: experiment_id,
        input_file: file_name,
        input_file_type: 'csv',
        data_values: file_text
      }).$promise
    }

    FileInputService = {
      definition: definition,
      resource: resource,
      createNode: createNode
    }

    return FileInputService
  }

})()
