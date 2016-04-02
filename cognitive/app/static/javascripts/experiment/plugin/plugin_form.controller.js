(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .controller('PluginFormController', PluginFormController)

  function PluginFormController(
    $scope, $q, $mdDialog, $location, $stateParams, $timeout,
    UserService, PluginService, WhiteboardService) {

    var vm = this
    var experimentId = $stateParams['experimentId']
    vm.nodeId = $stateParams['nodeId']

    function getNodeDefinitionById(id) {
      // TODO: this would be done by just calling REST API (ex: GET /nodes/{:id}) in the future
      return _.find($scope.$parent.vm.experiment.nodes, function(node) { return node.id == id})
    }

    var node = getNodeDefinitionById(vm.nodeId)
    var plugin = PluginService.fetchPluginByType(node['type'])
    var resource = plugin.resource
    var user = UserService.getCurrentUser()

    vm.definition = plugin.definition
    vm.previousNodeSchemas = WhiteboardService.getDataFields()
    vm.fieldValues = {}
    vm.inputForm = vm.definition['form']
    vm.updatedMessage = ''

    load()

    function load() {
      resource.get({id: vm.nodeId}).$promise
        .then(function (info) {
          vm.formula = info.op_type
          vm.target_column = parseInt(info.component_id)
          vm.constant_number = parseInt(info.op_constant)
        }
      )
    }

    vm.submit = function () {
      if (!vm.form.$valid) {
        return
      }
      var requestBody = constractRequestBody()
      requestBody = addAuthenticationData(requestBody)
      resource.update({id: vm.nodeId}, requestBody).$promise
        .then(function () {
          showUpdatedMessage()
          load()
        })
    }

    function showUpdatedMessage(){
      // TODO: deal with the error cases
      vm.updatedMessage = 'Updated'
      $timeout(function () {
        vm.updatedMessage = ''
      }, 3000)
    }

    $scope.uploadFile = function (event) {
      // This is for file input form, will be cleaned up
      var d = $q.defer(), file = event.target.files[0], reader = new FileReader()

      reader.onload = function (event) {
        d.resolve(event.target.result)
      }

      reader.readAsText(file)

      d.promise.then(function (fileBody) {
        var csvArray = $.csv.toArrays(fileBody)
        WhiteboardService.setDataFields(csvArray[0])

        vm.fileForm = {}
        vm.fileForm['input_file'] = {}
        vm.fileForm['input_file']['body'] = file.name
        vm.fileForm['input_file_type'] = {}
        vm.fileForm['input_file_type']['body'] = 'csv'
        vm.fileForm['data_values'] = {}
        vm.fileForm['data_values']['body'] = fileBody
      })
    }

    function constractRequestBody() {
      var form = angular.copy(vm.definition['form']), requestBody = {}

      if (node['type'] == 'file_input') {
        form = vm.fileForm
      }

      Object.keys(form).forEach(function (key) {
        if (form[key].type == 'previousNodeSchemaIndexes') {
          requestBody[key] = []
          _.each(form[key].body, function (schemaKey) {
            requestBody[key].push(vm.previousNodeSchemas.indexOf(schemaKey))
          })
        } else {
          requestBody[key] = form[key].body
        }
      })

      return requestBody
    }

    function addAuthenticationData(requestBody) {
      requestBody['user_id'] = user.id
      requestBody['token'] = user.token
      requestBody['experiment'] = experimentId
      return requestBody
    }
  }

})()
