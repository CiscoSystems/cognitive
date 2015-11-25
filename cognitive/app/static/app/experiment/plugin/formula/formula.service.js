(function () {
  'use strict';
  angular.module('cognitive.experiment')
    .factory('FormulaService', FormulaService);

  function FormulaService ($resource) {

    var FormulaService = {};

    FormulaService.definition = {
      name: "Math formula",
      type: "add_math_fomula",
      icon_class: "fa fa-subscript",
      template: "/static/app/experiment/plugin/formula/formula.html"
    };

    var resource = $resource('math_formula', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/math_formula/:id' },
      query: {
        method:'GET',
        url: '/api/v1/operations/math_formula/',
        isArray: true },
      save: {
        method: 'POST',
        url: '/api/v1/operations/math_formula/' },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/math_formula/:id' },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/math_formula/:id'
      }
    });

    FormulaService.create = function (mathFormula) {
      return resource.save(mathFormula).$promise;
    }

    return FormulaService;
  };

})();
