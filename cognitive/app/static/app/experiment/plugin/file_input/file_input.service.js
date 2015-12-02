(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('FileInputService', FileInputService);

  function FileInputService ($http, $resource) {
    var FileInputService = {};

    var resource = $resource('input', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/input/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/input/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/input/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/input/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/input/:id'
      }
    });

    var definition =  {
      name:"File Input",
      type:"file_input",
      icon_class:"fa fa-arrow-up",
      template: "/static/app/experiment/plugin/file_input/file_input.html"
    }

    var createNode = function(user_id, experiment_id, token, file_name, file_text) {
      return resource.save({
        user_id: user_id,
        token: token,
        experiment: experiment_id,
        input_file: file_name,
        input_file_type: "csv",
        data_values: file_text
      }).$promise;
    };

    // this is temporal implementation, will be removed to
    // support for multiple input sources
    var file_name = ""
    var file_text = ""
    var file_parsed_text = [];

    FileInputService = {
      definition: definition,
      createNode: createNode,
      filename: file_name,
      filetext: file_text,
      parsedtext: file_parsed_text
    }

    return FileInputService;
  };
})();
