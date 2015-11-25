(function () {
  'use strict';

  angular.module('cognitive')
    .factory('ExperimentsService', ExperimentsService);

  function ExperimentsService($resource) {
    ExperimentsService = {};

    var res = $resource('experiments', null, {
      get: {
        method: 'GET',
        url: '/api/v1/experiments/:id' },
      query: {
        method:'GET',
        url: '/api/v1/experiments/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/experiments/' },
      update: {
        method: 'PUT',
        url: '/api/v1/experiments/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/experiments/:id' }
    });

    ExperimentsService.get = function(experiment_id) {
      return res.get({ id: experiment_id }).$promise;
    }

    ExperimentsService.query = function() { return res.query().$promise; }

    ExperimentsService.save = function(experiment) {
      return res.save(experiment).$promise;
    }

    ExperimentsService.update = function (experiment) {
      return res.update({id: experiment.id}, experiment).$promise;
    }

    ExperimentsService.remove = function (experiment_id) {
      return res.delete({id: experiment_id}).$promise;
    }

    return ExperimentsService;
  }

})()
