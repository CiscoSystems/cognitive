(function () {
    "use strict";
    angular.module("cognitive")
        .factory("MessageService", function () {

        var MessageService = {};
        var messages = [
           // {text: "some error message", type: "Danger or Success or Info or Warning"}
        ];

        var getMessages = function() {
            return messages;
        }

        var pushMessage = function(message) {
            messages.push(message);
        }

        var pushInfoMessage = function (text) {
            messages.push({text: text, type: "Info"})
        }

        var pushSuccessMessage = function (text) {
            messages.push({text: text, type: "Success"})
        }

        var pushWarningMessage = function (text) {
            messages.push({text: text, type: "Warning"})
        }

        var pushDangerMessage = function (text) {
            messages.push({text: text, type: "Danger"})
        }

        var closeMessage = function (index) {
            messages.splice(index, 1);
        }
        MessageService = {
            getMessages: getMessages,
            pushMessage: pushMessage,
            pushInfoMessage: pushInfoMessage,
            pushSuccessMessage: pushSuccessMessage,
            pushWarningMessage: pushWarningMessage,
            pushDangerMessage: pushDangerMessage,
            closeMessage: closeMessage
        }

        return MessageService;
    })
})();
