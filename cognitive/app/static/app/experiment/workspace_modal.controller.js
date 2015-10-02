(function () {
    'use strict';

    angular.module('cognitive.experiment')
        .controller('WorkspaceModalController', WorkspaceModalController);

    function WorkspaceModalController(
        $modalInstance, $http, current_user) {
        var vm = this;

        vm.user_workspace_list = [];

        $http.get("/api/v1/experiments").success(function (data, status, headers, config) {
            data.forEach(function(datum) {
                // vm.user-workspace-list must be L.10 of this file
                vm.user_workspace_list.push({id: datum.id, name: datum.name});
            })
        });

        vm.create_whiteboard = function() {
            $http.post("/api/v1/experiments/", {
                name: vm.create_name, user: current_user.id, token: current_user.token
            }).success(function (data, status, headers, config) {
                $modalInstance.close({
                    action: "create",
                    whiteboard: {
                        id: data.id, name: data.name
                    }
                });
            });
       };

        vm.open_whiteboard = function() {
            var whiteboard = {id: vm.saved_whiteboard};

            for (var i in vm.user_workspace_list){
                if (vm.user_workspace_list[i].id == vm.saved_whiteboard) {
                    whiteboard["name"] = vm.user_workspace_list[i].name;
                }
            }
            $modalInstance.close({
                action: "open",
                whiteboard: whiteboard
            })
        };

        vm.cancel = function() {
            $modalInstance.dismiss({
                action: "cancel"
            });
        };
    }
})();