(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('MachineLearningService', MachineLearningService)

  function MachineLearningService($resource) {
    var MachineLearningService = {}

    var resource = $resource('machine_learning', null, {
      get: {
        method: 'GET',
        url: '/api/v1/operations/machine_learning/:id/'
      },
      list: {
        method:'GET',
        url: '/api/v1/operations/machine_learning/',
        isArray: true
      },
      create: {
        method: 'POST',
        url: '/api/v1/operations/machine_learning/'
      },
      update: {
        method: 'PUT',
        url: '/api/v1/operations/machine_learning/:id/'
      },
      delete: {
        method: 'DELETE',
        url: '/api/v1/operations/machine_learning/:id/'
      }
    })

    var definition = {
      name: 'Machine Learning',
      type: 'machine_learning',
      iconClass: 'fa fa-spinner',
      form: {
        model_type: {
          label: 'Algorithm',
          type: 'select',
          options: {
            Linear_SVM: 'Linear_SVM',
            Nearest_Neighbours: 'Nearest_Neighbours',
            Decision_Tree: 'Decision_Tree',
            Random_Forest: 'Random_Forest',
            Naive_Bayes: 'Naive_Bayes'
          }
        },
        target_column: {
          label: 'Target Schema',
          type: 'previousNodeSchemaIndex'
        },
        train_data_percentage: {
          label: 'Training Parcentage',
          type: 'select',
          options: {
            10: 10,
            20: 20,
            30: 30,
            40: 40,
            50: 50,
            60: 60,
            70: 70,
            80: 80,
            90: 90
          }
        }
      }
    }

    MachineLearningService = {
      resource: resource,
      definition: definition
    }

    return MachineLearningService
  }

})()
