(function () {
  'use strict';

  angular.module('cognitive.experiment')
    .factory('DuplicateRemovalService', DuplicateRemovalService);

  function DuplicateRemovalService ($resource) {
    var DuplicateRemovalService = {};
    var resource = $resource('duplication_removal', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/duplication_removal/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/duplication_removal/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/duplication_removal/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/duplication_removal/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/duplication_removal/:id'
      }
    });

    DuplicateRemovalService.definition = {
      name: 'Remove Duplicates',
      type: 'remove_column',
      icon_class: 'fa fa-cut',
      template: '/static/app/experiment/plugin/duplication_removal/duplication_removal.html'
    };

    DuplicateRemovalService.create = function(targetColumn) {
      return resource.save(targetColumn).$promise;
    }

    return DuplicateRemovalService;
  };

})();
