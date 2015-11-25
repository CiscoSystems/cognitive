(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('ProjectionService', ProjectionService)

  function ProjectionService ($resource) {
    var ProjectionService = {};
    var resource = $resource('normalization', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/normalization/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/normalization/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/normalization/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/normalization/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/normalization/:id'
      }
    });

    ProjectionService.definition = {
      name: "Column Selection",
      type: "projection",
      icon_class:"fa fa-cogs",
      template: "/static/app/experiment/plugin/projection/projection.html"
    };

    ProjectionService.create = function(projection) {
      return resource.save(projection).$promise;
    }

    return ProjectionService;
  };

})();
