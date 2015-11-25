(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('MissingDataRemovalService', MissingDataRemovalService);

  function MissingDataRemovalService ($resource) {
    var MissingDataRemovalService = {};
    var resource = $resource('remove_missing', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/remove_missing/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/remove_missing/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/remove_missing/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/remove_missing/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/remove_missing/:id'
      }
    });

    MissingDataRemovalService.definition = {
      name: "Remove Missing Value",
      type:"remove_missing_value",
      icon_class:"fa fa-sliders",
      template: "/static/app/experiment/plugin/missing_data_removal/missing_data_removal.html"
    }

    MissingDataRemovalService.create = function(removeMethod) {
      return resource.save(removeMethod).$promise;
    }

    return MissingDataRemovalService;
  };

})();
