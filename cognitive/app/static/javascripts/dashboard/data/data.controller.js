(function() {
  'use strict'

  angular.module('cognitive.dashboard')
    .controller('DashboardDataController', DashboardDataController)

  function DashboardDataController(
    $mdDialog, Upload, UserService, DataService){
    var vm = this
    vm.uploadFile = null
    vm.user = UserService.getCurrentUser()

    DataService.list().then(function(data_info){
      vm.dataList = _.map(data_info, function(info) {
        return {
          id: info.id,
          file_path: info.file_path.replace(/[\/|]tmp\//g, ''),
          type: info.type,
          created_time: info.created_time
        }
      })
    })

    vm.startUploadingFile = function() {
      DataService.fileUpload(vm.uploadFile).then(
        function(response) {
          vm.dataList.unshift({
            id: response.data['id'],
            file_path: response.data['file_path'],
            type: response.data['type'],
            user: response.data['user'],
            created_time: response.data['created_time']
          })
        })
    }

    vm.removeData = function (index) {
      var data_id = vm.dataList[index].id
      DataService.remove(data_id).then(function () {
        vm.dataList.splice(index, 1)
      })
    }
  }
})()

