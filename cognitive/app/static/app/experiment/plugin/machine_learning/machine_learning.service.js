(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('MachineLearningService', MachineLearningService);

  function MachineLearningService($resource) {

    var MachineLearningService = {};

    MachineLearningService.definition = {
      name: "Machine Learning",
      type: "machine_learning",
      icon_class: "fa fa-spinner",
      template: "/static/app/experiment/plugin/machine_learning/machine_learning.html"
    };

    var resource = $resource('machine_learning', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/machine_learning/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/machine_learning/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/machine_learning/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/machine_learning/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/machine_learning/:id'
      }
    });

    MachineLearningService.create = function (MachineLearning) {
      return resource.save(MachineLearning).$promise;
    }

    return MachineLearningService;

  };
})();
