(function () {
  'use strict'

  angular.module('cognitive.experiment')
    .controller('PluginFormController', PluginFormController)

  function PluginFormController($scope, $q, $mdDialog, $location, UserService, PluginService, WhiteboardService) {

    var vm = this
    var pluginKey = $scope.$parent.pluginKey
    var experimentId = $scope.$parent.experimentId
    var resource = PluginService.getPluginResource(pluginKey)
    var user = UserService.getCurrentUser()

    vm.definition = PluginService.getPluginList()[pluginKey]
    vm.previousNodeSchemas = WhiteboardService.getDataFields()
    vm.fieldValues = {}
    vm.inputForm = vm.definition['form']

    var search = $location.search()

    if (search['node']) {
      vm.nodeId = search['node']
      load()
    }

    function load() {
      resource.fetch(vm.nodeId).$promise
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
      resource.create(requestBody).$promise
        .then(function (response) {
          $mdDialog.hide({
            data: response,
            definition: vm.definition
          })
        })
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

      if (pluginKey == 'file_input') {
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
