(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .factory('WhiteboardService', WhiteboardService)

  function WhiteboardService() {
    var WhiteboardService = {}
    WhiteboardService.dataFields = []

    var nextNodeCoordination = function () {
      var x = (Math.random() * 300) + 280
      var y = 50 + (Math.random() * 400)
      if (x > window.innerWidth - 350) {
        x = window.innerWidth - 500
      }
      if (y > window.innerHeight) {
        y = window.innerHeight - 300
      }
      return [x, y]
    }

    var setDataFields = function (fields) {
      WhiteboardService.dataFields = fields
    }

    var getDataFields = function () {
      return WhiteboardService.dataFields
    }

    WhiteboardService = {
      nextNodeCoordination: nextNodeCoordination,
      setDataFields: setDataFields,
      getDataFields: getDataFields
    }

    return WhiteboardService
  }
})()
