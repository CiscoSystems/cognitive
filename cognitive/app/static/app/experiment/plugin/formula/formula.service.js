(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('FormulaService', FormulaService)

  function FormulaService ($resource) {
    var FormulaService = {}

    FormulaService.definition = {
      name: 'Math formula',
      type: 'add_math_fomula',
      iconClass: 'fa fa-subscript',
      form: {
        component_type: {
          label: 'Type',
          type: 'select',
          options: {
            Column: 'Column'
          }
        },
        component_id: {
          label: 'Target Schema',
          type: 'previousNodeSchemaIndex',
          options: {}
        },
        op_type: {
          label: 'Formula',
          type: 'select',
          options: {
            Add: 'Add',
            Sub: 'Sub',
            Mult: 'Mult',
            Div: 'Div'
          }
        },
        op_constant: {
          label: 'Constant',
          type: 'number'
        }
      }
    }

    FormulaService.resource = $resource('math_formula', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/math_formula/:id'
      },
      list: {
        method:'GET',
        url: '/api/v1/operations/math_formula/',
        isArray: true
      },
      create: {
        method: 'POST',
        url: '/api/v1/operations/math_formula/'
      },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/math_formula/:id'
      },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/math_formula/:id'
      }
    })

    FormulaService.create = function (mathFormula) {
      return FormulaService.resource.save(mathFormula).$promise
    }

    FormulaService.fetch = function(nodeId) {
      return FormulaService.resource.get({id: nodeId}).$promise
    }

    FormulaService.update = function (nodeId, mathFormula) {
      return FormulaService.resource.update({id: nodeId}, mathFormula).$promise
    }

    return FormulaService
  }

})()
