(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('RowAdditionService', RowAdditionService);

  function RowAdditionService ($resource) {
    var RowAdditionService = {};
    var resource = $resource('row', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/row/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/row/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/row/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/row/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/row/:id'
      }
    });

    RowAdditionService.definition = {
      name: "Add Row",
      icon_class:"fa fa-list-ol",
      type: "add_row",
      template: "/static/app/experiment/plugin/row_addition/row_addition.html"
    }

    RowAdditionService.create = function (row) {
      return resource.save(row).$promise;
    }

    return RowAdditionService;
  };

})();
