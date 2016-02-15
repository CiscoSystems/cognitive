(function(){
  'use strict'

  angular.module('cognitive')
    .service('DataService', DataService)

  function DataService($resource, Upload, UserService) {
    var DataService = {}
    var res = $resource('data', null, {
      get: {
        method: 'GET',
        url: '/api/v1/data/:id' },
      list: {
        method:'GET',
        url: '/api/v1/data/',
        isArray: true },
      create: {
        method: 'POST',
        url: '/api/v1/data/' },
      update: {
        method: 'PUT',
        url: '/api/v1/data/:id' },
      remove: {
        method: 'DELETE',
        url: '/api/v1/data/:id' }
    })

    DataService.get = function(data_id) {
      return res.get({id: data_id}).$promise
    }

    DataService.list = function() {
      return res.list().$promise
    }

    DataService.fileUpload = function (file) {
      var user = UserService.getCurrentUser()
      return Upload.upload({
        url: 'api/v1/data/',
        data: {
          file: file,
          user_id: user.id,
          token: user.token
        }
      })
    }

    DataService.update = function(data) {
      return res.update({id: data.id}, data).$promise
    }

    DataService.remove = function(data_id) {
      var user = UserService.getCurrentUser()
      return res.remove({
        id: data_id,
        user_id: user.id,
        token: user.token}
      ).$promise
    }

    return DataService
  }
})()
