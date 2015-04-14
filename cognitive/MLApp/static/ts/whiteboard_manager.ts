var Manager = (function(){

    function Manager(param){
        this._active_menu = null;
    }

    function activate_menubar(elm){
        menubar = $('li.'+elm);
        description = $('.detail.'+elm);

        menubar
            .css("background-color", "#1e8cff")
            .css("color", "white");

        description.toggle("slide", {direction: "left"}, 700);

        if (this._active_menu === null) {
            this._active_menu = elm;
            return(menubar.addClass("active"));
        }

        if (this._active_menu == elm) {
            if (menubar.hasClass("active")) {
                this._active_menu = null;
                return menubar
                    .css("background-color", "")
                    .css("color", "")
                    .removeClass("active");
            }
        }

        previous_menubar = $('li.'+ this._active_menu);
        previous_description = $('.detail.'+ this._active_menu);

        previous_description.toggle("slide");
        previous_menubar
            .css("background-color", "")
            .css("color", "")
            .removeClass("active");

        this._active_menu = elm;

        return(menubar.addClass("active"));
    }

    Manager.prototype = {
        constructor: Manager,
        activate_menubar: activate_menubar
    };

    return Manager;

})();
