var CognitiveAPIClientV1 = (function() {

    /*
     * TODO: will separate cognitive specific function and others
     * for ex: run function is kept here
     *         input/delete * component will be separated
     *         like plugin.
     */

    function CognitiveAPIClientV1(options) {
        this.prefix  = '/api/v1';
    }

    function _send_request(api_url, method, json_data, node) {
        $.ajax({
            url:  api_url,
            type: method,
            data: json_data,
            success: function(result) {
                console.log(result);
                a = node;
                if (node !== null){ node.set_backend_id(result.id);}
            }
        });
    };

    function createOutputComponent(json_data, node) {
        api_url = this.prefix + '/operations/output/';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteOutputComponent(id) {
        api_url = this.prefix + '/operations/output/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function createFilterComponent(json_data, node) {
        api_url = this.prefix + '/operations/filter';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteFilterComponent(id) {
        api_url = this.prefix + '/operations/filter/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function run(json_data, node) {
        api_url = this.prefix + '/operations/filter';
        _send_request(api_url, "POST", json_data, node);
    };

    function deleteOutputComponent(id) {
        api_url = this.prefix + '/operations/filter/' + id;
        $.ajax({
            url: api_url,
            type: "DELETE",
            success: function(result) { console.log(result); }
        });
    }

    function executeAll(json_data) {
        api_url = this.prefix + '/workflows/';
        _send_request(api_url, "POST", json_data, null);
    };

    function getResult(component_id) {
        api_url = this.prefix + '/results/?expetiment=1&component_id=' + component_id;
        _send_request(api_url, "GET", null, null);
    };

    CognitiveAPIClientV1.prototype = {
        constructor: CognitiveAPIClientV1,
        createOutputComponent: createOutputComponent,
        deleteOutputComponent: deleteOutputComponent,
        createFilterComponent: createFilterComponent,
        deleteFilterComponent: deleteFilterComponent,
        executeAll: executeAll
    };

    return CognitiveAPIClientV1;

})();