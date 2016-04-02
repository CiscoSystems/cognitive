(function () {
  'use strict'

  angular.module('cognitive')
    .service('WorkflowService', WorkflowService)

  function WorkflowService($resource, UserService){
    var WorkflowService = {}
    var resource = $resource('workflows', null, {
      get: {
        method: 'GET',
        url: '/api/v1/workflows/:id' },
      list: {
        method:'GET',
        url: '/api/v1/workflows/',
        isArray: true },
      create: {
        method: 'POST',
        url: '/api/v1/workflows/' },
      update: {
        method: 'PUT',
        url: '/api/v1/workflows/:id' },
      remove: {
        method: 'DELETE',
        url: '/api/v1/workflows/:id' }
    })

    WorkflowService.create = function(data) {
      var user = UserService.getCurrentUser()
      return resource.create({
        user_id: user.id,
        token: user.token,
        experiment: data.experiment.id,
        graph_data: data.topology}
      ).$promise
    }

    return WorkflowService
  }

})()
