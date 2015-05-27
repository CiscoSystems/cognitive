(function () {
    'use strict';
    angular.module('cognitive')
        .controller('MessageController', MessageController);

    function MessageController(MessageService) {
        var vm = this;
        vm.messages = MessageService.getMessages();
        vm.closeMessage = MessageService.closeMessage;
    }

})();
