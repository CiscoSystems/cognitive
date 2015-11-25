(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('NormalizationService', NormalizationService);

  function NormalizationService($resource) {
    var NormalizationService = {};
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

    NormalizationService.definition = {
      name: "Normalization",
      type:"normalization",
      icon_class:"fa fa-align-center",
      template: "/static/app/experiment/plugin/normalization/normalization.html"
    }

    NormalizationService.create = function (normalization) {
      return resource.save(normalization).$promise;
    }

    return NormalizationService;
  };

})();
