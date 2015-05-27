(function () {
    'use strict';
    angular.module('cognitive')
        .factory('MessageService', function () {

        var MessageService = {};
        var messages = [
           // {text: "some error message", type: "Danger or Success or Info or Warning"}
        ];

        MessageService.getMessages = function() {
            return messages;
        }

        MessageService.pushMessage = function(message) {
            messages.push(message);
        }

        MessageService.pushInfoMessage = function (text) {
            messages.push({text: text, type: 'Info'})
        }

        MessageService.pushSuccessMessage = function (text) {
            messages.push({text: text, type: 'Success'})
        }

        MessageService.pushWarningMessage = function (text) {
            messages.push({text: text, type: 'Warning'})
        }

        MessageService.pushDangerMessage = function (text) {
            messages.push({text: text, type: 'Danger'})
        }

        MessageService.closeMessage = function (index) {
            messages.splice(index, 1);
        }

        return MessageService;
    })
})();
