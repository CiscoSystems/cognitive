(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .controller('ResultModalController', ResultModalController)

  function ResultModalController($modalInstance, data) {
    var vm = this
    vm.data = data

    vm.cancel = function() {
      $modalInstance.dismiss({
        action: 'cancel'
      })
    }

    vm.isMachineLearningResult = function () {
      return typeof (vm.data['output']) !== 'undefined'
    }
  }

})()
