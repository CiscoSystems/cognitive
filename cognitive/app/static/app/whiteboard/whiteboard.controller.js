// Will remove these global variables
var file_body = "";
var file_name = "";
var parsed_file = [];

(function () {
  'use strict';

  angular.module('cognitive.whiteboard')
    .controller('WhiteboardController', WhiteboardController)

  function WhiteboardController($resource, $mdDialog, $http, UserService){
    // $http will be removed after all apis are managed by resource

    var vm = this;
    vm.experiments = [];
    var Experiment = $resource('/api/v1/experiments/:experimentId', {experimentId: '@id'});

    function initialize() {
      Experiment.query()
        .$promise.then(function(experiments) {
          vm.experiments = experiments;
        });
    }

    vm.showNewExperimentDialog = function(ev) {
      $mdDialog.show({
        controller: NewExperimentDialogController,
        templateUrl: '/static/app/whiteboard/new_experiment_dialog.html',
        targetEvent: ev,
        clickOutsideToClose: true
      }).then(function(experimentInfo) {
        var currentUser = UserService.getCurrentUser();
        $http.post("/api/v1/experiments/", {
          name: experimentInfo['title'],
          user: currentUser['id'],
          token: currentUser['token']
        }).success(function (data, status, headers, config) {
          var experimentId = data['id'];
          location.href = '/#/experiment?id=' + experimentId;
        });
      }, function(err) {});
    }

    vm.moveToExperiment = function(index) {
      var experimentId = vm.experiments[index]['id'];
      location.href = '/#/experiment?id=' + experimentId;
    }

    initialize();
  };

  angular.module('cognitive.whiteboard')
    .controller('NewExperimentDialogController', NewExperimentDialogController)

  function NewExperimentDialogController($mdDialog){
    var vm = this;
    vm.experimentInfo = {title: ''};
    vm.cancel = function() { $mdDialog.cancel(); };
    vm.close = function() { $mdDialog.cancel(); };
    vm.create = function() { $mdDialog.hide(vm.experimentInfo); }
  }

})();
